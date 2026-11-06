import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { getMyApplications } from '../services/projectService';
import { TALENT_MENU } from '../constants/navigation';
import { useNotifications } from '../context/NotificationContext';
import WorkshopPortalSection from '../components/WorkshopPortalSection';

const Toast = ({ message, type, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, []);
    return (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl text-primary-text text-sm font-bold flex items-center gap-3 animate-bounce-once ${type === 'error' ? 'bg-primary-hover' : 'bg-success'}`}>
            <span className="material-symbols-outlined">{type === 'error' ? 'error' : 'check_circle'}</span>
            {message}
        </div>
    );
};

const ArtistDashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, appsRes] = await Promise.all([
                    getMyProfile(),
                    getMyApplications(),
                ]);
                setProfile(profileRes.data);
                setMyApplications(appsRes.data || []);
            } catch (err) {
                console.error('Dashboard error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Listen for real-time verification updates
        window.addEventListener('userStateChange', fetchData);
        return () => window.removeEventListener('userStateChange', fetchData);
    }, []);

    const userData = {
        name: profile?.fullName || 'Artist',
        roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
            : profile?.profilePicture,
    };

    const verificationStatus = profile?.user?.verificationStatus || authUser?.verificationStatus || 'none';

    const activeApps = myApplications.slice(0, 3);
    const newInvitesCount = myApplications.filter(a => a.status === 'auditioning').length;
    const shortlistedCount = myApplications.filter(a => a.status === 'shortlisted').length;
    const firstName = profile?.fullName?.split(' ')[0] || 'Artist';

    // Profile strength calc
    const fields = [
        profile?.bio,
        profile?.profilePicture && profile?.profilePicture !== 'no-photo.jpg',
        profile?.skills?.length > 0,
        profile?.location,
        profile?.talentCategory,
    ];
    const filled = fields.filter(Boolean).length;
    const pct = Math.max(20, Math.round((filled / fields.length) * 100));
    const circumference = 2 * Math.PI * 36;
    const offset = circumference - (pct / 100) * circumference;

    // FIX: Stable profile views (no Math.random() in render — causes re-render flicker)
    const [profileViews] = useState(() => Math.floor(Math.random() * 50) + 120);

    return (
        <DashboardLayout
            menuItems={TALENT_MENU}
            userRole="India • Artist"
            userData={userData}
            verificationStatus={verificationStatus}
            noPadding={false}
        >
            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

            {loading ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4" />
                    <p className="text-text-secondary font-bold uppercase tracking-widest text-[10px]">Preparing your stage...</p>
                </div>
            ) : (
                <>
                    <div className="max-w-7xl mx-auto space-y-8">

                    {/* ── Pending Banner ── */}
                    {verificationStatus === 'pending' && (
                        <div className="bg-warning/40 border border-warning/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-2xl shadow-gold/20">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-warning text-2xl md:text-3xl font-bold">hourglass_empty</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg md:text-xl font-black text-warning mb-1">Verification Pending</h3>
                                <p className="text-sm text-warning/80 leading-relaxed">
                                    Your profile is currently under review by our team. This usually takes 1–2 business days.
                                    You'll be notified once your credentials are verified. Meanwhile, you can continue
                                    updating your profile to speed up the process.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/talent/verification/status')}
                                className="px-4 md:px-6 py-2 md:py-3 bg-warning hover:bg-warning text-primary-text font-black rounded-xl transition-all shadow-lg shadow-gold/20 whitespace-nowrap active:scale-95 text-sm"
                            >
                                View Status
                            </button>
                        </div>
                    )}

                    {/* ── Rejected Banner ── */}
                    {verificationStatus === 'rejected' && (
                        <div className="bg-primary-hover/40 border border-error/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-2xl shadow-primary/20">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-error text-2xl md:text-3xl font-bold">error</span>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg md:text-xl font-black text-error mb-1">Verification Not Accepted</h3>
                                <p className="text-sm text-error/80 leading-relaxed">
                                    Our team has reviewed your professional credentials and found some inconsistencies. Your access to applications and auditions is temporarily restricted. Please update your profile with valid industry association IDs and a clear showreel to re-apply.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/talent/portfolio')}
                                className="px-4 md:px-6 py-2 md:py-3 bg-primary-hover hover:bg-primary-hover text-primary-text font-black rounded-xl transition-all shadow-lg shadow-primary/20 whitespace-nowrap active:scale-95 text-sm"
                            >
                                Update Profile
                            </button>
                        </div>
                    )}

                    {/* ── Initial/None State Banner ── */}
                    {verificationStatus === 'none' && (
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col items-center text-center space-y-4 md:space-y-6">
                            <div className="size-16 md:size-20 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-3xl md:text-4xl">verified_user</span>
                            </div>
                            <div className="max-w-2xl">
                                <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight mb-3 text-text-primary dark:text-primary-text">Get Verified to Start Your Career</h2>
                                <p className="text-text-secondary dark:text-text-secondary text-sm md:text-base leading-relaxed font-medium">
                                    Welcome to Art-e-Techt! To maintain the highest quality of professionals on our platform,
                                    we require all artists to undergo a quick verification process. Once verified, you'll gain
                                    full access to project discovery, direct messaging with directors, and audition invites.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/talent/verify')}
                                className="px-6 md:px-10 py-3 md:py-4 bg-primary text-primary-text font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm"
                            >
                                Start Verification Now
                            </button>
                        </div>
                    )}

                    {/* ── Verified Dashboard Content ── */}
                    {verificationStatus === 'verified' && (
                        <>
                            {/* Welcome Banner — mobile hero card */}
                            <section className="relative overflow-hidden rounded-2xl md:rounded-3xl
                                bg-void lg:bg-void dark:bg-void
                                lg:dark:bg-card-dark
                                p-5 md:p-10 text-primary-text
                                border border-primary/20 lg:border-subtle/5"
                                style={{ background: 'linear-gradient(135deg, var(--color-void) 0%, var(--color-void) 100%)' }}>
                                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent" />
                                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                                    <div className="max-w-xl">
                                        <h2 className="text-xl sm:text-2xl md:text-4xl font-black mb-3 leading-tight">
                                            Hello {firstName}, you have{' '}
                                            <span className="text-primary">{newInvitesCount} new audition invites</span> today!
                                        </h2>
                                        <p className="text-text-secondary text-sm md:text-lg hidden sm:block">
                                            Your profile has been shortlisted for upcoming roles. Keep your portfolio updated for the best matches!
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-8">
                                            <button
                                                onClick={() => navigate('/talent/audition-invites')}
                                                className="px-5 md:px-6 py-3 bg-primary text-primary-text rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/30 text-sm"
                                            >
                                                View Invites →
                                            </button>
                                            <button
                                                onClick={() => navigate('/talent/portfolio')}
                                                className="px-5 md:px-6 py-3 bg-surface/10 text-primary-text border border-subtle/15 rounded-2xl font-black hover:bg-surface/20 transition-all text-sm"
                                            >
                                                Update Portfolio
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block w-32 h-32 md:w-48 md:h-48 relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                        <img
                                            alt="Dashboard Illustration"
                                            className="relative z-10 drop-shadow-2xl"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR8ROtSqiuCa9EuAEsjD36hMzCTgk9m3BbUCnMt2agd8pBu7YM74aPumqdVdV8fnWFF8aWrhm1Xrx1Ac_X9vQRPp4vyIKdRg6uRWwpWXYV0hjoQbs0Hg8ooemFU3FEeFhoKs3md52FyBqoSJzs7rsJCwXMOtaUEpdEjN9wh7ysfkutRGGYT5voE-LXovuhcWh1ug5tvuHNOxyrSQ2CApicCXZSJ0hxK402LugHDJSdj9a8bYbHmByUjgDi64BV8xhoz3KPjH3zMHjY"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Stats Cards — mobile-first layout */}
                            {/* Mobile: Total Apps wide card, then Invites + Views side by side */}
                            <div className="space-y-3">
                                {/* Total Applications — full-width on mobile with icon right */}
                                <div className="bg-surface dark:bg-void p-4 md:p-6 rounded-2xl border border-border dark:border-subtle/5 flex items-center justify-between">
                                    <div>
                                        <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Total Applications</p>
                                        <h3 className="text-4xl md:text-3xl font-black dark:text-primary-text leading-none mt-1">{myApplications.length}</h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                                    </div>
                                </div>
                                {/* Invites + Views - 2 cols on mobile */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-surface dark:bg-void p-4 rounded-2xl border border-border dark:border-subtle/5">
                                        <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Audition Invites</p>
                                        <div className="flex items-end gap-2 mt-1">
                                            <h3 className="text-3xl font-black dark:text-primary-text leading-none">{String(newInvitesCount).padStart(2, '0')}</h3>
                                            <span className="text-success text-base mb-0.5">↑</span>
                                        </div>
                                    </div>
                                    <div className="bg-surface dark:bg-void p-4 rounded-2xl border border-border dark:border-subtle/5">
                                        <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Profile Views</p>
                                        <div className="flex items-end gap-2 mt-1">
                                            <h3 className="text-3xl font-black dark:text-primary-text leading-none">{profileViews > 999 ? (profileViews/1000).toFixed(1) + 'k' : profileViews}</h3>
                                            <span className="text-success text-base mb-0.5">↑</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                {/* Active Applications — full section */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg md:text-xl font-bold dark:text-primary-text">Active Applications</h2>
                                        <button onClick={() => navigate('/talent/applied-projects')} className="text-sm font-bold text-primary hover:underline">View All</button>
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        {activeApps.length === 0 ? (
                                            <p className="text-text-secondary dark:text-text-secondary text-sm">You haven't applied to any open projects yet.</p>
                                        ) : activeApps.map((app) => (
                                            <div key={app._id} className="bg-surface dark:bg-void border border-border dark:border-subtle/5 rounded-2xl p-4 hover:border-primary/40 transition-all group">
                                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                                    <div className="w-full sm:w-20 h-28 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                                                        <img
                                                            alt="Project Cover"
                                                            className="w-full h-full object-cover"
                                                            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                                            <div className="min-w-0 flex-1">
                                                                <h3 className="text-base md:text-lg font-bold group-hover:text-primary transition-colors dark:text-primary-text truncate">{app.project?.title || 'Project'}</h3>
                                                                <p className="text-sm text-text-secondary dark:text-text-secondary">{app.project?.category || 'Category'} • Production</p>
                                                            </div>
                                                            <span className={`px-2 md:px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full self-start sm:self-center ${
                                                                app.status === 'shortlisted'
                                                                    ? 'bg-primary text-primary-text shadow-lg shadow-primary/20'
                                                                    : 'bg-surface dark:bg-surface/10 text-text-muted dark:text-text-primary'
                                                            }`}>
                                                                {app.status}
                                                            </span>
                                                        </div>
                                                        <div className="mt-3 md:mt-4 flex flex-wrap gap-3 md:gap-4 text-xs font-medium text-text-secondary dark:text-text-secondary">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                                                <span className="truncate">{app.project?.location || 'India'}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="material-symbols-outlined text-sm">person</span>
                                                                Role
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                                                Applied: {new Date(app.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border dark:border-subtle/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                            {app.status === 'shortlisted' ? (
                                                                <div className="flex -space-x-2">
                                                                    <div className="w-6 h-6 rounded-full border-2 border-subtle dark:border-card-dark bg-surface-low" />
                                                                    <div className="w-6 h-6 rounded-full border-2 border-subtle dark:border-card-dark bg-surface-low" />
                                                                    <div className="w-6 h-6 rounded-full border-2 border-subtle dark:border-card-dark bg-high-surface flex items-center justify-center text-[8px] text-primary-text">+8</div>
                                                                </div>
                                                            ) : (
                                                                <p className="text-[10px] font-bold text-text-secondary italic">Pending review</p>
                                                            )}
                                                            <button className="text-xs font-bold px-3 md:px-4 py-1.5 bg-surface-lowest dark:bg-surface/5 dark:text-text-primary rounded-lg hover:bg-primary hover:text-primary-text transition-all self-start sm:self-center">
                                                                Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Profile Strength + Upcoming Auditions sidebar */}
                                <div className="space-y-4">
                                    {/* Profile Strength Widget */}
                                    <div className="bg-surface dark:bg-void border border-border dark:border-subtle/5 rounded-2xl p-4 md:p-6">
                                        <h2 className="text-base md:text-lg font-bold mb-4 dark:text-primary-text">Profile Strength</h2>
                                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                                            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                                                    <circle className="text-text-primary dark:text-primary-text/5" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeWidth="8" />
                                                    <circle
                                                        className="text-primary transition-all duration-1000"
                                                        cx="40" cy="40" fill="transparent" r="36"
                                                        stroke="currentColor"
                                                        strokeDasharray={circumference}
                                                        strokeDashoffset={offset}
                                                        strokeWidth="8"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-lg md:text-xl font-black dark:text-primary-text">{pct}%</span>
                                                </div>
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <p className="text-sm font-bold text-text-muted dark:text-text-primary leading-tight">Almost there, {firstName}!</p>
                                                <p className="text-xs text-text-secondary dark:text-text-secondary mt-1">A complete profile gets 5x more invites.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Action Required</p>
                                            <button
                                                onClick={() => navigate('/talent/portfolio')}
                                                className="w-full text-left flex items-start gap-3 p-3 bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-primary text-lg md:text-xl">play_circle</span>
                                                <div>
                                                    <p className="text-xs font-bold text-text-primary dark:text-text-primary">Add a showreel</p>
                                                    <p className="text-[10px] text-text-secondary dark:text-text-secondary">Video reels increase profile views by 40%.</p>
                                                </div>
                                                <span className="ml-auto text-primary text-xs font-black">→</span>
                                            </button>
                                            <button
                                                onClick={() => navigate('/talent/portfolio')}
                                                className="w-full text-left flex items-start gap-3 p-3 bg-surface-lowest dark:bg-surface/5 border border-border dark:border-subtle/5 rounded-xl hover:bg-surface-lowest dark:hover:bg-surface/10 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-text-secondary text-lg md:text-xl">photo_library</span>
                                                <div>
                                                    <p className="text-xs font-bold text-text-primary dark:text-text-primary">Update headshots</p>
                                                    <p className="text-[10px] text-text-secondary dark:text-text-secondary">Your last photo update was 6 months ago.</p>
                                                </div>
                                                <span className="ml-auto text-text-secondary text-xs font-black">→</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Upcoming Auditions */}
                                    <div className="bg-surface dark:bg-void border border-border dark:border-subtle/5 rounded-2xl p-4 md:p-6">
                                        <div className="flex items-center justify-between mb-4 md:mb-6">
                                            <h2 className="text-base md:text-lg font-bold dark:text-primary-text">Upcoming Auditions</h2>
                                            <span className="material-symbols-outlined text-text-secondary">calendar_month</span>
                                        </div>
                                        <div className="space-y-4">
                                            {shortlistedCount === 0 ? (
                                                <p className="text-sm text-text-secondary dark:text-text-secondary italic">No upcoming auditions scheduled yet.</p>
                                            ) : (
                                                <div className="relative pl-4 md:pl-6 border-l-2 border-primary">
                                                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20" />
                                                    <p className="text-[10px] font-black text-primary uppercase">Tomorrow • 2:00 PM</p>
                                                    <h4 className="text-sm font-bold mt-0.5 dark:text-primary-text">The Last Dynasty</h4>
                                                    <p className="text-xs text-text-secondary dark:text-text-secondary">Final Callback Audition • Studio 4B</p>
                                                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                                                        <button className="px-3 py-1.5 bg-primary text-primary-text text-[10px] font-bold rounded-md hover:bg-primary/90 transition-colors">View Script</button>
                                                        <button className="px-3 py-1.5 bg-surface-lowest dark:bg-surface/5 text-[10px] font-bold rounded-md hover:bg-surface dark:hover:bg-surface/10 dark:text-text-primary transition-colors">Map</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* FIX: was missing closing </div> for sidebar space-y-8 wrapper */}
                                </div>
                            </div>
                        </>
                    )}
                    </div>
                    {/* Workshops & Masterclasses for talent */}
                    <div className="mt-10">
                        <WorkshopPortalSection variant="talent" />
                    </div>
                </>
            )}
        </DashboardLayout>
    );
};

export default ArtistDashboard;
