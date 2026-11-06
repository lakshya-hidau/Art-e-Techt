import ArtLogo from '../components/common/ArtLogo';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../services/authService';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        adminId: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await loginAdmin(formData.adminId, formData.password);

            console.log('Admin login successful');
            navigate('/dashboard/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Check your security clearance.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary min-h-screen selection:bg-primary/30">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-20 border-b border-primary/10">
                        <div className="flex items-center gap-2">
                            <ArtLogo showWordmark={true} />
                            <span className="text-xl font-extrabold tracking-tight text-primary-text">TALENT<span className="text-primary">CONNECT</span></span>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors flex items-center gap-1" href="#">
                                <span className="material-symbols-outlined text-sm">monitor_heart</span>
                                System Status
                            </a>
                            <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors flex items-center gap-1" href="#">
                                <span className="material-symbols-outlined text-sm">support_agent</span>
                                Emergency Admin Support
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-center py-10 px-4 md:px-0">
                        <div className="layout-content-container flex flex-col max-w-[1000px] w-full flex-1 gap-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                                {/* Left Visual */}
                                <div className="relative rounded-xl overflow-hidden min-h-[400px] lg:min-h-full border border-primary/20 group">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                         style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEoHWeJyvj7FdmrNV7Msqtr6ImJQ_maHY-PblxQXOe2pv91QZETx6jbdMw6mmAA3Ts_fl9F3A8PFUWZ4gtFyAjcPk11KscgcnO13ZCj5KQyzRMvHcBD8521i_NmkUHCrLtjID2GVDuTAQ5oLMyb50l7iLSKprbxf30CODv3MdYo1XgsjvqbysAFSH4KuAlvLItYned0F-LiP_8ojKoYg_QQngSGtPJ2j_7BKnxcvL7jY7ptPHcFspgFAgKQ_V7kih7KwzhV71RWB3U')" }}>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                                            Secure Terminal
                                        </div>
                                        <h2 className="text-3xl font-black text-primary-text leading-tight mb-2">Centralized Command</h2>
                                        <p className="text-text-primary text-sm leading-relaxed max-w-sm">
                                            Unauthorized access to this system is strictly prohibited. All sessions are logged and monitored by corporate security.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Form */}
                                <div className="flex flex-col bg-void/40 backdrop-blur-md p-8 lg:p-12 rounded-xl border border-subtle/5 shadow-2xl">
                                    <div className="mb-8">
                                        <h1 className="text-primary-text text-3xl font-bold leading-tight tracking-tight">Admin Authentication</h1>
                                        <p className="text-text-secondary text-base mt-2">Enter your secure credentials to proceed.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Admin ID / Email */}
                                        <div className="flex flex-col">
                                            <label className="text-text-primary text-sm font-semibold mb-2 ml-1">Admin ID / Email</label>
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">badge</span>
                                                <input
                                                    name="adminId"
                                                    value={formData.adminId}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-12 pr-4 py-4 rounded-lg bg-container/50 border border-border-subtle focus:border-gold focus:ring-1 focus:ring-gold text-primary-text placeholder-text-secondary outline-none transition-all"
                                                    placeholder="ADM-000-0000"
                                                    type="text"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="flex flex-col">
                                            <label className="text-text-primary text-sm font-semibold mb-2 ml-1">Secure Password</label>
                                            <div className="flex w-full items-stretch relative">
                                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">lock</span>
                                                <input
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-12 pr-12 py-4 rounded-lg bg-container/50 border border-border-subtle focus:border-gold focus:ring-1 focus:ring-gold text-primary-text placeholder-text-secondary outline-none transition-all"
                                                    placeholder="••••••••••••"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                                                >
                                                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="bg-primary/20 border border-error/50 text-error p-3 rounded-lg text-xs">
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full bg-primary hover:bg-primary/90 text-primary-text font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? 'AUTHORIZING...' : 'Authorize Access'}
                                            {!loading && <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">login</span>}
                                        </button>

                                        <div className="flex justify-between items-center text-xs text-text-secondary pt-4">
                                            <Link className="hover:text-primary underline decoration-primary/30" to="#">Forgot Admin Credentials?</Link>
                                            <span>v4.8.2-SECURE</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Badges */}
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 py-8 border-t border-primary/10">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">shield</span>
                            <span className="text-xs font-medium text-text-secondary">AES-256 Encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">history</span>
                            <span className="text-xs font-medium text-text-secondary">Real-time Audit Trail</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">fingerprint</span>
                            <span className="text-xs font-medium text-text-secondary">Multi-Factor Compliant</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 px-10 text-center md:text-left border-t border-subtle/5">
                        <div className="flex items-center gap-6">
                            <a className="text-xs font-medium text-text-secondary hover:text-primary" href="#">System Status</a>
                            <a className="text-xs font-medium text-text-secondary hover:text-primary" href="#">Emergency Support</a>
                        </div>
                        <p className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">
                            © 2026 Art-e-techt Global Operations. Restricted Access.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
