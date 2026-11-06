import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import ArtLogo from '../common/ArtLogo';

const Sidebar = ({
    menuItems,
    userRole,
    verificationStatus,
    className = '',
    isMobile = false,
    isOpen = true,
    onClose
}) => {
    const location = useLocation();
    const { user: authUser } = useNotifications();
    const effectiveStatus = verificationStatus || authUser?.verificationStatus || 'none';
    const isVerified = effectiveStatus === 'verified';

    const gradientBg = 'linear-gradient(180deg, var(--color-void) 0%, var(--color-void) 55%, var(--color-void) 100%)';
    const baseClasses = `border-r border-void flex flex-col shadow-[0_20px_60px_color-mix(in srgb, var(--color-void) 45%, transparent)] transition-transform duration-300 text-primary-text`;
    const desktopClasses = `${baseClasses} h-screen sticky top-0 flex-shrink-0 ${className}`;
    const mobileClasses = `${baseClasses} fixed inset-y-0 left-0 z-50 w-72 max-w-full ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className}`;
    const paddingClasses = isMobile ? 'px-6 pt-6 pb-4' : 'px-6 pt-8 pb-4';

    const handleLinkClick = () => {
        if (isMobile && onClose) {
            onClose();
        }
    };

    const normalizePath = (path = '') => path.endsWith('/') ? path : `${path}/`;

    return (
        <aside
            className={isMobile ? mobileClasses : desktopClasses}
            aria-hidden={!isMobile ? false : !isOpen}
            style={{ background: gradientBg }}
        >
            <div className={`${paddingClasses} flex items-center justify-between gap-4`}>
                <div className="flex items-center gap-3 cursor-pointer">
                    <ArtLogo showWordmark={false} />
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-text/90 leading-tight">ART-E-TECHT</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mt-0.5">{userRole || 'MEMBER'}</p>
                    </div>
                </div>
                {isMobile && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-surface/90 text-void p-2 shadow-lg shadow-border/40 hover:bg-surface/100 transition"
                        aria-label="Close navigation"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                )}
            </div>

            <nav className="flex-1 mt-6 space-y-2 overflow-y-auto custom-scrollbar pb-8">
                {menuItems.map((item, index) => {
                    if (item.type === 'section') {
                        return (
                            <div key={`section-${index}`} className="pt-3 pb-2 px-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-text/60">
                                    {item.label}
                                </p>
                            </div>
                        );
                    }

                    const normalizedPath = normalizePath(item.path || '');
                    const isActive = normalizedPath && location.pathname.startsWith(normalizedPath);
                    const isLocked = item.requiresVerification && !isVerified;

                    if (isLocked) {
                        return (
                            <div
                                key={`locked-${index}`}
                                title="Verification required to access this section"
                                className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl relative overflow-hidden cursor-not-allowed opacity-40 select-none text-primary-text/70 font-black uppercase tracking-[0.4em] text-[11px]"
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span className="flex-1">{item.label}</span>
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.path || index}
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-3.5 px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden uppercase tracking-[0.4em] text-[11px] ${
                                isActive
                                    ? 'bg-primary text-primary-text shadow-[0_20px_50px_color-mix(in srgb, var(--color-primary) 35%, transparent)]'
                                    : 'text-primary-text/70 hover:text-primary-text hover:bg-surface/10'
                            }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-70"></div>
                            )}
                            <span className={`material-symbols-outlined text-[20px] relative z-10 ${isActive ? 'fill-1' : 'group-hover:scale-110 transition-transform'}`}>
                                {item.icon}
                            </span>
                            <span className={`relative z-10 ${isActive ? 'font-black' : ''}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
