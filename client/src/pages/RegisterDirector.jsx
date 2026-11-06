import ArtLogo from '../components/common/ArtLogo';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login, loginWithGoogle, autoLinkedInLogin } from '../services/authService';
import { getMyProfile } from '../services/profileService';
import { useAuth } from '../context/AuthContext';

const RegisterDirector = () => {
  const { setSessionFromAuthResponse } = useAuth();
  const industryTypes = [
    'Feature Films',
    'OTT / Web Series',
    'Advertising / Commercials',
    'Television',
    'Documentaries',
    'Short Films',
    'Music Videos',
    'Animation / VFX',
    'Branded Content',
    'Corporate / Industrial',
    'Theatre / Live Events',
    'Fashion Films',
    'Regional Cinema',
  ];

  const locations = [
    'Mumbai, India',
    'Delhi NCR, India',
    'Bengaluru, India',
    'Hyderabad, India',
    'Chennai, India',
    'Kolkata, India',
    'Los Angeles, USA',
    'New York, USA',
    'Vancouver, Canada',
    'Toronto, Canada',
    'London, UK',
    'Paris, France',
    'Berlin, Germany',
    'Madrid, Spain',
    'Rome, Italy',
    'Dubai, UAE',
    'Singapore, Singapore',
    'Hong Kong, China',
    'Tokyo, Japan',
    'Seoul, South Korea',
    'Bangkok, Thailand',
    'Sydney, Australia',
    'Melbourne, Australia',
    'Cape Town, South Africa',
    'Lagos, Nigeria',
    'Mexico City, Mexico',
    'São Paulo, Brazil',
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    productionName: '',
    email: '',
    mobile: '',
    industryType: '',
    location: '',
    password: '',
    role: formData.role || 'director', agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({ google: false, linkedin: false });
  const [error, setError] = useState('');
  const [lockUntil, setLockUntil] = useState(null);
  const navigate = useNavigate();

  const navigateAfterSocial = async () => {
    try {
      const res = await getMyProfile();
      const profile = res.data?.data || res.data || {};
      const required = ['fullName', 'mobile', 'location', 'companyName', 'industryType'];
      const missing = required.filter((field) => !profile?.[field]);
      if (missing.length) {
        navigate('/onboarding/complete-profile', { state: { role: formData.role || 'director', missing } });
      } else {
        navigate(formData.role === 'producer' ? '/dashboard/producer' : '/dashboard/director');
      }
    } catch {
      navigate(formData.role === 'producer' ? '/dashboard/producer' : '/dashboard/director');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockUntil && Date.now() < lockUntil) {
      setError(`Too many attempts. Try again in ${Math.ceil((lockUntil - Date.now()) / 1000)}s.`);
      return;
    }
    setLoading(true);
    setError('');

    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        role: formData.role || 'director',
        fullName: formData.fullName,
        companyName: formData.productionName,
        industryType: formData.industryType,
        location: formData.location,
        mobile: formData.mobile,
      };

      let authData = await register(userData);
      if (!authData?.token) {
        authData = await login(formData.email, formData.password);
      }
      setSessionFromAuthResponse(authData);
      setLockUntil(null);
      navigate(formData.role === 'producer' ? '/dashboard/producer' : '/dashboard/director');
    } catch (err) {
      console.error('Registration full error:', err);
      // Better error handling with more specific messages
      if (err.response?.data?.errors) {
        const fieldErrors = err.response.data.errors;
        const fieldName = Object.keys(fieldErrors)[0];
        const errorMessage = fieldErrors[fieldName]?.[0] || 'Invalid value';
        // Clean up field name for display
        const displayField = fieldName.replace(/([A-Z])/g, ' $1').trim();
        setError(`${displayField}: ${errorMessage}`);
      } else if (err.response?.data?.message) {
        // Handle network errors and other API errors
        const msg = err.response.data.message;
        if (msg.includes('email') || msg.includes('already exists')) {
          setError('This email is already registered. Try logging in instead.');
        } else if (msg.includes('network') || msg.includes('fetch')) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError(msg);
        }
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSocialLoading(prev => ({ ...prev, google: true }));
    try {
      const data = await loginWithGoogle('director');
      setSessionFromAuthResponse(data);
      await navigateAfterSocial();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Google sign-in failed.');
    } finally {
      setSocialLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleLinkedIn = async () => {
    setError('');
    setSocialLoading(prev => ({ ...prev, linkedin: true }));
    try {
      await autoLinkedInLogin('director');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'LinkedIn sign-in failed.');
    } finally {
      setSocialLoading(prev => ({ ...prev, linkedin: false }));
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-primary dark:text-text-primary min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side: Cinematic Visual */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-10"></div>
          <img
            alt="Cinematic film set with director's chair and lighting"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSmGtmAAW2971ysvBRRUCysxHnb4Ve7mxFFzaoxytav7_eoo-2ThA_-X59Mz47r5e7ACkTrxCCq2M7XbE4FATnvxXlSHQl17k3DnzuIbryJ6HGhS0ZfmfEK9WJXeX46sV0Yc20X7Jq38AdStng7O4vDZ-3sQMcju9RW5uCIR1F-hJIuejYdpbs6NzPT7Zd0Ad7B7EHTHFOa31at7SABR6TkbkGUsf1V1yZtWuI4Unkz39IH2FW2nC99bjMQ8FckVGd1iQZphKE69Im"
          />
          <div className="relative z-20 flex flex-col justify-end p-16 h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-1">
                <ArtLogo showWordmark={true} />
              </div>
              <h1 className="text-primary-text text-3xl font-black tracking-tighter uppercase">TALENT<span className="text-primary">CONNECT</span></h1>
            </div>
            <h2 className="text-primary-text text-5xl font-black leading-tight mb-4">Empowering Visionary <span className="text-primary">Storytellers</span></h2>
            <p className="text-text-primary text-lg max-w-md">Connect with India's finest talent pool and bring your creative visions to life with our premium casting infrastructure.</p>
          </div>
        </div>

        {/* Right Side: Sign-Up Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-32 bg-background-light dark:bg-background-dark overflow-y-auto">
          <div className="max-w-md w-full mx-auto lg:mx-0">
            {/* Mobile Branding */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <ArtLogo showWordmark={true} />
               <h2 className="text-text-primary dark:text-text-primary text-xl font-bold">TALENT<span className="text-primary">CONNECT</span></h2>
            </div>

            <div className="mb-10">
              <h3 className="text-3xl font-bold text-text-primary dark:text-text-primary mb-2">Create Professional Account</h3>
              <p className="text-text-muted dark:text-text-secondary">Join the elite circle of Indian production houses and directors.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-text-muted dark:text-text-primary">Full Name / Contact Person</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl">person</span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Karan Johar"
                    type="text"
                  />
                </div>
              </div>

              {/* Production House Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-text-muted dark:text-text-primary">Production House / Studio Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl">apartment</span>
                  <input
                    name="productionName"
                    value={formData.productionName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Dharma Productions"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-muted dark:text-text-primary">Business Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl">mail</span>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                      placeholder="contact@studio.com"
                      type="email"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-muted dark:text-text-primary">Mobile Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl">call</span>
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                      placeholder="+91 98XXX XXXXX"
                      type="tel"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Industry Type */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-muted dark:text-text-primary">Industry Type</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl">category</span>
                    <select
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none appearance-none transition-all"
                    >
                      <option value="">Select Industry</option>
                      {industryTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-muted dark:text-text-primary">Primary Location</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl">location_on</span>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all appearance-none"
                    >
                      <option value="">Select Primary Location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-text-muted dark:text-text-primary">Create Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl">lock</span>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface dark:bg-void border border-border dark:border-border-subtle rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                    placeholder="Min. 8 characters"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  id="terms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 rounded text-primary focus:ring-gold"
                />
                <label className="text-xs text-text-muted dark:text-text-secondary leading-tight" htmlFor="terms">
                  By signing up, I agree to Art-e-techt<a className="text-primary hover:underline" href="/terms-and-conditions">Terms of Service</a> and <a className="text-primary hover:underline" href="/privacy-policy">Privacy Policy</a>.
                </label>
              </div>

              {error && (
                <div className="bg-error dark:bg-primary/20 border border-error/50 text-error dark:text-error p-3 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}

              <button
                className={`w-full py-4 bg-primary hover:bg-primary/90 text-primary-text font-bold rounded-xl transition-all shadow-lg shadow-primary/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={loading || (lockUntil && Date.now() < lockUntil)}
              >
                {loading ? 'SETTING UP THE STAGE...' : 'Create Professional Account'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-border dark:border-border-subtle text-center">
              <p className="text-text-muted dark:text-text-secondary">
                Already have an account?
                <a className="text-primary font-bold hover:underline ml-1" href="/login">Log in here</a>
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogle}
                disabled={socialLoading.google}
                className="w-full border border-border dark:border-border-subtle bg-surface dark:bg-void text-text-primary dark:text-primary-text font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:border-primary/60 hover:shadow-md transition-all"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                <span>{socialLoading.google ? 'Connecting...' : 'Continue with Google'}</span>
              </button>
              <button
                type="button"
                onClick={handleLinkedIn}
                disabled={socialLoading.linkedin}
                className="w-full border border-border dark:border-border-subtle bg-surface dark:bg-void text-text-primary dark:text-primary-text font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:border-primary/60 hover:shadow-md transition-all"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-5 w-5" />
                <span>{socialLoading.linkedin ? 'Connecting...' : 'Continue with LinkedIn'}</span>
              </button>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">help</span> Support
              </button>
              <button className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">language</span> English
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDirector;
