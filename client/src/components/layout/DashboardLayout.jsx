import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileBottomNav from './MobileBottomNav';
import { useNavigate } from 'react-router-dom';
import ArtLogo from '../common/ArtLogo';
import NotificationCenter from '../common/NotificationCenter';
import ThemeToggle from '../common/ThemeToggle';
import { logout } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { getStoredProfile } from '../../utils/authStorage';
import { buildDashboardIdentity } from '../../utils/dashboardIdentity';

const DashboardLayout = ({
    children,
    menuItems,
    userRole,
    userData,
    verificationStatus,
    headerTitle,
    headerSubtitle,
    headerActions,
    noPadding = false
}) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user: authUser } = useAuth();

    const stableUserData = buildDashboardIdentity({
        user: authUser,
        profile: getStoredProfile(),
        fallbackUserData: userData,
    });

    const headerRoleLabel = stableUserData?.roleTitle?.split(' • ')[0] || stableUserData?.roleTitle || '';

    const handleLogout = () => {
        logout().finally(() => {
            navigate('/login', { replace: true });
        });
    };

    return (
        <div className="admin-theme flex min-h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            <div className="hidden lg:block lg:w-[320px]">
                <Sidebar
                    menuItems={menuItems}
                    userRole={userRole}
                    verificationStatus={verificationStatus}
                    className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[320px]"
                />
            </div>

            <main className="relative flex-1 flex min-w-0 flex-col overflow-hidden">
                <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/50 bg-background-light/90 px-4 py-3 backdrop-blur-xl dark:border-subtle/5 dark:bg-void/95 lg:hidden">
                    <ArtLogo showWordmark={true} wordmarkClass="text-base" />

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <NotificationCenter />
                        {stableUserData && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu((v) => !v)}
                                    className="size-9 rounded-full border-2 border-primary/30 bg-cover bg-center shadow-md"
                                    style={{ backgroundImage: `url('${stableUserData.avatar}')` }}
                                    aria-label="User menu"
                                />
                                {showUserMenu && (
                                    <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-surface py-2 shadow-2xl dark:border-subtle/10 dark:bg-void">
                                        <div className="border-b border-border px-4 py-2 dark:border-subtle/5">
                                            <p className="truncate text-xs font-black dark:text-primary-text">{stableUserData.name}</p>
                                            <p className="truncate text-[10px] text-text-secondary">{stableUserData.roleTitle}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-error transition-colors hover:bg-error dark:hover:bg-primary/10"
                                        >
                                            <span className="material-symbols-outlined text-base">logout</span>
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                <header className="sticky top-0 z-[40] hidden border-b border-border bg-background-light/80 px-4 py-4 backdrop-blur-xl transition-all duration-500 dark:border-subtle/5 dark:bg-background-dark/80 sm:px-6 lg:block lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            {headerTitle && (
                                <h2 className="text-xl font-black uppercase italic leading-none tracking-tighter dark:text-primary-text sm:text-2xl">
                                    {headerTitle}
                                </h2>
                            )}
                            {headerSubtitle && (
                                <p className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-text-primary">
                                    <span className="size-1 rounded-full bg-primary animate-pulse" />
                                    {headerSubtitle}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <NotificationCenter />
                            {stableUserData && (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu((v) => !v)}
                                        className="flex items-center gap-3 group cursor-pointer"
                                    >
                                        <div className="hidden text-right sm:block">
                                            <p className="text-[11px] font-black uppercase italic leading-none tracking-tighter dark:text-primary-text">
                                                {stableUserData.name}
                                            </p>
                                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-text-secondary dark:text-text-primary">
                                                {headerRoleLabel}
                                            </p>
                                        </div>
                                        <div
                                            className="size-11 rounded-full border-2 border-primary/20 bg-cover bg-center shadow-lg transition-all duration-300 group-hover:border-primary/50"
                                            style={{ backgroundImage: `url('${stableUserData.avatar}')` }}
                                        />
                                    </button>
                                    {showUserMenu && (
                                        <div className="absolute right-0 z-50 mt-4 w-56 overflow-hidden rounded-2xl border border-border bg-surface py-2 shadow-2xl dark:border-subtle/10 dark:bg-card-dark">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-error transition-colors hover:bg-error dark:hover:bg-primary/10"
                                            >
                                                <span className="material-symbols-outlined text-lg">logout</span>
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                            {headerActions && <div className="flex items-center gap-4">{headerActions}</div>}
                        </div>
                    </div>
                </header>

                <div className={`flex-1 overflow-y-auto custom-scrollbar mobile-content-pad ${noPadding ? '' : 'px-4 pb-6 pt-4 sm:px-6 sm:pb-8 lg:px-10 lg:pb-10 lg:pt-6'}`}>
                    <div className={noPadding ? '' : 'max-w-7xl mx-auto'}>
                        {children}
                    </div>
                </div>
            </main>

            {menuItems && <MobileBottomNav menuItems={menuItems} />}
        </div>
    );
};

export default DashboardLayout;
