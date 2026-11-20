import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStoredAuth } from '../utils/authStorage';

const TopNav = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const auth = getStoredAuth();
  const user = auth?.user;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Talent', path: '/find-talent' },
    { name: 'Find Work', path: '/find-work' },
    { name: 'Productions', path: '/productions' },
    { name: 'About Us', path: '/about-us' },
  ];

  const getDashboardPath = (role) => {
    switch (role) {
      case 'talent':
        return '/dashboard/talent';
      case 'director':
        return '/dashboard/director';
      case 'producer':
        return '/dashboard/producer';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/dashboard/talent';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-void/90 backdrop-blur-md border-b border-border">
      <div className="h-20 w-full px-5 md:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo / Emblem */}
        <Link className="flex items-center gap-3 group" to="/">
          <div className="w-8 h-8 bg-surface-low flex items-center justify-center border border-border group-hover:border-secondary transition-colors">
            <span className="w-2.5 h-2.5 bg-secondary rotate-45 block"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-wider text-text-primary uppercase group-hover:text-secondary transition-colors">
              Art-e-techt
            </span>
            <span className="font-sans text-[9px] text-text-secondary uppercase tracking-[0.25em] -mt-1">
              Atelier • Archival Edition
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-6 2xl:gap-10">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-[0.15em] transition-colors py-1 ${
                  isActive
                    ? 'text-secondary font-semibold border-b border-secondary'
                    : 'text-text-secondary hover:text-secondary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Sign-in action and mobile navigation */}
        <div className="flex items-center gap-6">
          {user ? (
            <Link
              className="text-xs uppercase tracking-widest text-secondary hover:text-text-primary transition-colors px-2 py-2 flex items-center gap-1.5"
              to={getDashboardPath(user.role)}
            >
              <span className="material-symbols-outlined text-[16px]">account_circle</span>
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          ) : (
            <Link
              className="hidden sm:inline-block text-xs uppercase tracking-widest text-text-secondary hover:text-secondary transition-colors px-2 py-2"
              to="/loginPage"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            aria-label="Toggle Navigation"
            aria-expanded={mobileNavOpen}
            aria-controls="mobileNav"
            type="button"
            className="xl:hidden p-2 text-text-primary border border-border hover:border-secondary transition-colors"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span className="material-symbols-outlined text-[20px]">{mobileNavOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="xl:hidden w-full bg-background border-t border-border px-5 py-4 space-y-3" id="mobileNav">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-xs uppercase tracking-widest py-1 transition-colors ${
                  isActive ? 'text-secondary font-semibold' : 'text-text-secondary hover:text-secondary'
                }`}
                onClick={() => setMobileNavOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          {user ? (
            <Link
              className="block text-xs uppercase tracking-widest text-secondary hover:text-primary-text py-2 border-t border-border"
              to={getDashboardPath(user.role)}
              onClick={() => setMobileNavOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className="block text-xs uppercase tracking-widest text-secondary hover:text-primary-text py-2 border-t border-border"
              to="/loginPage"
              onClick={() => setMobileNavOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default TopNav;
