import React from 'react';
import { Link } from 'react-router-dom';
import ArtLogo from './common/ArtLogo';

const Footer = () => {
  return (
    <footer className="bg-void text-text-secondary py-16 border-t border-subtle/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <ArtLogo />
            </div>
            <p className="text-sm leading-relaxed mb-6 text-text-secondary">
              The premier digital platform empowering creative professionals to showcase their work, discover visionary projects, and collaborate with directors and producers worldwide.
            </p>
            <div className="flex gap-4">
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                Global Platform
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold font-medium">
                Verified Community
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-primary-text font-bold mb-6 uppercase tracking-wider text-sm">For Artists & Talent</h4>
            <ul className="space-y-3 text-sm">
              <li><Link className="hover:text-primary transition-colors" to="/find-work">Browse Auditions & Roles</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/register/actor">Create Portfolio</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/artist-guidelines">Industry Guidelines</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/success-stories">Success Stories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-text font-bold mb-6 uppercase tracking-wider text-sm">For Directors & Producers</h4>
            <ul className="space-y-3 text-sm">
              <li><Link className="hover:text-primary transition-colors" to="/register/director">Post Casting Call</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/find-talent">Discover Talent</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/productions">Production Network</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/loginPage">Production Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-text font-bold mb-6 uppercase tracking-wider text-sm">Platform & Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="material-icons text-xs text-primary">email</span>
                <span>support@art-e-techt.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-xs text-primary">help</span>
                <Link to="/help-support" className="hover:text-primary transition-colors">Help Center</Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons text-xs text-primary">verified</span>
                <span>Identity Verified KYC</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-subtle/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-secondary">
          <p>© 2026 Art-e-techt • Where Creative Talent Meets Opportunity. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
