import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-void border-t border-border text-text-primary">
      <div className="w-full px-5 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-surface-low flex items-center justify-center border border-border">
                <span className="w-2 h-2 bg-secondary rotate-45 block"></span>
              </div>
              <span className="font-display font-bold text-lg text-text-primary uppercase tracking-wider">
                Art-e-techt
              </span>
            </div>
            <p className="font-sans text-xs text-text-secondary leading-relaxed max-w-sm">
              A sanctuary uniting monolithic architectural precision and exceptional creative visionaries. Engineering digital spaces for uncompromised creative postures.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-text-secondary">
              <span className="text-secondary font-semibold">Atelier System</span>
              <span>—</span>
              <span>Zero-Radius Specification</span>
            </div>
          </div>

          {/* Col 01: Talent & Discovery */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
              Explore
            </span>
            <nav className="flex flex-col space-y-1.5 text-xs text-text-secondary">
              <Link className="hover:text-secondary transition-colors" to="/find-talent">
                Talent Roster
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/find-work">
                Creative Briefs
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/productions">
                Production Houses
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/find-talent">
                Regional Vaults
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/about-us">
                Curated Monographs
              </Link>
            </nav>
          </div>

          {/* Col 02: Platform Ecosystem */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
              Platform
            </span>
            <nav className="flex flex-col space-y-1.5 text-xs text-text-secondary">
              <Link className="hover:text-secondary transition-colors" to="/#how-it-works">
                How It Works
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/about-us">
                Verified Credentials
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/productions">
                Studio Direct Access
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/find-work">
                Enterprise Casting
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/about-us">
                API &amp; Curation
              </Link>
            </nav>
          </div>

          {/* Col 03: Editorial & Atelier */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
              Atelier
            </span>
            <nav className="flex flex-col space-y-1.5 text-xs text-text-secondary">
              <Link className="hover:text-secondary transition-colors" to="/about-us">
                About Atelier
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/about-us">
                The Manifesto
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/productions">
                Press &amp; Releases
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/productions">
                Archival Records
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/about-us">
                Direct Contact
              </Link>
            </nav>
          </div>

          {/* Col 04: Legal & Code */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
              Legal Code
            </span>
            <nav className="flex flex-col space-y-1.5 text-xs text-text-secondary">
              <Link className="hover:text-secondary transition-colors" to="/privacy-policy">
                Privacy Protocol
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/terms-and-conditions">
                Terms of Engagement
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/terms-and-conditions">
                Rights &amp; Licensing
              </Link>
              <Link className="hover:text-secondary transition-colors" to="/artist-guidelines">
                Provenance Seal
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono text-text-secondary uppercase">
          <p>© 2025 Art-e-techt Atelier. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-text-primary">Strict 0px Architecture</span>
            <span className="text-secondary">•</span>
            <span>Regional Hub: India (BOM / DEL / BLR)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
