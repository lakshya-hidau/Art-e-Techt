import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArtLogo from './common/ArtLogo';

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleTheme = () => document.documentElement.classList.toggle('dark');

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 dark:bg-void/90 backdrop-blur-md border-b border-border dark:border-subtle/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <ArtLogo />
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link className="text-text-muted dark:text-text-primary hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/">Home</Link>
            <Link className="text-text-muted dark:text-text-primary hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/find-talent">Find Talent</Link>
            <Link className="text-text-muted dark:text-text-primary hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/find-work">Find Work</Link>
            <Link className="text-text-muted dark:text-text-primary hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/productions">Productions</Link>
            <Link className="text-text-muted dark:text-text-primary hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/about-us">About Us</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/loginPage"
              className="bg-primary hover:bg-primary/90 text-primary-text dark:text-primary-text font-semibold px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
            >
              Sign In
            </Link>
            <button
              className="p-2 rounded-full hover:bg-surface-lowest dark:hover:bg-container transition-colors"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className="material-icons text-text-muted dark:text-text-primary">brightness_4</span>
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-text-muted dark:text-text-primary hover:text-primary" aria-label="Open menu" onClick={() => setIsMenuOpen(true)}>
              <span className="material-icons text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-8 px-4 bg-void/70 backdrop-blur-[8px] animate-fade-in">
          <div className="w-full flex justify-between items-center mb-8">
            <ArtLogo />
            <button className="text-primary-text p-2" aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
              <span className="material-icons text-3xl">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-6 w-full max-w-xs mx-auto text-center bg-surface/10 dark:bg-[var(--color-primary)] rounded-2xl p-6 shadow-2xl backdrop-blur-[16px] border border-subtle/10">
            <Link className="text-primary-text text-lg font-semibold py-2 rounded hover:bg-surface/20 transition" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link className="text-primary-text text-lg font-semibold py-2 rounded hover:bg-surface/20 transition" to="/find-talent" onClick={() => setIsMenuOpen(false)}>Find Talent</Link>
            <Link className="text-primary-text text-lg font-semibold py-2 rounded hover:bg-surface/20 transition" to="/find-work" onClick={() => setIsMenuOpen(false)}>Find Work</Link>
            <Link className="text-primary-text text-lg font-semibold py-2 rounded hover:bg-surface/20 transition" to="/productions" onClick={() => setIsMenuOpen(false)}>Productions</Link>
            <Link className="text-primary-text text-lg font-semibold py-2 rounded hover:bg-surface/20 transition" to="/about-us" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link className="bg-primary hover:bg-primary/90 text-primary-text font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-primary/30 mt-2" to="/loginPage" onClick={() => setIsMenuOpen(false)}>
              Sign In
            </Link>
            <button
              className="mt-2 p-2 rounded-full hover:bg-surface-lowest/10 text-primary-text mx-auto"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className="material-icons">brightness_4</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
