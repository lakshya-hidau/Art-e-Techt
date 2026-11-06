import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU, DIRECTOR_MENU, ADMIN_MENU } from '../constants/navigation';
import { getMyProfile, getProfileById, updateProfile, uploadMedia } from '../services/profileService';
import { getMyApplications } from '../services/projectService';
import { useNotifications } from '../context/NotificationContext';

const Toast = ({ message, type, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
    return (
        <div className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl text-primary-text text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 ${type === 'error' ? 'bg-primary-hover' : 'bg-success'}`}>
            <span className="material-symbols-outlined">{type === 'error' ? 'error' : 'check_circle'}</span>
            {message}
        </div>
    );
};

const TalentPortfolio = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [viewerProfile, setViewerProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [editingBio, setEditingBio] = useState(false);
    const [bioText, setBioText] = useState('');
    const [savingBio, setSavingBio] = useState(false);
    const [editingAttrs, setEditingAttrs] = useState(false);
    const [attrs, setAttrs] = useState({
        height: '',
        eyeColor: '',
        skinTone: '',
        hairColor: '',
        build: '',
        waist: '',
        chest: ''
    });
    const [savingAttrs, setSavingAttrs] = useState(false);
    const [uploadingMedia, setUploadingMedia] = useState(false);
    const [cvUrl, setCvUrl] = useState('');
    const [savingCv, setSavingCv] = useState(false);
    const [mediaFilter, setMediaFilter] = useState('all'); // all | image | video

    const profileUserIdRaw = profile?.user?.id || profile?.user?._id || profile?.id || '';
    const profileUserId = profileUserIdRaw ? profileUserIdRaw.toString() : '';
    const viewerUserId = viewerProfile?.user?.id || viewerProfile?.user?._id || '';
    const isOwnProfile = !id || (viewerUserId && profileUserId && viewerUserId === profileUserId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const viewerRes = await getMyProfile();
                setViewerProfile(viewerRes.data);

                let profileRes;
                if (id) {
                    profileRes = await getProfileById(id);
                } else {
                    profileRes = await getMyProfile();
                }

                const p = profileRes.data;
                setProfile(p);
                setBioText(p.bio || '');
                setCvUrl(p.cvUrl || '');
                setAttrs({
                    height: p.physicalAttributes?.height || '',
                    eyeColor: p.physicalAttributes?.eyeColor || '',
                    skinTone: p.physicalAttributes?.skinTone || '',
                    hairColor: p.physicalAttributes?.hairColor || '',
                    build: p.physicalAttributes?.build || '',
                    waist: p.physicalAttributes?.waist || '',
                    chest: p.physicalAttributes?.chest || '',
                });

                // Only fetch applications if it's the user's own profile (to show credits they've earned)
                // Actually, for talent portfolio, common practice is to show credits in which they were selected.
                // If it's own profile, getMyApplications shows all including applied.
                // If it's someone else, we might need a separate API or the profile object should include public credits.
                // For now, let's just fetch applications if it's own profile to keep it safe.
                if (!id) {
                    const appsRes = await getMyApplications();
                    setApplications(appsRes.data);
                }
            } catch (err) {
                console.error('Error fetching portfolio:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Listen for real-time verification updates
        window.addEventListener('userStateChange', fetchData);
        return () => window.removeEventListener('userStateChange', fetchData);
    }, [id]);

    const showToast = (msg, type = 'success') => setToast({ message: msg, type });

    const handleSaveBio = async () => {
        setSavingBio(true);
        try {
            const res = await updateProfile({ bio: bioText });
            setProfile(res.data);
            setEditingBio(false);
            showToast('Bio updated!');
        } catch { showToast('Failed to update bio.', 'error'); }
        finally { setSavingBio(false); }
    };

    const handleSaveAttrs = async () => {
        setSavingAttrs(true);
        try {
            const res = await updateProfile({ physicalAttributes: attrs });
            setProfile(res.data);
            setEditingAttrs(false);
            showToast('Attributes saved!');
        } catch { showToast('Failed to save attributes.', 'error'); }
        finally { setSavingAttrs(false); }
    };

    const handleMediaUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 20 * 1024 * 1024) { showToast('File too large (max 20MB)', 'error'); return; }
        setUploadingMedia(true);
        try {
            const fd = new FormData();
            fd.append('media', file);
            const res = await uploadMedia(fd);
        setProfile(prev => ({ ...prev, portfolio: [...(prev.portfolio || []), res.data] }));
        showToast('Media added to portfolio!');
        } catch { showToast('Upload failed. Try again.', 'error'); }
        finally { setUploadingMedia(false); }
    };

    const handleSaveCv = async () => {
        if (!cvUrl.trim()) { showToast('Add a CV link before saving.', 'error'); return; }
        setSavingCv(true);
        try {
            const res = await updateProfile({ cvUrl: cvUrl.trim() });
            setProfile(res.data);
            showToast('CV link saved.');
        } catch {
            showToast('Failed to save CV link.', 'error');
        } finally {
            setSavingCv(false);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showToast('Profile link copied');
        } catch {
            showToast('Copy failed', 'error');
        }
    };

    const menuItems = viewerProfile?.user?.role === 'admin' ? ADMIN_MENU :
                        viewerProfile?.user?.role === 'director' ? DIRECTOR_MENU :
                        TALENT_MENU;

    const navUserData = {
        name: viewerProfile?.fullName || 'User',
        roleTitle: viewerProfile?.companyName || viewerProfile?.talentCategory || 'Member',
        avatar: viewerProfile?.profilePicture && viewerProfile.profilePicture !== 'no-photo.jpg'
            ? viewerProfile.profilePicture
            : 'https://ui-avatars.com/api/?name=' + (viewerProfile?.fullName || 'User'),
    };

    const filmCredits = applications
        .filter(a => ['shortlisted', 'selected'].includes(a.status))
        .map(a => ({
            id: a._id,
            title: a.project?.title || 'Untitled',
            role: a.role || 'Lead',
            production: a.project?.director?.fullName || 'Production',
            year: new Date(a.createdAt).getFullYear(),
            type: a.project?.category || 'Feature Film',
            status: a.status,
        }));

    if (loading) return (
        <DashboardLayout menuItems={menuItems} userData={navUserData} headerTitle="Portfolio View">
            <div className="flex items-center justify-center py-20 min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
                    <p className="text-text-secondary font-bold uppercase tracking-widest text-xs">Developing Portfolio...</p>
                </div>
            </div>
        </DashboardLayout>
    );

    const avatarUrl = profile?.profilePicture === 'no-photo.jpg'
        ? 'https://ui-avatars.com/api/?name=' + profile?.fullName
        : profile?.profilePicture;

    return (
        <DashboardLayout
            menuItems={menuItems}
            userData={navUserData}
            verificationStatus={profile?.user?.verificationStatus || authUser?.verificationStatus || 'none'}
            headerTitle={isOwnProfile ? "Portfolio Control" : "Talent Profile"}
            headerSubtitle={isOwnProfile ? "Manage your public StarCast identity." : `Reviewing ${profile?.fullName}'s professional background.`}
        >
            <style>
                {`
                    .cinematic-gradient {
                        background: linear-gradient(180deg, color-mix(in srgb, var(--color-text-primary) 0%, transparent) 0%, color-mix(in srgb, var(--color-text-secondary) 10%, transparent) 60%, color-mix(in srgb, var(--color-text-primary) 100%, transparent) 100%);
                    }
                    .dark .cinematic-gradient {
                        background: linear-gradient(180deg, color-mix(in srgb, var(--color-void) 0%, transparent) 0%, color-mix(in srgb, var(--color-primary) 40%, transparent) 60%, color-mix(in srgb, var(--color-primary) 100%, transparent) 100%);
                    }
                    .glass-card {
                        background: color-mix(in srgb, var(--color-text-primary) 60%, transparent);
                        backdrop-filter: blur(12px);
                        border: 1px solid color-mix(in srgb, var(--color-void) 5%, transparent);
                    }
                    .dark .glass-card {
                        background: color-mix(in srgb, var(--color-primary) 40%, transparent);
                        backdrop-filter: blur(12px);
                        border: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);
                    }
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 10px; }
                `}
            </style>

            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

            <div className="pb-24 text-text-primary dark:text-text-primary font-sans">
                {/* Hero Section */}
                <section className="relative h-[400px] md:h-[500px] lg:h-[614px] min-h-[300px] w-full overflow-hidden rounded-2xl md:rounded-3xl mb-8 md:mb-12 border border-border dark:border-border-subtle">
                    <div className="absolute inset-0">
                        <img alt={profile?.fullName || "Hero"} className="w-full h-full object-cover object-top" src={avatarUrl} />
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-text-secondary via-white/40 dark:via-text-secondary/40 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12">
                        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                            <div>
                                <span className="inline-block px-2 md:px-3 py-1 bg-primary-hover text-primary-text text-[9px] md:text-[10px] font-black tracking-widest uppercase mb-2 md:mb-4 rounded-sm">
                                    Artist ID: {(profileUserId ? profileUserId.substring(0, 6) : '000000')}
                                </span>
                                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-primary-text mb-2">{profile?.fullName}</h1>
                                <p className="text-error font-medium text-base md:text-lg flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                    {profile?.location || 'Location Not Set'}
                                </p>
                            </div>
                            {isOwnProfile && (
                            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                                <button className="flex items-center justify-center gap-2 bg-surface/10 hover:bg-surface/20 backdrop-blur-md text-primary-text border border-subtle/20 px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold transition-all text-sm">
                                    <span className="material-symbols-outlined text-sm z-0">edit</span>
                                    Edit Profile
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-primary-hover hover:bg-primary-hover text-primary-text px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all text-sm">
                                    <span className="material-symbols-outlined text-sm">share</span>
                                    Share
                                </button>
                            </div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-3 md:px-4 lg:px-8 py-8 md:py-12 space-y-12 md:space-y-16">
                    {/* Quick Actions + Stats */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-surface dark:bg-void p-4 md:p-6 rounded-xl border border-border dark:border-border-subtle flex flex-col justify-between shadow-sm">
                            <span className="text-text-secondary dark:text-text-secondary text-xs font-bold uppercase tracking-widest">Category</span>
                            <p className="text-xl md:text-2xl font-bold mt-2 text-text-primary dark:text-text-primary">{profile?.talentCategory || 'Actor'}</p>
                        </div>
                        <div className="bg-surface dark:bg-void p-4 md:p-6 rounded-xl border border-border dark:border-border-subtle flex flex-col justify-between shadow-sm">
                            <span className="text-text-secondary dark:text-text-secondary text-xs font-bold uppercase tracking-widest">Experience</span>
                            <p className="text-xl md:text-2xl font-bold mt-2 text-text-primary dark:text-text-primary">{profile?.skills?.length || 0} Skills</p>
                        </div>
                        <div className="bg-surface dark:bg-void p-4 md:p-6 rounded-xl border border-border dark:border-border-subtle flex flex-col gap-3 shadow-sm">
                            <span className="text-text-secondary dark:text-text-secondary text-xs font-bold uppercase tracking-widest">Quick Actions</span>
                            <div className="flex flex-wrap gap-2">
                                {isOwnProfile && (
                                    <button onClick={() => setEditingBio(true)} className="px-2 md:px-3 py-1 md:py-2 text-xs font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary/15 transition-all flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">edit</span> Bio
                                    </button>
                                )}
                                {isOwnProfile && (
                                    <label className="px-2 md:px-3 py-1 md:py-2 text-xs font-bold rounded-lg bg-surface-lowest dark:bg-container text-text-muted dark:text-text-primary border border-border dark:border-border-subtle cursor-pointer hover:border-primary/40 transition-all flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">photo_camera</span> Photo
                                        <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} disabled={uploadingMedia} />
                                    </label>
                                )}
                                {isOwnProfile && (
                                    <label className="px-2 md:px-3 py-1 md:py-2 text-xs font-bold rounded-lg bg-surface-lowest dark:bg-container text-text-muted dark:text-text-primary border border-border dark:border-border-subtle cursor-pointer hover:border-primary/40 transition-all flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">movie</span> Video
                                        <input type="file" accept="video/*" className="hidden" onChange={handleMediaUpload} disabled={uploadingMedia} />
                                    </label>
                                )}
                                <button onClick={handleCopyLink} className="px-2 md:px-3 py-1 md:py-2 text-xs font-bold rounded-lg bg-surface-lowest dark:bg-container text-text-muted dark:text-text-primary border border-border dark:border-border-subtle hover:border-primary/40 transition-all flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">share</span> Share
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Bio & Attributes Asymmetric Layout */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                        <div className="lg:col-span-7 space-y-4 md:space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary dark:text-primary-text">Professional Biography</h3>
                                {isOwnProfile && !editingBio && (
                                <button onClick={() => setEditingBio(true)} className="text-primary hover:text-error text-sm font-bold flex items-center gap-1 self-start sm:self-center">
                                    <span className="material-symbols-outlined text-sm">edit</span> Edit Bio
                                </button>
                                )}
                            </div>
                            {editingBio ? (
                                <div className="space-y-4">
                                    <textarea
                                        rows={6}
                                        value={bioText}
                                        onChange={e => setBioText(e.target.value)}
                                        className="w-full bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl px-4 md:px-6 py-4 md:py-5 text-text-muted dark:text-text-primary font-medium outline-none focus:border-error/50 transition-all shadow-inner resize-none leading-relaxed"
                                        placeholder="Express your artistic journey..."
                                    />
                                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                        <button
                                            onClick={handleSaveBio}
                                            disabled={savingBio}
                                            className="px-4 md:px-6 py-2 md:py-3 bg-primary-hover text-primary-text rounded-lg font-bold text-sm tracking-wide hover:bg-primary-hover transition-all disabled:opacity-50"
                                        >
                                            {savingBio ? 'Saving...' : 'Save Biography'}
                                        </button>
                                        <button
                                            onClick={() => setEditingBio(false)}
                                            className="px-4 md:px-6 py-2 md:py-3 bg-container border border-border-subtle text-text-secondary rounded-lg font-bold text-sm tracking-wide hover:bg-container transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-text-secondary leading-relaxed space-y-4">
                                    {bioText ? bioText.split('\n').map((para, i) => <p key={i} className="text-text-muted dark:text-text-secondary">{para}</p>) : <p className="text-text-secondary dark:text-text-secondary italic">No history recorded yet in the archives.</p>}
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-5 space-y-4 md:space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary dark:text-primary-text">Physical Attributes</h3>
                                {isOwnProfile && !editingAttrs && (
                                <button onClick={() => setEditingAttrs(true)} className="text-primary hover:text-error text-sm font-bold self-start sm:self-center">Manage</button>
                                )}
                            </div>
                            {editingAttrs ? (
                                <div className="bg-void/50 p-4 md:p-6 rounded-lg border border-border-subtle space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { key: 'height', label: 'Height' },
                                            { key: 'eyeColor', label: 'Eyes' },
                                            { key: 'hairColor', label: 'Hair' },
                                            { key: 'build', label: 'Build' },
                                        ].map(({ key, label }) => (
                                            <div key={key}>
                                                <label className="text-text-secondary text-[10px] font-bold uppercase block mb-1">{label}</label>
                                                <input
                                                    type="text"
                                                    value={attrs[key]}
                                                    onChange={e => setAttrs(p => ({ ...p, [key]: e.target.value }))}
                                                    className="w-full bg-void border border-border-subtle rounded-md px-3 py-2 text-sm font-semibold text-primary-text outline-none focus:border-error/50 transition-all"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button
                                            onClick={handleSaveAttrs}
                                            disabled={savingAttrs}
                                            className="flex-1 py-2 md:py-3 bg-primary-hover text-primary-text rounded-md font-bold text-xs uppercase tracking-wider hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
                                        >
                                            {savingAttrs ? 'Saving...' : 'Confirm'}
                                        </button>
                                        <button
                                            onClick={() => setEditingAttrs(false)}
                                            className="flex-1 py-2 md:py-3 bg-container border border-border-subtle text-text-secondary rounded-md font-bold text-xs uppercase tracking-wider"
                                        >
                                            Abort
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    {[
                                        { label: 'Height', value: profile?.physicalAttributes?.height || attrs.height || '-' },
                                        { label: 'Eyes', value: profile?.physicalAttributes?.eyeColor || attrs.eyeColor || '-' },
                                        { label: 'Hair', value: profile?.physicalAttributes?.hairColor || attrs.hairColor || '-' },
                                        { label: 'Build', value: profile?.physicalAttributes?.build || attrs.build || '-' }
                                    ].map(({ label, value }) => (
                                        <div key={label} className="bg-surface dark:bg-void/50 p-3 md:p-4 rounded-lg border border-border dark:border-border-subtle shadow-sm">
                                            <span className="text-text-secondary dark:text-text-secondary text-[10px] font-bold uppercase block mb-1">{label}</span>
                                            <span className="text-base md:text-lg font-semibold text-text-primary dark:text-text-primary">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Media Gallery */}
                    <section className="space-y-6 md:space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary dark:text-primary-text">Media Gallery</h3>
                            <div className="flex items-center gap-1 md:gap-2 text-xs font-bold text-text-secondary dark:text-text-secondary flex-wrap">
                                <button onClick={() => setMediaFilter('all')} className={`px-2 md:px-3 py-1 rounded-full border transition-colors ${mediaFilter === 'all' ? 'border-primary text-primary' : 'border-transparent hover:border-border dark:hover:border-border-subtle'}`}>All</button>
                                <button onClick={() => setMediaFilter('image')} className={`px-2 md:px-3 py-1 rounded-full border transition-colors ${mediaFilter === 'image' ? 'border-primary text-primary' : 'border-transparent hover:border-border dark:hover:border-border-subtle'}`}>Photos</button>
                                <button onClick={() => setMediaFilter('video')} className={`px-2 md:px-3 py-1 rounded-full border transition-colors ${mediaFilter === 'video' ? 'border-primary text-primary' : 'border-transparent hover:border-border dark:hover:border-border-subtle'}`}>Videos</button>
                            </div>
                            {isOwnProfile && (
                                <label className={`bg-surface-lowest dark:bg-container hover:bg-surface dark:hover:bg-container text-text-muted dark:text-primary-text px-3 md:px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-all cursor-pointer border border-border dark:border-border-subtle ${uploadingMedia ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <span className="material-symbols-outlined text-sm">upload</span> {uploadingMedia ? 'Uploading...' : 'Upload Media'}
                                    <input type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaUpload} disabled={uploadingMedia}/>
                                </label>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                            {(profile?.portfolio || [])
                                .filter(item => mediaFilter === 'all' || item.type === mediaFilter)
                                .map((item, idx) => (
                                <div key={idx} className={`group relative rounded-lg overflow-hidden border border-border dark:border-border-subtle bg-surface dark:bg-void shadow-sm ${idx % 3 === 2 ? 'md:col-span-2 aspect-video' : 'aspect-[3/4]'}`}>
                                    <img
                                        alt={`Media ${idx + 1}`}
                                        className={`w-full h-full object-cover transition-all duration-500 ${idx % 3 === 2 ? 'brightness-75 dark:brightness-50 group-hover:brightness-100 dark:group-hover:brightness-75' : 'grayscale group-hover:grayscale-0'}`}
                                        src={item.url || item}
                                    />
                                    {idx % 3 === 2 ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-6">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-hover rounded-full flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-primary-text text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                            </div>
                                            <span className="text-primary-text font-bold text-sm md:text-lg">Showreel</span>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-void/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="material-symbols-outlined text-primary-text text-2xl md:text-3xl">fullscreen</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CV & Downloads */}
                    <section className="space-y-3 md:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary dark:text-primary-text">CV / Resume</h3>
                            {profile?.cvUrl && (
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="px-3 md:px-4 py-2 text-sm font-bold bg-primary text-primary-text rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                                        <span className="material-symbols-outlined text-sm">download</span> Download
                                    </a>
                                    <button onClick={handleCopyLink} className="px-3 md:px-4 py-2 text-sm font-bold bg-surface-lowest dark:bg-container text-text-muted dark:text-primary-text rounded-lg flex items-center justify-center gap-2 border border-border dark:border-border-subtle hover:border-primary/40 transition-all">
                                        <span className="material-symbols-outlined text-sm">share</span> Share
                                    </button>
                                </div>
                            )}
                        </div>
                        {isOwnProfile && (
                        <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-stretch md:items-center">
                            <input
                                type="url"
                                value={cvUrl}
                                onChange={e => setCvUrl(e.target.value)}
                                placeholder="Paste CV / Drive link (PDF preferred)"
                                className="w-full bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm text-text-primary dark:text-text-primary outline-none focus:border-gold/40"
                            />
                            <button
                                onClick={handleSaveCv}
                                disabled={savingCv}
                                className="px-3 md:px-4 py-2 md:py-3 bg-primary text-primary-text font-bold rounded-lg text-sm hover:bg-primary/90 transition-all disabled:opacity-60 whitespace-nowrap"
                            >
                                {savingCv ? 'Saving...' : 'Save CV link'}
                            </button>
                        </div>
                        )}
                        {!profile?.cvUrl && !isOwnProfile && (
                            <p className="text-sm text-text-secondary dark:text-text-secondary">No CV uploaded yet.</p>
                        )}
                    </section>

                    {/* Credits Table */}
                    <section className="space-y-6 md:space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary dark:text-primary-text">Filmography</h3>
                            {isOwnProfile && (
                            <button className="bg-primary/5 hover:bg-primary/10 text-primary px-3 md:px-4 py-2 rounded font-bold text-sm flex items-center justify-center gap-2 border border-primary/20 transition-all self-start sm:self-center">
                                <span className="material-symbols-outlined text-sm">add</span> Add New Credit
                            </button>
                            )}
                        </div>
                        <div className="overflow-x-auto border border-border dark:border-border-subtle rounded-xl bg-surface dark:bg-void/30 backdrop-blur-sm shadow-sm">
                            <table className="w-full text-left text-sm md:text-base">
                                <thead>
                                    <tr className="bg-surface-lowest dark:bg-void/80 text-text-secondary dark:text-text-secondary text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-border dark:border-border-subtle">
                                        <th className="px-3 md:px-6 py-3 md:py-4">Project Title</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4">Role</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4">Year</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4">Status</th>
                                        <th className="px-3 md:px-6 py-3 md:py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border dark:divide-border-subtle">
                                    {filmCredits.length > 0 ? filmCredits.map((credit, idx) => (
                                    <tr key={credit.id || idx} className="group hover:bg-surface-lowest dark:hover:bg-container/50 transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-5 font-bold text-text-primary dark:text-text-primary text-sm md:text-base">{credit.title}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-5 text-text-secondary dark:text-text-secondary text-sm md:text-base">{credit.role}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-5 text-text-secondary dark:text-text-secondary text-sm md:text-base">{credit.year}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-5">
                                            <span className="px-2 py-1 bg-success/10 text-success text-[10px] font-bold rounded">Completed</span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-5 text-right">
                                            <button className="text-text-secondary hover:text-primary-text transition-colors">
                                                <span className="material-symbols-outlined text-sm">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    )) : (
                                    <tr>
                                        <td colSpan="5" className="px-3 md:px-6 py-6 md:py-8 text-center text-text-secondary font-medium">No performance records added yet.</td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TalentPortfolio;

