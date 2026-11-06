import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

const NotificationCenter = () => {
    const { notifications, unreadCount, handleMarkAsRead, handleMarkAllRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-text-secondary dark:text-text-secondary hover:bg-surface-lowest dark:hover:bg-surface/5 rounded-xl transition-all active:scale-95"
            >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-primary-text text-[10px] font-black rounded-full flex items-center justify-center border-2 border-subtle dark:border-background-dark">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-80 bg-surface dark:bg-card-dark rounded-2xl shadow-2xl border border-border dark:border-border-dark z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-4 border-b border-border dark:border-subtle/5 flex items-center justify-between bg-surface-lowest/50 dark:bg-surface/5">
                            <h3 className="text-sm font-black uppercase tracking-widest text-text-primary dark:text-primary-text">Notifications</h3>
                            {unreadCount > 0 && (
                                <button 
                                    onClick={handleMarkAllRead}
                                    className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>
                        <div className="max-h-96 overflow-y-auto custom-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-text-secondary">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-20">notifications_off</span>
                                    <p className="text-xs font-bold uppercase tracking-widest">No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <Link
                                        key={notification._id}
                                        to={notification.link || '#'}
                                        onClick={() => {
                                            handleMarkAsRead(notification._id);
                                            setIsOpen(false);
                                        }}
                                        className={`block p-4 border-b border-border dark:border-subtle/5 hover:bg-surface-lowest dark:hover:bg-surface/5 transition-all ${!notification.read ? 'bg-primary/5' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`mt-1 size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                notification.type === 'message' ? 'bg-gold/10 text-gold' :
                                                notification.type === 'application' ? 'bg-gold/10 text-gold' :
                                                'bg-primary/10 text-primary'
                                            }`}>
                                                <span className="material-symbols-outlined text-sm">
                                                    {notification.type === 'message' ? 'chat' : 
                                                     notification.type === 'application' ? 'work' : 'notifications'}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black text-text-primary dark:text-primary-text">{notification.title}</p>
                                                <p className="text-[11px] text-text-secondary dark:text-text-secondary mt-1 line-clamp-2">{notification.message}</p>
                                                <p className="text-[9px] text-text-secondary mt-2 font-medium">
                                                    {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="size-2 bg-primary rounded-full mt-2"></div>
                                            )}
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                        <div className="p-3 bg-surface-lowest/50 dark:bg-surface/5 border-t border-border dark:border-subtle/5 text-center">
                            <button className="text-[10px] font-black text-text-secondary uppercase tracking-widest hover:text-primary transition-all">View All Activity</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationCenter;
