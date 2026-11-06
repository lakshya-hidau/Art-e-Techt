import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getMyProfile } from '../services/profileService';
import { DIRECTOR_MENU } from '../constants/navigation';
import socket from '../services/socket';

const MyProjects = () => {
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const { getMyProjects } = await import('../services/projectService');
                const [profileResult, projectsResult] = await Promise.allSettled([
                    getMyProfile(),
                    getMyProjects()
                ]);

                if (profileResult.status === 'fulfilled') {
                    setProfile(profileResult.value.data);
                }

                const rawProjects = projectsResult.status === 'fulfilled' ? (projectsResult.value.data || []) : [];
                const normalizedProjects = rawProjects.map((project) => ({
                    ...project,
                    _id: project._id || project.id,
                    id: project.id || project._id,
                }));
                setProjects(normalizedProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    // Filter projects based on active tab
    const filteredProjects = projects.filter(project => {
        switch (activeTab) {
            case 'open':
                return project.status === 'open';
            case 'closed':
                return project.status === 'closed';
            case 'drafts':
                return project.status === 'draft';
            default:
                return true; // 'all' shows all projects
        }
    });

    // Count projects for each tab
    const projectCounts = {
        all: projects.length,
        open: projects.filter(p => p.status === 'open').length,
        closed: projects.filter(p => p.status === 'closed').length,
        drafts: projects.filter(p => p.status === 'draft').length,
    };

    // Live updates when a project is created
    useEffect(() => {
        const handleProjectCreated = (project) => {
            const currentUserId = profile?.user?._id || profile?._id;
            const projectDirectorId = project?.director?._id || project?.director?.id || project?.director;

            // If it's my project, add it
            if (projectDirectorId === currentUserId) {
                const normalizedProject = {
                    ...project,
                    _id: project._id || project.id,
                    id: project.id || project._id,
                };
                setProjects((prev) => {
                    if (prev.find(p => p._id === normalizedProject._id || p.id === normalizedProject.id)) return prev;
                    return [normalizedProject, ...prev];
                });
            }
        };

        socket.on('projectCreated', handleProjectCreated);
        return () => {
            socket.off('projectCreated', handleProjectCreated);
        };
    }, [profile]);

    const userData = {
        name: profile?.fullName || 'Director',
        roleTitle: `${profile?.companyName || 'Lead Director'} • ${profile?.location || 'India'}`,
        avatar: profile?.profilePicture === 'no-photo.jpg'
            ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
            : profile?.profilePicture
    };

    return (
        <DashboardLayout
            menuItems={DIRECTOR_MENU}
            userRole="India • Director"
            userData={userData}
            headerTitle="My Projects"
            headerSubtitle="Track and manage your active film and media productions."
            searchPlaceholder="Search projects..."
        >
            <div className="bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary font-display min-h-screen">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
                        <p className="text-text-secondary font-bold uppercase tracking-widest text-[10px]">Loading Projects...</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        {/* Tabs/Filters */}
                        <div className="flex flex-wrap border-b border-border dark:border-primary/10 mb-6 md:mb-8 gap-2 md:gap-8 overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`pb-3 md:pb-4 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${
                                    activeTab === 'all'
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-text-secondary hover:text-text-primary dark:hover:text-text-primary'
                                }`}
                            >
                                All Projects ({projectCounts.all})
                            </button>
                            <button
                                onClick={() => setActiveTab('open')}
                                className={`pb-3 md:pb-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                    activeTab === 'open'
                                        ? 'border-primary text-primary font-bold'
                                        : 'border-transparent text-text-secondary hover:text-text-primary dark:hover:text-text-primary'
                                }`}
                            >
                                Open ({projectCounts.open})
                            </button>
                            <button
                                onClick={() => setActiveTab('closed')}
                                className={`pb-3 md:pb-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                    activeTab === 'closed'
                                        ? 'border-primary text-primary font-bold'
                                        : 'border-transparent text-text-secondary hover:text-text-primary dark:hover:text-text-primary'
                                }`}
                            >
                                Closed ({projectCounts.closed})
                            </button>
                            <button
                                onClick={() => setActiveTab('drafts')}
                                className={`pb-3 md:pb-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                    activeTab === 'drafts'
                                        ? 'border-primary text-primary font-bold'
                                        : 'border-transparent text-text-secondary hover:text-text-primary dark:hover:text-text-primary'
                                }`}
                            >
                                Drafts ({projectCounts.drafts})
                            </button>
                        </div>
                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                            {filteredProjects.map((project) => {
                                const daysUntilDue = Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                                const projectId = project._id || project.id;
                                return (
                                <div key={projectId} className="bg-surface dark:bg-card-dark border border-border dark:border-subtle/5 rounded-xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col shadow-sm">
                                    <div className="relative h-40 md:h-48 w-full overflow-hidden shrink-0">
                                        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485090916755-2bc2fdf84c62?auto=format&fit=crop&q=80')" }}></div>
                                        <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${project.status === 'open' ? 'bg-primary text-primary-text' : 'bg-high-surface text-primary-text'}`}>
                                                {project.status === 'open' ? 'In Production' : project.status}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex justify-between items-end z-10">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-primary-text/80 text-xs font-bold uppercase tracking-widest mb-1 truncate">{project.category}</p>
                                                <h3 className="text-primary-text text-lg md:text-xl font-black leading-tight drop-shadow-md line-clamp-2">{project.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-5 flex flex-col gap-3 md:gap-4 flex-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex -space-x-2">
                                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-subtle dark:border-card-dark bg-surface dark:bg-container flex items-center justify-center text-[10px] font-bold text-text-secondary">
                                                    <span className="material-symbols-outlined text-sm">people</span>
                                                </div>
                                            </div>
                                            <span className={`font-bold text-xs ${daysUntilDue < 0 ? 'text-error' : 'text-text-secondary'}`}>
                                                {daysUntilDue < 0 ? 'Closed' : `Due in ${daysUntilDue} days`}
                                            </span>
                                        </div>
                                        <div className="mt-auto pt-3 md:pt-4 flex flex-col sm:flex-row gap-2 md:gap-3">
                                            <Link to={`/director/project/${projectId}`} className="flex-1 bg-surface-lowest dark:bg-surface/5 text-text-primary dark:text-primary-text hover:bg-primary hover:text-primary-text py-2 md:py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 text-center">
                                                Overview
                                            </Link>
                                            <Link to={`/director/project/${projectId}/auditions`} className="flex-1 bg-primary text-primary-text hover:brightness-110 py-2 md:py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-center">
                                                Auditions
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )})}
                            {/* Start New Production */}
                            <Link to="/director/create-project/step1" className="border-2 border-dashed border-border dark:border-primary/20 rounded-xl flex flex-col items-center justify-center p-6 md:p-8 min-h-[300px] md:min-h-[340px] hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface-lowest dark:bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-2xl md:text-3xl text-text-secondary group-hover:text-primary transition-colors">add_to_photos</span>
                                </div>
                                <h4 className="font-bold text-base md:text-lg mb-1 text-text-primary dark:text-primary-text text-center">Start New Production</h4>
                                <p className="text-text-secondary dark:text-text-secondary text-sm text-center">Post a new project and start casting immediately.</p>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyProjects;
