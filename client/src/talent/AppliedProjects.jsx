import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import { getMyProfile } from '../services/profileService';
import { getMyApplications } from '../services/projectService';
import { useNotifications } from '../context/NotificationContext';

const STATUS_CONFIG = {
    applied:     { label: 'Applied',     color: 'bg-high-surface text-primary-text' },
    shortlisted: { label: 'Shortlisted', color: 'bg-primary text-primary-text' },
    auditioning: { label: 'Auditioning', color: 'bg-gold text-primary-text' },
    rejected:    { label: 'Rejected',    color: 'bg-primary text-primary-text' },
    selected:    { label: 'Offered!',    color: 'bg-success text-primary-text' },
};

const FILTERS = ['All', 'Shortlisted', 'Auditioning', 'Offered', 'Applied'];

const Toast = ({ message, type, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
    return (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl text-primary-text text-sm font-bold flex items-center gap-3 animate-slide-up ${type === 'error' ? 'bg-primary-hover' : 'bg-success'}`}>
            <span className="material-symbols-outlined">{type === 'error' ? 'error' : 'check_circle'}</span>
            {message}
        </div>
    );
};

const AppliedProjects = () => {
    const projectIdOf = (p) => {
        if (!p) return '';
        if (typeof p === 'string') return p;
        if (typeof p === 'object') {
            return p.id || p._id || p.projectId || (p.project ? projectIdOf(p.project) : '');
        }
        return '';
    };

    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const { user: authUser } = useNotifications();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, appsRes] = await Promise.all([
                    getMyProfile(),
                    getMyApplications(),
                ]);
                setProfile(profileRes.data);
                setApplications(appsRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setToast({ message: 'Failed to load applications', type: 'error' });
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

    const filteredApps = applications.filter(app => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Offered') return app.status === 'selected';
        return app.status === activeFilter.toLowerCase();
    });

    const statusCount = (s) => applications.filter(a => a.status === s).length;

    const FILTER_TABS = [
        { label: `All (${applications.length})`, key: 'All' },
        { label: `Shortlisted (${statusCount('shortlisted')})`, key: 'Shortlisted' },
        { label: `Auditioning (${statusCount('auditioning')})`, key: 'Auditioning' },
        { label: `Offered (${statusCount('selected')})`, key: 'Offered' },
        { label: `Applied (${statusCount('applied')})`, key: 'Applied' },
    ];

    if (loading) return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist"
            userData={{ name: '...', roleTitle: '...', avatar: '' }}
            headerTitle="Applied Projects" headerSubtitle="Loading...">
            <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout menuItems={TALENT_MENU} userRole="India • Artist" userData={userData} verificationStatus={verificationStatus}
            headerTitle="Applied Projects" headerSubtitle="Manage and track your project applications."
            searchPlaceholder="Search your applications...">
            {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
            <div className="space-y-6 md:space-y-8 pb-12">
                {/* Stats Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { label: 'Total', count: applications.length, icon: 'description', color: 'text-text-secondary' },
                        { label: 'Shortlisted', count: statusCount('shortlisted'), icon: 'star', color: 'text-primary' },
                        { label: 'Auditioning', count: statusCount('auditioning'), icon: 'mic', color: 'text-gold' },
                        { label: 'Offered', count: statusCount('selected'), icon: 'verified', color: 'text-success' },
                    ].map(({ label, count, icon, color }) => (
                        <div key={label} className="bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-2xl p-3 md:p-5 flex items-center gap-3 md:gap-4 shadow-sm">
                            <span className={`material-symbols-outlined text-xl md:text-2xl ${color}`}>{icon}</span>
                            <div>
                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-secondary dark:text-text-secondary">{label}</p>
                                <p className="text-xl md:text-2xl font-black dark:text-primary-text italic">{count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {FILTER_TABS.map(({ label, key }) => (
                        <button
                            key={key}
                            onClick={() => setActiveFilter(key)}
                            className={`px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                                activeFilter === key
                                    ? 'bg-primary text-primary-text shadow-lg shadow-primary/20'
                                    : 'bg-surface-lowest dark:bg-container text-text-muted dark:text-text-secondary hover:bg-primary/10 hover:text-primary'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {filteredApps.length === 0 ? (
                    <div className="bg-surface dark:bg-void border border-dashed border-border dark:border-border-subtle rounded-2xl p-8 md:p-16 text-center">
                        <span className="material-symbols-outlined text-4xl md:text-5xl text-text-primary mb-4 block">movie_filter</span>
                        <p className="text-text-secondary dark:text-text-secondary font-bold uppercase tracking-widest text-xs md:text-sm">No applications found</p>
                        <p className="text-text-secondary dark:text-text-secondary text-xs mt-2">Try a different filter or explore new projects</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6">
                        {filteredApps.map((app, index) => {
                            const proj = app.project;
                            const projectId = projectIdOf(proj);
                            const explicitId = projectId || app.id || app._id;
                            const appId = explicitId || `fallback-${index}`;
                            if (!explicitId) {
                                console.warn('AppliedProjects: missing explicit id for application', app);
                            }
                            const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.applied;
                            return (
                                <div key={appId}
                                    className="bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl overflow-hidden group hover:border-primary/50 transition-all shadow-sm">
                                    <div className="relative h-32 md:h-44 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"/>
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            alt={proj?.title || 'Project'}
                                            src={proj?.projectImage || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"}
                                        />
                                        <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 z-20">
                                            <span className={`px-2 md:px-2.5 py-1 text-[9px] md:text-[10px] font-black rounded uppercase tracking-widest ${cfg.color}`}>
                                                {cfg.label}
                                            </span>
                                        </div>
                                        {proj?.category && (
                                            <div className="absolute top-2 md:top-3 right-2 md:right-3 z-20">
                                                <span className="px-2 py-1 bg-void/60 text-primary-text text-[9px] md:text-[10px] font-bold rounded uppercase tracking-wider">
                                                    {proj.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 md:p-5 space-y-3 md:space-y-4">
                                        <div>
                                            <h4 className="text-base md:text-lg font-bold uppercase italic tracking-tighter dark:text-primary-text line-clamp-1">
                                                {proj?.title || 'Project Title'}
                                            </h4>
                                            <p className="text-xs md:text-sm text-text-secondary dark:text-text-secondary flex items-center gap-1 font-bold mt-1">
                                                <span className="material-symbols-outlined text-sm text-primary">movie</span>
                                                <span className="truncate">{proj?.director?.email?.split('@')[0] || 'Production House'}</span>
                                                {proj?.location && <span className="truncate"> • {proj.location}</span>}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-end border-t border-border dark:border-border-subtle pt-3 md:pt-4">
                                            <div className="space-y-1">
                                                <p className="text-[9px] md:text-[10px] text-text-secondary dark:text-text-secondary uppercase font-bold tracking-widest">Applied</p>
                                            <p className="text-[10px] md:text-[11px] text-text-secondary dark:text-text-secondary font-bold flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">calendar_today</span>
                                                {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (!projectId) return;
                                                navigate(`/talent/project/${projectId}`);
                                            }}
                                            disabled={!projectId}
                                            className={`p-2 md:p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                                                !projectId
                                                    ? 'bg-surface dark:bg-container text-text-secondary dark:text-text-secondary cursor-not-allowed opacity-60 hover:scale-100'
                                                    : app.status === 'selected'
                                                        ? 'bg-success/20 text-success hover:bg-success hover:text-primary-text'
                                                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-text'
                                            }`}
                                            >
                                                <span className="material-symbols-outlined text-base md:text-[20px]">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AppliedProjects;
