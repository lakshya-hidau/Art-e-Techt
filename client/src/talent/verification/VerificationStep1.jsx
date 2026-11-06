import React, { useState, useRef } from 'react';

const VerificationStep1 = ({ formData, updateFormData, onNext, onSave, isSaving }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    const idTypes = [
        { value: 'aadhar', label: 'Aadhar Card' },
        { value: 'passport', label: 'Passport' },
        { value: 'pan', label: 'PAN Card' },
    ];

    const handleFile = (file) => {
        setUploadError('');
        if (!file) return;
        const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowed.includes(file.type)) {
            setUploadError('Only JPEG, PNG, or PDF files are allowed.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('File size must be under 5MB.');
            return;
        }
        updateFormData({ idFile: file });
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setPreviewUrl(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl('pdf');
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const onDragLeave = () => setIsDragging(false);

    const removeFile = () => {
        setPreviewUrl(null);
        updateFormData({ idFile: null });
        setUploadError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const canContinue = !!formData.idFile;

    return (
        <div className="w-full max-w-[800px] space-y-8">
            {/* Progress Section */}
            <div className="flex flex-col gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-primary text-sm font-bold uppercase tracking-widest">Verification Process</p>
                        <h3 className="text-xl font-semibold">Step 1 of 3</h3>
                    </div>
                    <p className="text-primary text-2xl font-bold">33%</p>
                </div>
                <div className="h-3 w-full bg-surface dark:bg-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-700 ease-out" style={{ width: '33%' }}></div>
                </div>
                <p className="text-text-muted dark:text-text-secondary text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                    Identity &amp; Document Upload
                </p>
            </div>

            {/* Main Content Card */}
            <div className="bg-surface dark:bg-void/50 border border-border dark:border-primary/10 rounded-3xl p-8 shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Verify Your Identity</h1>
                    <p className="text-text-muted dark:text-text-secondary">To maintain a safe community for artists and scouts, please provide a valid government-issued ID.</p>
                </div>

                {/* ID Selection Tabs — Dynamic */}
                <div className="mb-8">
                    <label className="block text-sm font-medium mb-3 text-text-secondary uppercase tracking-tighter">Select ID Type</label>
                    <div className="flex p-1.5 bg-surface-lowest dark:bg-background-dark rounded-xl border border-border dark:border-border-subtle">
                        {idTypes.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => updateFormData({ idType: value })}
                                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                                    formData.idType === value
                                        ? 'bg-primary text-primary-text shadow-md shadow-primary/20'
                                        : 'text-text-secondary hover:text-text-muted dark:hover:text-text-primary'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Area */}
                {!previewUrl ? (
                    <div
                        className={`relative group border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center bg-primary/5 transition-all cursor-pointer ${
                            isDragging
                                ? 'border-primary bg-primary/10 scale-[1.01]'
                                : 'border-primary/30 hover:border-primary hover:bg-primary/8'
                        }`}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,application/pdf"
                            className="hidden"
                            onChange={e => handleFile(e.target.files[0])}
                        />
                        <div className={`w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 transition-transform duration-200 ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}>
                            <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-text-primary dark:text-primary-text">
                            {isDragging ? 'Drop it here!' : 'Upload or Drag & Drop'}
                        </h4>
                        <p className="text-text-secondary text-center max-w-xs mb-6">Support JPEG, PNG or PDF formats. Max file size 5MB.</p>
                        <button
                            type="button"
                            className="bg-primary hover:bg-primary/90 text-primary-text px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-95"
                            onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        >
                            Select File
                        </button>
                        {uploadError && (
                            <p className="mt-4 text-sm text-error flex items-center gap-1">
                                <span className="material-symbols-outlined !text-sm">error</span>
                                {uploadError}
                            </p>
                        )}
                    </div>
                ) : (
                    /* Preview Area */
                    <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 bg-primary/5 flex flex-col items-center justify-center p-6 gap-4">
                        <div className="absolute top-3 right-3">
                            <button
                                onClick={removeFile}
                                className="p-1.5 rounded-full bg-primary/90 hover:bg-primary-hover text-primary-text transition-colors"
                                title="Remove file"
                            >
                                <span className="material-symbols-outlined !text-lg">close</span>
                            </button>
                        </div>
                        {previewUrl === 'pdf' ? (
                            <div className="flex flex-col items-center gap-3 py-6">
                                <span className="material-symbols-outlined text-6xl text-primary">picture_as_pdf</span>
                                <p className="font-bold text-text-primary dark:text-primary-text">{formData.idFile?.name}</p>
                                <p className="text-sm text-text-secondary">PDF Document • {(formData.idFile?.size / 1024).toFixed(0)} KB</p>
                            </div>
                        ) : (
                            <img src={previewUrl} alt="ID Preview" className="max-h-64 rounded-xl object-contain shadow-md" />
                        )}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 text-success dark:text-success text-sm font-semibold">
                            <span className="material-symbols-outlined !text-sm">check_circle</span>
                            File uploaded successfully
                        </div>
                    </div>
                )}

                {/* Instruction Checklist */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h5 className="font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-success">task_alt</span>
                            Guidelines for success
                        </h5>
                        <ul className="space-y-3 text-sm text-text-secondary dark:text-text-secondary">
                            <li className="flex gap-2"><span className="material-symbols-outlined text-xs mt-1">check_circle</span> Ensure all 4 corners of the document are visible.</li>
                            <li className="flex gap-2"><span className="material-symbols-outlined text-xs mt-1">check_circle</span> Data must be clearly readable without glare.</li>
                            <li className="flex gap-2"><span className="material-symbols-outlined text-xs mt-1">check_circle</span> Document must be valid and not expired.</li>
                        </ul>
                    </div>
                    <div className="bg-surface-lowest dark:bg-background-dark/40 rounded-2xl p-4 flex items-center gap-4 border border-border dark:border-border-subtle">
                        <div className="w-24 h-16 bg-surface dark:bg-container rounded-lg flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-primary to-transparent"></div>
                            <span className="material-symbols-outlined text-text-secondary">image</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase text-primary">Pro Tip</p>
                            <p className="text-xs text-text-secondary">Place your ID on a dark, flat surface for better contrast.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="px-8 py-4 rounded-xl border border-border dark:border-border-subtle font-bold hover:bg-surface-lowest dark:hover:bg-container transition-colors disabled:opacity-60 flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <span className="material-symbols-outlined !text-base animate-spin">progress_activity</span>
                            Saving…
                        </>
                    ) : (
                        'Save Progress'
                    )}
                </button>
                <button
                    onClick={onNext}
                    disabled={!canContinue}
                    className={`px-12 py-4 rounded-xl text-primary-text font-bold transition-all flex items-center gap-2 shadow-xl shadow-primary/30 ${
                        canContinue
                            ? 'bg-primary hover:bg-primary/90 active:scale-95'
                            : 'bg-surface-low dark:bg-container cursor-not-allowed opacity-60'
                    }`}
                    title={!canContinue ? 'Please upload your ID document first' : ''}
                >
                    Continue to Step 2
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
            {!canContinue && (
                <p className="text-center text-sm text-warning flex items-center justify-center gap-1 -mt-4">
                    <span className="material-symbols-outlined !text-sm">info</span>
                    Upload your ID document to continue.
                </p>
            )}
        </div>
    );
};

export default VerificationStep1;
