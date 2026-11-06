import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NotificationCenter from '../common/NotificationCenter';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const Header = ({ title, subtitle, showSearch = true, searchPlaceholder = "Search...", actions, userData, onMenuToggle }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout().finally(() => {
            navigate('/login', { replace: true });
        });
    };

    const profileLink = user?.role === 'talent' ? '/talent/portfolio' : user?.role === 'director' ? '/director/portfolio' : '/admin/profile';

    return (
        <header className="border-b border-border dark:border-subtle/5 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl sticky top-0 z-[40] transition-all duration-500 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {onMenuToggle && (
                            <button
                                type="button"
                                onClick={onMenuToggle}
                                className="lg:hidden rounded-2xl bg-surface-lowest dark:bg-surface/10 p-3 text-text-muted dark:text-text-primary shadow-lg shadow-border/10 transition hover:bg-primary/10 hover:text-primary"
                                aria-label="Toggle navigation menu"
                            >
                                <span className="material-symbols-outlined text-base">menu</span>
                            </button>
                        )}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tighter dark:text-primary-text uppercase leading-none italic">{title}</h2>
                            {subtitle && (
                                <p className="text-[10px] text-text-secondary dark:text-text-primary font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                                    <span className="size-1 bg-primary rounded-full animate-pulse"></span>
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <NotificationCenter />
                        <div className="h-6 w-px bg-surface dark:bg-surface/10 hidden sm:block"></div>
                        {userData && (
                            <div className="relative" ref={dropdownRef}>
                                <div
                                    className="flex items-center gap-4 pl-2 group cursor-pointer"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[11px] font-black dark:text-primary-text uppercase tracking-tighter leading-none italic">{userData.name}</p>
                                        <p className="text-[9px] text-text-secondary dark:text-text-primary font-bold uppercase tracking-[0.2em] mt-1">{userData.roleTitle?.split(' • ')[0]}</p>
                                    </div>
                                    <div
                                        className="size-11 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-lg group-hover:border-primary/50 transition-all duration-300"
                                        style={{ backgroundImage: `url('${userData.avatar}')` }}
                                    ></div>
                                </div>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-4 w-56 bg-surface dark:bg-card-dark border border-border dark:border-subtle/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <Link
                                            to={profileLink}
                                            onClick={() => setShowDropdown(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-text-muted dark:text-text-primary hover:bg-surface-lowest dark:hover:bg-surface/5 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">person</span>
                                            View Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-error hover:bg-error dark:hover:bg-primary/10 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">logout</span>
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        {actions && (
                            <div className="flex items-center gap-4">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>

                {showSearch && (
                    <div className="w-full">
                        <div className="relative w-full max-w-3xl">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary dark:text-text-primary transition-colors">search</span>
                            <input
                                className="w-full bg-surface-lowest dark:bg-surface/5 border-none rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-4 focus:ring-gold/10 text-text-muted dark:text-text-primary transition-all outline-none shadow-inner"
                                placeholder={searchPlaceholder}
                                type="text"
                            />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
