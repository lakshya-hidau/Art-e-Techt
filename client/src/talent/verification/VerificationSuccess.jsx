import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Confetti particle
const ConfettiParticle = ({ style }) => (
    <div className="absolute top-0 pointer-events-none" style={style} />
);

const CONFETTI_COLORS = ['var(--color-gold)', 'var(--color-secondary)', 'var(--color-gold)', 'var(--color-success)', 'var(--color-gold)', 'var(--color-primary)'];
const CONFETTI_PIECES = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    width: `${4 + (i % 8)}px`,
    height: `${4 + ((i * 3) % 8)}px`,
    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    borderRadius: i % 2 ? '50%' : '2px',
    animationDuration: `${1.5 + (i % 4) * 0.5}s`,
    animationDelay: `${(i % 5) * 0.2}s`,
    animationTimingFunction: 'ease-in',
    animationFillMode: 'forwards',
    animation: `confetti-fall ${1.5 + (i % 4) * 0.5}s ease-in ${(i % 5) * 0.2}s forwards`,
    transform: `rotate(${(i * 47) % 360}deg)`,
}));

const VerificationSuccess = ({ onDashboard }) => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [isDashboardLoading, setIsDashboardLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    useEffect(() => {
        // Mount animation
        requestAnimationFrame(() => setVisible(true));

    }, []);

    const handleDashboard = async () => {
        setIsDashboardLoading(true);
        await new Promise(r => setTimeout(r, 700));
        onDashboard();
    };

    const handleViewProfile = async () => {
        setIsProfileLoading(true);
        await new Promise(r => setTimeout(r, 500));
        navigate('/profile');
    };

    return (
        <div className="relative overflow-hidden w-full flex justify-center py-10">
            {/* Confetti layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <style>{`
                    @keyframes confetti-fall {
                        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(100vh) rotate(720deg); opacity: 0.3; }
                    }
                `}</style>
                {CONFETTI_PIECES.map(p => (
                    <ConfettiParticle key={p.id} style={p} />
                ))}
            </div>

            <div
                className={`max-w-[640px] w-full flex flex-col items-center text-center relative z-10 px-6 transition-all duration-700 ease-out ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                {/* Verified Badge Visual */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-50"></div>
                    <div className="relative w-48 h-48 lg:w-56 lg:h-56 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse"></div>
                        <div className="bg-gradient-to-br from-primary to-gold rounded-full p-8 shadow-2xl shadow-primary/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <span className="material-symbols-outlined text-primary-text text-[80px] lg:text-[100px] font-bold">verified</span>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 mb-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase">
                        Verified Artist
                    </span>
                    <h1 className="text-text-primary dark:text-primary-text text-4xl lg:text-6xl font-extrabold tracking-tight">
                        You're Verified!
                    </h1>
                    <p className="text-text-muted dark:text-text-primary text-lg lg:text-xl leading-relaxed max-w-lg mx-auto">
                        Your profile is now live with the{' '}
                        <span className="text-primary font-semibold">Verified badge</span>, giving you higher search priority and instant trust with top production houses.
                    </p>
                </div>

                {/* Success Card Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-12">
                    {[
                        {
                            icon: 'trending_up',
                            title: 'Priority Ranking',
                            desc: 'Be seen first by casting directors',
                        },
                        {
                            icon: 'workspace_premium',
                            title: 'Trust Seal',
                            desc: 'Authentic profile verification badge',
                        },
                        {
                            icon: 'notifications_active',
                            title: 'Instant Alerts',
                            desc: 'Get notified of matching casting calls',
                        },
                        {
                            icon: 'star',
                            title: 'Premium Access',
                            desc: 'Unlock exclusive audition opportunities',
                        },
                    ].map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 text-left hover:bg-primary/10 transition-colors"
                        >
                            <div className="bg-primary/20 p-2 rounded-lg text-primary flex-shrink-0">
                                <span className="material-symbols-outlined">{icon}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-primary-text">{title}</h4>
                                <p className="text-sm text-text-secondary dark:text-text-secondary">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                        onClick={handleDashboard}
                        disabled={isDashboardLoading}
                        className="flex-1 sm:flex-none sm:min-w-[200px] h-14 bg-primary hover:bg-primary/90 text-primary-text rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                    >
                        {isDashboardLoading ? (
                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        ) : (
                            <>
                                Go to Dashboard
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleViewProfile}
                        disabled={isProfileLoading}
                        className="flex-1 sm:flex-none sm:min-w-[200px] h-14 bg-surface dark:bg-container hover:bg-surface-low dark:hover:bg-container text-text-primary dark:text-primary-text rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                    >
                        {isProfileLoading ? (
                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        ) : (
                            <>
                                View My Public Profile
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationSuccess;
