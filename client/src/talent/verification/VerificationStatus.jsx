import React, { useEffect, useState } from 'react';

const VerificationStatus = ({ onReturn }) => {
    const [isReturning, setIsReturning] = useState(false);
    // Animate the hourglass icon continuously
    const [hourglassFlip, setHourglassFlip] = useState(false);

    useEffect(() => {
        const iv = setInterval(() => setHourglassFlip(f => !f), 2000);
        return () => clearInterval(iv);
    }, []);

    const handleReturn = async () => {
        setIsReturning(true);
        await new Promise(r => setTimeout(r, 800));
        onReturn();
    };

    const handleSupport = () => {
        if (typeof window !== 'undefined') {
            window.open('/support', '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="max-w-[560px] w-full bg-surface dark:bg-surface/5 border border-border dark:border-primary/10 rounded-2xl p-8 lg:p-12 shadow-2xl">
            {/* Status Icon */}
            <div className="flex justify-center mb-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full"></div>
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30">
                        <span
                            className={`material-symbols-outlined text-5xl text-primary font-bold transition-transform duration-700 ease-in-out ${hourglassFlip ? 'rotate-180' : 'rotate-0'}`}
                        >
                            hourglass_empty
                        </span>
                    </div>
                </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-10 text-text-primary dark:text-primary-text">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">Verification Under Review</h1>
                <p className="text-text-muted dark:text-text-secondary text-lg">
                    Our talent acquisition team is currently reviewing your profile to ensure authenticity and professional standards.
                </p>
            </div>

            {/* Timeline */}
            <div className="space-y-0 relative mb-10">
                {/* Step 1: Completed */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-text">
                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                        </div>
                        <div className="w-0.5 h-12 bg-primary"></div>
                    </div>
                    <div className="pt-0.5">
                        <h3 className="font-bold text-primary">Submitted</h3>
                        <p className="text-sm text-text-secondary dark:text-text-secondary">Your profile details were received successfully.</p>
                    </div>
                </div>

                {/* Step 2: In Progress — pulsing ring */}
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary bg-primary/10 text-primary relative">
                            <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-40"></span>
                            <span className="material-symbols-outlined text-sm font-bold z-10">schedule</span>
                        </div>
                        <div className="w-0.5 h-12 bg-surface-low dark:bg-container"></div>
                    </div>
                    <div className="pt-0.5 text-text-primary dark:text-primary-text">
                        <h3 className="font-bold">Reviewing</h3>
                        <p className="text-sm text-text-secondary dark:text-text-secondary">Our team is verifying your portfolio and credentials.</p>
                    </div>
                </div>

                {/* Step 3: Pending */}
                <div className="flex gap-4 text-text-secondary">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-border dark:border-border-subtle bg-transparent">
                            <span className="material-symbols-outlined text-sm font-bold">verified</span>
                        </div>
                    </div>
                    <div className="pt-0.5">
                        <h3 className="font-bold">Verification Result</h3>
                        <p className="text-sm text-text-secondary dark:text-text-secondary">Estimated completion within 24-48 hours.</p>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-10 flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary mt-1">info</span>
                <div>
                    <p className="text-sm font-medium text-text-primary dark:text-text-primary">Expected Time: 24-48 Hours</p>
                    <p className="text-xs text-text-secondary dark:text-text-secondary mt-1">
                        You will receive an email and a push notification as soon as your status is updated.
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                <button
                    onClick={handleReturn}
                    disabled={isReturning}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-text font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                >
                    {isReturning ? (
                        <>
                            <span className="material-symbols-outlined !text-base animate-spin">progress_activity</span>
                            Returning…
                        </>
                    ) : (
                        <>
                            Return to Dashboard
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </>
                    )}
                </button>
                <button
                    onClick={handleSupport}
                    className="w-full bg-transparent hover:bg-surface-lowest dark:hover:bg-surface/5 text-text-muted dark:text-text-secondary font-medium py-3 rounded-xl transition-all text-sm underline underline-offset-4 active:scale-95"
                >
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default VerificationStatus;
