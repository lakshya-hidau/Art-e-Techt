import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Disciplines');

  const disciplines = ['All Disciplines', 'Actors', 'Directors', 'Models', 'DOPs'];

  return (
    <div className="bg-void text-text-primary font-sans selection:bg-secondary selection:text-primary-text min-h-screen">
      {/* Strict architectural brutalism: absolutely 0px radius on everything */}
      <style>{`
        .brutalist-root *, .brutalist-root *::before, .brutalist-root *::after {
          border-radius: 0px !important;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="brutalist-root">
        {/* ========================================================
             SECTION 01: ARCHITECTURAL HEADER & REGIONAL INDICATOR
             ======================================================== */}
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
              <Link className="text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-secondary transition-colors" to="/">
                Home
              </Link>
              <Link className="text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-secondary transition-colors" to="/find-talent">
                Find Talent
              </Link>
              <Link className="text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-secondary transition-colors" to="/find-work">
                Find Work
              </Link>
              <Link className="text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-secondary transition-colors" to="/productions">
                Productions
              </Link>
              <Link className="text-xs uppercase tracking-[0.15em] text-text-secondary hover:text-secondary transition-colors" to="/about-us">
                About Us
              </Link>
            </nav>

            {/* Sign-in action and mobile navigation */}
            <div className="flex items-center gap-6">
              <Link className="hidden sm:inline-block text-xs uppercase tracking-widest text-text-secondary hover:text-secondary transition-colors px-2 py-2" to="/loginPage">
                Sign In
              </Link>

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
              <Link className="block text-xs uppercase tracking-widest text-text-secondary hover:text-secondary py-1" to="/" onClick={() => setMobileNavOpen(false)}>
                Home
              </Link>
              <Link className="block text-xs uppercase tracking-widest text-text-secondary hover:text-secondary py-1" to="/find-talent" onClick={() => setMobileNavOpen(false)}>
                Find Talent
              </Link>
              <Link className="block text-xs uppercase tracking-widest text-text-secondary hover:text-secondary py-1" to="/find-work" onClick={() => setMobileNavOpen(false)}>
                Find Work
              </Link>
              <Link className="block text-xs uppercase tracking-widest text-text-secondary hover:text-secondary py-1" to="/productions" onClick={() => setMobileNavOpen(false)}>
                Productions
              </Link>
              <Link className="block text-xs uppercase tracking-widest text-text-secondary hover:text-secondary py-1" to="/about-us" onClick={() => setMobileNavOpen(false)}>
                About Us
              </Link>
              <Link className="block text-xs uppercase tracking-widest text-secondary hover:text-primary-text py-2 border-t border-border" to="/loginPage" onClick={() => setMobileNavOpen(false)}>
                Sign In
              </Link>
            </div>
          )}
        </header>

        <main className="w-full pt-20">
          {/* ========================================================
               SECTION 02: HERO SECTION WITH SPOTLIGHT
               ======================================================== */}
          <section className="relative w-full min-h-[92vh] flex items-center bg-void border-b border-border overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                alt="Cinematic wide shot of a creative film director in studio illuminated by a diagonal spotlight"
                className="w-full h-full object-cover object-right md:object-center filter brightness-[0.70] contrast-[1.10]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeMzKkj2qAcCsyySqUNYFxsmxmpmYhKOyMJlkqxYWGJUN7rc_NJTj0Gh75GrDdkk29LH45mB7K14FdpZeENBWm8GplOMXVQvXouPun-AvufI2fJkrftH8xprlDxSkyyn5QpVSZ8hvuImE2Dk1R_H_utGu-NLt28rHeuK-OUT3wdjxEYkfNOCqWy_BUwYPSElvM2aq5fJ7EZFMR7V6hbsDfF74GL8gX6jqKVmCLdayD"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-transparent w-full lg:w-3/5"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent"></div>
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-void to-transparent"></div>
            </div>

            <div className="relative z-10 w-full px-5 md:px-10 lg:px-16 py-16 flex flex-col justify-between min-h-[82vh]">
              <div className="max-w-2xl pt-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-background/90 border border-border backdrop-blur-md mb-6">
                  <span className="w-1.5 h-1.5 bg-secondary"></span>
                  <span className="font-sans text-[11px] text-secondary tracking-[0.25em] font-semibold uppercase">
                    DISCOVER • CREATE • COLLABORATE
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.04] mb-6">
                  Every Creative Vision Deserves Its{' '}
                  <span className="text-secondary italic font-serif font-normal block sm:inline">Spotlight.</span>
                </h1>

                <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mb-10">
                  Discover exceptional talent, explore meaningful creative opportunities, and connect with the people who bring extraordinary ideas to life.
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-10">
                  <Link
                    className="px-6 py-4 bg-secondary text-primary-text font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-tertiary transition-all flex items-center gap-2 border border-secondary shadow-[0_0_24px_color-mix(in srgb, var(--color-secondary) 25%, transparent)]"
                    to="/register/actor"
                  >
                    <span>I am an Artist</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                  <Link
                    className="px-6 py-4 bg-transparent text-text-primary font-sans text-xs uppercase tracking-[0.2em] font-medium border border-border hover:border-secondary hover:text-secondary transition-all flex items-center gap-2"
                    to="/register/director"
                  >
                    <span>I am a Director</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>

                <div className="inline-flex items-center gap-2 py-1 text-[11px] font-mono text-text-secondary tracking-wider uppercase border-l-2 border-secondary pl-3">
                  <span className="text-secondary">GEO-LOCATED:</span>
                  <span>SHOWING OPPORTUNITIES IN INDIA • MUMBAI • DELHI • BENGALURU</span>
                </div>
              </div>

              <div className="pt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-border/50 text-text-secondary">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[18px] animate-bounce">arrow_downward</span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-text-secondary">
                    Scroll down to browse curated archives
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-secondary font-bold">01</span>
                    <div className="w-16 h-[2px] bg-border relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-2/3 bg-secondary"></div>
                    </div>
                    <span className="text-text-secondary">04</span>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-text-secondary/70">VOL. 2025 ATELIER</span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 03: REGIONAL DISCOVERY FILTER STRIP
               ======================================================== */}
          <section className="w-full bg-background border-b border-border py-4">
            <div className="w-full px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 bg-secondary block"></span>
                <span className="text-text-secondary uppercase tracking-wider">Active Territory Curation:</span>
                <span className="text-text-primary font-semibold uppercase">India (Mumbai / Delhi / Bengaluru / Chennai)</span>
                <span className="text-[10px] text-secondary border border-secondary/40 px-1 py-0.5 ml-2 uppercase">Verified Nodes</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-[11px] text-text-secondary uppercase tracking-wider mr-1">Direct Filter:</span>
                {disciplines.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActiveFilter(item)}
                    className={`px-2.5 py-1 uppercase tracking-wider text-[11px] transition-colors ${
                      activeFilter === item
                        ? 'bg-surface-low border border-secondary text-secondary'
                        : 'bg-transparent border border-border hover:border-secondary text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 04: FEATURED CREATIVE TALENT (6 REALISTIC PROFILES)
               ======================================================== */}
          <section className="w-full bg-void py-16 border-b border-border" id="talent">
            <div className="w-full px-5 md:px-10 lg:px-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-[0.2em] mb-2">
                    <span className="w-1.5 h-1.5 bg-secondary"></span>
                    <span>Regional Talent Roster</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
                    The People Who Bring Ideas to Life.
                  </h2>
                  <p className="font-sans text-base text-text-secondary max-w-2xl mt-2">
                    Meet exceptional creative professionals and discover the talent behind extraordinary productions.
                  </p>
                </div>
                <a
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary hover:text-text-primary flex items-center gap-2 transition-colors self-start md:self-end border-b border-secondary/40 pb-1"
                  href="#talent"
                >
                  <span>Browse Full Talent Registry</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>

              {/* 6 Architectural Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Profile 1: Aarav Sharma */}
                <div className="bg-background border border-border hover:border-secondary transition-all duration-300 flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-low">
                    <img
                      alt="Portrait of dramatic method actor Aarav Sharma"
                      className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuChXeT-n-NB3R3LzzEoaiugzIlsEnTJWxdXiBAw6oBgwAdSoStYVQ1FO6ekDEZWtZfQG9GMFEmrIMjda_JxnVzqxZ_xDoHFWXgxKq0YaU6k1qAg1EqWrw7Ie-nbLb_0G8DzfAjPT1P_L1w4hAKnXeUt3foIJBrkg8U3H-iKDNuxmGIIF5jP-s7w7ds-8UAnPToidzpQkVhUDF8X1G6WlkMUdNPCQ5AOcpTsvATmbpF0"
                    />
                    <div className="absolute top-3 right-3 bg-void/90 border border-border px-2 py-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                      <span className="font-mono text-[9px] text-secondary tracking-widest uppercase">Verified</span>
                    </div>
                    <div className="absolute top-3 left-3 bg-primary text-error font-mono text-[9px] tracking-widest uppercase px-2 py-0.5">
                      Featured Lead
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display font-semibold text-xl text-text-primary group-hover:text-secondary transition-colors">
                          Aarav Sharma
                        </h3>
                        <span className="font-mono text-xs text-secondary">Mumbai, India</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-text-secondary mb-3 font-medium">Lead Actor • Screen &amp; Stage</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Method Acting</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Classical Hindi</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Action Combat</span>
                      </div>
                    </div>
                    <a className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-[0.15em] text-text-primary group-hover:text-secondary transition-colors" href="#talent">
                      <span>View Portfolio</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/* Profile 2: Ananya Mehta */}
                <div className="bg-background border border-border hover:border-secondary transition-all duration-300 flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-low">
                    <img
                      alt="Portrait of editorial high fashion model Ananya Mehta"
                      className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDriuEjdFTLQKsxc8UZZ02qkvQL6we2PYBeH0gswBl5WqEOpxsrUkc25g2GZAHnMs5pwa7OYzx1NG2SOO6EV1mqpxNGntGTlQC6UA4bxPoNlxHHk9_PfNxMxrS7LgPh3mwWrLf9zobyi8YYuDPcNk4ZG0o5TthGm0cMSpJPBxKU820UeBOEPLH5nLTv1ZvXCRufI-uSdzrN19pgwdlq9FiVgo6IQHFQsB_yw5SVUf0R"
                    />
                    <div className="absolute top-3 right-3 bg-void/90 border border-border px-2 py-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                      <span className="font-mono text-[9px] text-secondary tracking-widest uppercase">Verified</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display font-semibold text-xl text-text-primary group-hover:text-secondary transition-colors">
                          Ananya Mehta
                        </h3>
                        <span className="font-mono text-xs text-secondary">Delhi, India</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-text-secondary mb-3 font-medium">Fashion &amp; Editorial Model</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">High Fashion</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Editorial Runway</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Campaign Face</span>
                      </div>
                    </div>
                    <a className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-[0.15em] text-text-primary group-hover:text-secondary transition-colors" href="#talent">
                      <span>View Portfolio</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/* Profile 3: Rohan Verma */}
                <div className="bg-background border border-border hover:border-secondary transition-all duration-300 flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-low">
                    <img
                      alt="Portrait of auteur film director Rohan Verma in studio"
                      className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLwZqF77BClQc69JBaL7tqFqjfi-fOOM9CwqK4aRM8wmOxIBStKfrd5iS2cr9pbIlwlPM66o2ufUvwynBwe-HVXKZ_4E44cSFQSZ6OpKoV0arngtkmWxlcvszVb-UhPrhOzM_8j5hhLCXp1WQocKEY-gCIXw18dYuQqYTWHm1zLjbRo_Zf275E7mCCgc0Z3gw9_-nyvxkKnkaZDaT8pRC4iqvdgFgWsFvDY4RidhpR"
                    />
                    <div className="absolute top-3 right-3 bg-void/90 border border-border px-2 py-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                      <span className="font-mono text-[9px] text-secondary tracking-widest uppercase">Verified</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display font-semibold text-xl text-text-primary group-hover:text-secondary transition-colors">
                          Rohan Verma
                        </h3>
                        <span className="font-mono text-xs text-secondary">Mumbai, India</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-text-secondary mb-3 font-medium">Film Director &amp; Screenwriter</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Feature Films</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Narrative Architecture</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Indie Cinema</span>
                      </div>
                    </div>
                    <a className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-[0.15em] text-text-primary group-hover:text-secondary transition-colors" href="#talent">
                      <span>View Portfolio</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/* Profile 4: Meera Nair */}
                <div className="bg-background border border-border hover:border-secondary transition-all duration-300 flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-low">
                    <img
                      alt="Portrait of classical and contemporary dancer Meera Nair in poised movement"
                      className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwbR3zuZI5FRrURZQNHZnly1-zsKrBI90NK8FW7d_aPAiQrVLgfhm0V5G2lt0rt0aTXT1Vi6xqC7aNA1kEGyt0gze8zyTFDvwREtcC6FE35Vc93x0QS7acjYXyG43vEjP7ucR0Wvo3VwHhCLftOlkPjqDwirEN139VEudh4D6v8LsiP3q8YDUbajunpfecwBJcYvrsA6D0X-NIOhurcJJrNDIuWoY7dH-W-JD_U88m"
                    />
                    <div className="absolute top-3 right-3 bg-void/90 border border-border px-2 py-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                      <span className="font-mono text-[9px] text-secondary tracking-widest uppercase">Verified</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display font-semibold text-xl text-text-primary group-hover:text-secondary transition-colors">
                          Meera Nair
                        </h3>
                        <span className="font-mono text-xs text-secondary">Bengaluru, India</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-text-secondary mb-3 font-medium">Classical &amp; Contemporary Dancer</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Kathak</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Aerial Arts</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Stage Performance</span>
                      </div>
                    </div>
                    <a className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-[0.15em] text-text-primary group-hover:text-secondary transition-colors" href="#talent">
                      <span>View Portfolio</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/* Profile 5: Kabir Malhotra */}
                <div className="bg-background border border-border hover:border-secondary transition-all duration-300 flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-low">
                    <img
                      alt="Portrait of cinematographer Kabir Malhotra on dark soundstage"
                      className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNTnYFswoHF-kn9_FGLPS4o1Vxn849XMgpaTo1y7y36S-MS4GmGImIbA9rct9ZbptIREkuZsILNrHGPX1xv98DGo98fsXQULWeQONqRsJqBC5lN3doh1ZDevFsIJTqd7BG5TxBlkFWCXth6yvsA957DKF66W66ePQ5mVJUolMX-i06uK2nZ-GsMbl_nV46QCMOzUR6yOz3c3oC_hbVHvMLX1Yz887xNFqFHoFHirUg"
                    />
                    <div className="absolute top-3 right-3 bg-void/90 border border-border px-2 py-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                      <span className="font-mono text-[9px] text-secondary tracking-widest uppercase">Verified</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display font-semibold text-xl text-text-primary group-hover:text-secondary transition-colors">
                          Kabir Malhotra
                        </h3>
                        <span className="font-mono text-xs text-secondary">Mumbai, India</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-text-secondary mb-3 font-medium">Cinematographer &amp; DOP</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Anamorphic Lenses</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">35mm Celluloid</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Dramatic Lighting</span>
                      </div>
                    </div>
                    <a className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-[0.15em] text-text-primary group-hover:text-secondary transition-colors" href="#talent">
                      <span>View Portfolio</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/* Profile 6: Priya Kapoor */}
                <div className="bg-background border border-border hover:border-secondary transition-all duration-300 flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-low">
                    <img
                      alt="Portrait of vocalist and sound composer Priya Kapoor"
                      className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu9_zjP3uN5SnCVGeF5vOYMN0NwDerTu1plQbg9_kKI73F7k9sU_UhU_pT9RIo7TxnESC_8n_RINK_ThxVXSwAh_OMcHj6Bbt-2UZnFI-M6iAdW8exXm9G-knXsSYjOH0qi8_63mJd9JE8q9wFs5i5A8uvEwTehAUf52okc2gFm5GncWacPsSy11pKwH6V8WWqT2-2tRGyjJRyQsAA1myoL9fmv15Z8S7V_bBb8mJL"
                    />
                    <div className="absolute top-3 right-3 bg-void/90 border border-border px-2 py-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                      <span className="font-mono text-[9px] text-secondary tracking-widest uppercase">Verified</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display font-semibold text-xl text-text-primary group-hover:text-secondary transition-colors">
                          Priya Kapoor
                        </h3>
                        <span className="font-mono text-xs text-secondary">Chennai, India</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-text-secondary mb-3 font-medium">Vocalist &amp; Film Composer</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Playback Vocals</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Carnatic Classical</span>
                        <span className="px-2 py-1 bg-surface-low border border-border text-[11px] text-text-primary">Ambient Soundscapes</span>
                      </div>
                    </div>
                    <a className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-[0.15em] text-text-primary group-hover:text-secondary transition-colors" href="#talent">
                      <span>View Portfolio</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 05: FEATURED CREATIVE PROJECTS & CASTING BRIEFS
               ======================================================== */}
          <section className="w-full bg-background py-16 border-b border-border" id="projects">
            <div className="w-full px-5 md:px-10 lg:px-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-[0.2em] mb-2">
                    <span className="w-1.5 h-1.5 bg-secondary"></span>
                    <span>Active Production Briefs</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
                    Discover What the Creative World Is Creating.
                  </h2>
                  <p className="font-sans text-base text-text-secondary max-w-2xl mt-2">
                    Explore active casting briefs, commercial assignments, and visionary productions with direct application pathways.
                  </p>
                </div>
                <a
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary hover:text-text-primary flex items-center gap-2 transition-colors self-start md:self-end border-b border-secondary/40 pb-1"
                  href="#projects"
                >
                  <span>View All Open Calls (38 Active)</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>

              {/* 4 Wide Cinematic Project Showcase Cards */}
              <div className="space-y-6">
                {/* Project 01: The Last Dynasty */}
                <div className="bg-surface-low border border-border hover:border-secondary transition-all p-6 lg:p-10 flex flex-col lg:flex-row gap-10 items-center group">
                  <div className="w-full lg:w-5/12 aspect-[16/9] overflow-hidden bg-void shrink-0 border border-border relative">
                    <img
                      alt="The Last Dynasty historical fortress set"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsBhpPw2XHsGQ3OKIbj0t5_YwEJYf2AGbFHqHbTA9DZCsPVxMUTL9rJ5rEnN2YHKIk9XXQHwiTExfEcd1OQ4x7DamcBJOZ16Q5T_xplsO3pdMCI94axay24-jHXSNCcG07a9iie7BXvS65a3Uk8LwylyS1iOKJX-lbcLIoFT29ol92_JdHbQrwz3e8NCHX_83-Cbj2G4SG7GnFzmWHQpuK44E9DvdkbZMFSOiDYMmL"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-error font-mono text-[9px] uppercase tracking-widest">
                      Casting Active
                    </div>
                  </div>
                  <div className="flex flex-col justify-between flex-1 w-full">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                          Historical Short Film • Production Slate 2025
                        </span>
                        <span className="text-xs font-mono text-text-secondary">Location: Mumbai • Rajasthan</span>
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-text-primary group-hover:text-secondary transition-colors mb-2">
                        The Last Dynasty
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                        A high-budget historical dramatic short film exploring royal lineage and political intrigue. Seeking passionate performers for lead protagonist and pivotal court ensemble characters. Extensive period dialogue delivery and character depth required.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-[11px] font-mono text-text-secondary uppercase tracking-wider">Required Roles:</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Lead Actor (Male, 28–36)</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Supporting Empress (Female, 30–40)</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Period Vocalist</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs font-mono text-text-secondary">Deadline: Dec 15, 2025</span>
                      <a
                        className="px-4 py-2 bg-secondary text-primary-text text-xs font-bold uppercase tracking-widest hover:bg-tertiary transition-colors flex items-center gap-1.5"
                        href="#projects"
                      >
                        <span>Apply For Role</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project 02: Beyond the Frame */}
                <div className="bg-surface-low border border-border hover:border-secondary transition-all p-6 lg:p-10 flex flex-col lg:flex-row gap-10 items-center group">
                  <div className="w-full lg:w-5/12 aspect-[16/9] overflow-hidden bg-void shrink-0 border border-border relative">
                    <img
                      alt="Beyond the Frame luxury editorial set"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCz3h1XmJqDJIVN5i_gc1km2u19d58jhCuGKxZHh_vXRq8-XXc9a4BjmNq9kVhzW4WUv7hpJQaZ6m8u6MEzAyVusaG1RH54nn31ZIIxG2G3psYLJ633b3M6BTNyJTyKhVRjt0h0fnKsjQNdPADRip0kEPzhlTUFs2DflBZ52oTA_vN_f89hqLSevRuwU73v736mc0fSN8iP21FJbWGvybAEliSpjLLCZ9lWiQo_kee"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-tertiary text-secondary-hover font-mono text-[9px] uppercase tracking-widest">
                      Reviewing Applications
                    </div>
                  </div>
                  <div className="flex flex-col justify-between flex-1 w-full">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                          Luxury Commercial Campaign • Global Release
                        </span>
                        <span className="text-xs font-mono text-text-secondary">Location: Delhi • London</span>
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-text-primary group-hover:text-secondary transition-colors mb-2">
                        Beyond the Frame
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                        An international luxury apparel &amp; timepiece campaign crafted with brutalist architectural backdrops. Seeking high-fashion editorial models and still photographers with an uncompromising vision of light and geometric silhouettes.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-[11px] font-mono text-text-secondary uppercase tracking-wider">Required Roles:</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Editorial Runway Models</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Lead Still Photographer</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Avant-Garde Stylist</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs font-mono text-text-secondary">Deadline: Jan 04, 2026</span>
                      <a
                        className="px-4 py-2 bg-secondary text-primary-text text-xs font-bold uppercase tracking-widest hover:bg-tertiary transition-colors flex items-center gap-1.5"
                        href="#projects"
                      >
                        <span>View Details</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project 03: Echoes of Tomorrow */}
                <div className="bg-surface-low border border-border hover:border-secondary transition-all p-6 lg:p-10 flex flex-col lg:flex-row gap-10 items-center group">
                  <div className="w-full lg:w-5/12 aspect-[16/9] overflow-hidden bg-void shrink-0 border border-border relative">
                    <img
                      alt="Echoes of Tomorrow sci-fi music set"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD64U1cU4hx3XOgf3kqr6JQ1s9PvOlz6M9Aif_pveFyk1CM73IgRmDgNWOvE8qBOdlsgHMnum_pKBe1XaKjlD2wkRNXjRlDc8BMZhLy_risCbr5agpIPEgu8iX4lpoF1ccAR56dHcHX76qNd_zlYBQL3irY3o_mMUM9UylvtG0w3_-0KGwpCZ21d67bvMQKs6EWS-5qdPb5x4zMaT0Z3zRJYHq8xNZNREU1KmRotxSr"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-error font-mono text-[9px] uppercase tracking-widest">
                      Casting Active
                    </div>
                  </div>
                  <div className="flex flex-col justify-between flex-1 w-full">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                          Music Video Production • Sci-Fi Opus
                        </span>
                        <span className="text-xs font-mono text-text-secondary">Location: Bengaluru • Studio Lab</span>
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-text-primary group-hover:text-secondary transition-colors mb-2">
                        Echoes of Tomorrow
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                        An avant-garde visual audio journey with electronic synths and laser architectural environments. Seeking contemporary movement artists proficient in kinetic tension, analog synth sound designers, and post-production colorists.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-[11px] font-mono text-text-secondary uppercase tracking-wider">Required Roles:</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Contemporary Kinetic Dancers</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Synth Sound Designers</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Senior Film Colorist</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs font-mono text-text-secondary">Deadline: Jan 18, 2026</span>
                      <a
                        className="px-4 py-2 bg-secondary text-primary-text text-xs font-bold uppercase tracking-widest hover:bg-tertiary transition-colors flex items-center gap-1.5"
                        href="#projects"
                      >
                        <span>Apply For Role</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project 04: The Silent Canvas */}
                <div className="bg-surface-low border border-border hover:border-secondary transition-all p-6 lg:p-10 flex flex-col lg:flex-row gap-10 items-center group">
                  <div className="w-full lg:w-5/12 aspect-[16/9] overflow-hidden bg-void shrink-0 border border-border relative">
                    <img
                      alt="The Silent Canvas feature film lighting setup"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4UdV2ubvD044WawfnRsegclS4fjs-Jwid5u5Ueh-CZ66OcJP0GNMKI_VgB8BkZPBE6TJFTjK4sF9TZDYjUpijEmuCAbalmeHCnJhcBG_mHcNXcSfQnX17L6et32jaQhthLzAparamNwddcTyw3EPWkjpcDsDL8xPNuvLHDJSuTiWDUd2MjbXqK70_4m02r3mvT_nSzes0aWc6uXihjF5lrU2Tx0biU1JE62LZzWnB"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-error font-mono text-[9px] uppercase tracking-widest">
                      Casting Active
                    </div>
                  </div>
                  <div className="flex flex-col justify-between flex-1 w-full">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                          Independent Feature Film • Principal Photography
                        </span>
                        <span className="text-xs font-mono text-text-secondary">Location: Hyderabad • Telangana</span>
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-text-primary group-hover:text-secondary transition-colors mb-2">
                        The Silent Canvas
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                        A character-driven Telugu &amp; English bilingual indie drama depicting the life of an unsung modernist painter. Requiring seasoned theatre actors, a production designer with heritage architectural familiarity, and classical sound mixing engineers.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-[11px] font-mono text-text-secondary uppercase tracking-wider">Required Roles:</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Protagonist Painter (35–45)</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Art Director &amp; Production Designer</span>
                        <span className="px-2.5 py-1 bg-background border border-border text-xs text-text-primary">Sound Mixer</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs font-mono text-text-secondary">Deadline: Feb 02, 2026</span>
                      <a
                        className="px-4 py-2 bg-secondary text-primary-text text-xs font-bold uppercase tracking-widest hover:bg-tertiary transition-colors flex items-center gap-1.5"
                        href="#projects"
                      >
                        <span>Apply For Role</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 06: DIRECTORS & PRODUCTION HOUSES
               ======================================================== */}
          <section className="w-full bg-void py-16 border-b border-border" id="productions">
            <div className="w-full px-5 md:px-10 lg:px-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-[0.2em] mb-2">
                    <span className="w-1.5 h-1.5 bg-secondary"></span>
                    <span>Visionary Filmmaking Units</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
                    Behind Every Great Production Is a Vision.
                  </h2>
                  <p className="font-sans text-base text-text-secondary max-w-2xl mt-2">
                    Discover accredited film studios, visionary production agencies, and independent production companies commissioning talent.
                  </p>
                </div>
                <a
                  className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary hover:text-text-primary flex items-center gap-2 transition-colors self-start md:self-end border-b border-secondary/40 pb-1"
                  href="#productions"
                >
                  <span>Explore All 84 Production Houses</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>

              {/* 4 Production Houses Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* House 01: Studio Monolith */}
                <div className="bg-background border border-border hover:border-secondary transition-all p-6 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                      <span className="font-mono text-xs text-secondary font-semibold">UNIT 01</span>
                      <span className="text-xs font-mono text-text-secondary">Mumbai, India</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-secondary transition-colors mb-1">
                      Studio Monolith
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-secondary font-mono mb-3">
                      Feature Films &amp; Limited Series
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      A cinema laboratory producing intense character dramas and cinematic epics for international theatrical and streaming distribution.
                    </p>
                    <div className="space-y-1.5 text-xs font-mono text-text-secondary mb-6">
                      <div className="text-[11px] uppercase tracking-wider text-text-primary">Recent Slate:</div>
                      <div className="text-secondary/90">• The Last Dynasty (In Casting)</div>
                      <div className="text-text-secondary">• Shadow Over Chambal (2024)</div>
                      <div className="text-text-secondary">• Bombay Nocturne (2023)</div>
                    </div>
                  </div>
                  <a
                    className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-widest text-text-primary group-hover:text-secondary transition-colors font-semibold"
                    href="#productions"
                  >
                    <span>View Production Slate</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>

                {/* House 02: Horizon Visuals */}
                <div className="bg-background border border-border hover:border-secondary transition-all p-6 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                      <span className="font-mono text-xs text-secondary font-semibold">UNIT 02</span>
                      <span className="text-xs font-mono text-text-secondary">Delhi, India</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-secondary transition-colors mb-1">
                      Horizon Visuals
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-secondary font-mono mb-3">
                      Commercial &amp; High Fashion House
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      Pioneering high-concept visual campaigns for couture fashion labels, architectural luxury houses, and premium automotive brands.
                    </p>
                    <div className="space-y-1.5 text-xs font-mono text-text-secondary mb-6">
                      <div className="text-[11px] uppercase tracking-wider text-text-primary">Recent Slate:</div>
                      <div className="text-secondary/90">• Beyond the Frame (Global Launch)</div>
                      <div className="text-text-secondary">• Raw Heritage Campaign (2024)</div>
                      <div className="text-text-secondary">• Lumina Paris Edition (2024)</div>
                    </div>
                  </div>
                  <a
                    className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-widest text-text-primary group-hover:text-secondary transition-colors font-semibold"
                    href="#productions"
                  >
                    <span>View Production Slate</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>

                {/* House 03: Red Lantern Films */}
                <div className="bg-background border border-border hover:border-secondary transition-all p-6 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                      <span className="font-mono text-xs text-secondary font-semibold">UNIT 03</span>
                      <span className="text-xs font-mono text-text-secondary">Kolkata, India</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-secondary transition-colors mb-1">
                      Red Lantern Films
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-secondary font-mono mb-3">
                      Independent Narrative Cinema
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      Celebrating festival-circuit realism, neo-noir realism, and grassroots dramatic storytelling that challenges established tropes.
                    </p>
                    <div className="space-y-1.5 text-xs font-mono text-text-secondary mb-6">
                      <div className="text-[11px] uppercase tracking-wider text-text-primary">Recent Slate:</div>
                      <div className="text-secondary/90">• Monsoon Sonata (Cannes Nominee)</div>
                      <div className="text-text-secondary">• Howrah Bridge at 3 AM (2024)</div>
                      <div className="text-text-secondary">• The Clay Worker (2023)</div>
                    </div>
                  </div>
                  <a
                    className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-widest text-text-primary group-hover:text-secondary transition-colors font-semibold"
                    href="#productions"
                  >
                    <span>View Production Slate</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>

                {/* House 04: Stellar Media Works */}
                <div className="bg-background border border-border hover:border-secondary transition-all p-6 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                      <span className="font-mono text-xs text-secondary font-semibold">UNIT 04</span>
                      <span className="text-xs font-mono text-text-secondary">Bengaluru, India</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-secondary transition-colors mb-1">
                      Stellar Media Works
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-secondary font-mono mb-3">
                      OTT &amp; Digital Storytelling
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      High-tempo digital fiction, immersive audio-visual music videos, and virtual production technology for next-generation platforms.
                    </p>
                    <div className="space-y-1.5 text-xs font-mono text-text-secondary mb-6">
                      <div className="text-[11px] uppercase tracking-wider text-text-primary">Recent Slate:</div>
                      <div className="text-secondary/90">• Echoes of Tomorrow (In Production)</div>
                      <div className="text-text-secondary">• Cyber Bengaluru S1 (2024)</div>
                      <div className="text-text-secondary">• Pulse Music Odyssey (2023)</div>
                    </div>
                  </div>
                  <a
                    className="pt-3 border-t border-border flex items-center justify-between text-xs uppercase tracking-widest text-text-primary group-hover:text-secondary transition-colors font-semibold"
                    href="#productions"
                  >
                    <span>View Production Slate</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 07: HOW IT WORKS
               ======================================================== */}
          <section className="w-full bg-background py-16 border-b border-border" id="how-it-works">
            <div className="w-full px-5 md:px-10 lg:px-16">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-[0.2em] mb-2">
                  <span className="w-1.5 h-1.5 bg-secondary"></span>
                  <span>Simple. Transparent. Uncompromised.</span>
                  <span className="w-1.5 h-1.5 bg-secondary"></span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
                  How Art-e-techt Works
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {/* Step 01 */}
                <div className="bg-surface-low border border-border hover:border-secondary transition-all p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-void border border-border text-secondary font-display text-2xl font-bold flex items-center justify-center mb-6">
                      01
                    </div>
                    <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                      Create Your Identity
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
                      Build a bespoke professional profile reflecting your artistic craft, territory representation, and verified past credits.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border font-mono text-[10px] text-secondary uppercase tracking-widest">
                    Stage 01 • Onboarding
                  </div>
                </div>
                {/* Step 02 */}
                <div className="bg-surface-low border border-border hover:border-secondary transition-all p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-void border border-border text-secondary font-display text-2xl font-bold flex items-center justify-center mb-6">
                      02
                    </div>
                    <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                      Showcase Your Work
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
                      Host uncompressed 4K showreels, high-resolution lookbooks, verified theatrical credits, and artistic statements.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border font-mono text-[10px] text-secondary uppercase tracking-widest">
                    Stage 02 • Curation
                  </div>
                </div>
                {/* Step 03 */}
                <div className="bg-surface-low border border-border hover:border-secondary transition-all p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-void border border-border text-secondary font-display text-2xl font-bold flex items-center justify-center mb-6">
                      03
                    </div>
                    <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                      Discover Opportunities
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
                      Explore casting calls and commercial briefs filtered by city, compensation model, timeline, and artistic discipline.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border font-mono text-[10px] text-secondary uppercase tracking-widest">
                    Stage 03 • Matching
                  </div>
                </div>
                {/* Step 04 */}
                <div className="bg-surface-low border border-border hover:border-secondary transition-all p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-void border border-border text-secondary font-display text-2xl font-bold flex items-center justify-center mb-6">
                      04
                    </div>
                    <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                      Connect &amp; Create
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
                      Collaborate directly with directors and studios without intermediaries, securing verified production agreements.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border font-mono text-[10px] text-secondary uppercase tracking-widest">
                    Stage 04 • Execution
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 08: ABOUT ART-E-TECHT MANIFESTO
               ======================================================== */}
          <section className="w-full bg-void py-16 border-b border-border" id="about">
            <div className="w-full px-5 md:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[5/4] bg-background border border-border overflow-hidden">
                  <img
                    alt="Atmospheric studio cinematography camera setup bathed in golden illumination"
                    className="w-full h-full object-cover filter contrast-[1.12]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALd_bRv0zh4ldCgCsPAons41tWml0571O4bnPrT9rTSJFp0Fng-LH48r_yS2OxW5h-cmwRiarRqZJfe8GQHZ0etRXpmYDhzvvBh-34tgGHVIjRexKasR2FyXbHNKAJcad6cwJ0XXtDtnBmXwNRY6jLGb4QHMW8tZDkgz4x9ybk6tYMORRusAtDCQWJjQTU0kFoDufrlwaoZpZZAwULuNZQbyraKGQGow4rfulT2PUL"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-background/95 border border-border p-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary block">
                      MANIFESTO • ATELIER INTEGRITY
                    </span>
                    <p className="font-sans text-xs text-text-primary mt-1">
                      "Art is not an ornament; it is the fundamental architecture of human expression."
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-[0.2em] mb-2">
                    <span className="w-1.5 h-1.5 bg-secondary"></span>
                    <span>Our Purpose</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-6 leading-tight">
                    A Space Where Creativity Finds Its People.
                  </h2>
                  <p className="font-sans text-base text-text-secondary leading-relaxed mb-10">
                    Art-e-techt was created to eliminate the artificial barriers between real creative talent and the visionaries who orchestrate landmark productions. By uniting actors, filmmakers, dancers, musicians, and cinematographers in a single disciplined atelier, we make high-caliber collaboration seamless, transparent, and direct.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="p-3 bg-background border border-border">
                      <span className="text-secondary font-mono text-xs uppercase block mb-1">01 • Discovery</span>
                      <h4 className="font-display text-base font-semibold text-text-primary mb-1">Creative Discovery</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Search filtered by verified skill sets, cinematic style, and geographic presence.
                      </p>
                    </div>
                    <div className="p-3 bg-background border border-border">
                      <span className="text-secondary font-mono text-xs uppercase block mb-1">02 • Representation</span>
                      <h4 className="font-display text-base font-semibold text-text-primary mb-1">Professional Portfolios</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        High-definition showcases free from social media vanity metrics and algorithm noise.
                      </p>
                    </div>
                    <div className="p-3 bg-background border border-border">
                      <span className="text-secondary font-mono text-xs uppercase block mb-1">03 • Alliances</span>
                      <h4 className="font-display text-base font-semibold text-text-primary mb-1">Collaborative Openings</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Transparent casting briefs with defined budgets, locations, and deadlines.
                      </p>
                    </div>
                    <div className="p-3 bg-background border border-border">
                      <span className="text-secondary font-mono text-xs uppercase block mb-1">04 • Ecosystem</span>
                      <h4 className="font-display text-base font-semibold text-text-primary mb-1">Global Community</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Cross-regional alliances spanning India, the UK, Europe, and North America.
                      </p>
                    </div>
                  </div>

                  <div>
                    <a
                      className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-secondary hover:text-text-primary border-b border-secondary/50 pb-1 transition-colors"
                      href="#about"
                    >
                      <span>Read Full Atelier Manifesto</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 09: STATS & PLATFORM IMPACT
               ======================================================== */}
          <section className="w-full bg-background py-16 border-b border-border">
            <div className="w-full px-5 md:px-10 lg:px-16">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 text-secondary font-mono text-xs uppercase tracking-[0.2em] mb-2">
                  <span className="w-1.5 h-1.5 bg-secondary"></span>
                  <span>Global &amp; Regional Footprint</span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
                  A Creative Community Without Boundaries.
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-void border border-border flex flex-col justify-between">
                  <div className="font-display text-4xl lg:text-6xl font-bold text-text-primary tracking-tight">50K+</div>
                  <div className="mt-6 pt-3 border-t border-border">
                    <span className="text-xs font-mono uppercase tracking-widest text-secondary block mb-1">Creative Professionals</span>
                    <p className="text-xs text-text-secondary">Active actors, directors, writers, and artists across 42 nations.</p>
                  </div>
                </div>
                <div className="p-6 bg-void border border-border flex flex-col justify-between">
                  <div className="font-display text-4xl lg:text-6xl font-bold text-text-primary tracking-tight">1,200+</div>
                  <div className="mt-6 pt-3 border-t border-border">
                    <span className="text-xs font-mono uppercase tracking-widest text-secondary block mb-1">Active Projects</span>
                    <p className="text-xs text-text-secondary">Feature films, OTT shows, luxury campaigns, and indie productions.</p>
                  </div>
                </div>
                <div className="p-6 bg-void border border-border flex flex-col justify-between">
                  <div className="font-display text-4xl lg:text-6xl font-bold text-text-primary tracking-tight">40+</div>
                  <div className="mt-6 pt-3 border-t border-border">
                    <span className="text-xs font-mono uppercase tracking-widest text-secondary block mb-1">Artistic Disciplines</span>
                    <p className="text-xs text-text-secondary">From classical method acting to sound design and virtual production.</p>
                  </div>
                </div>
                <div className="p-6 bg-void border border-border flex flex-col justify-between">
                  <div className="font-display text-4xl lg:text-6xl font-bold text-text-primary tracking-tight">98%</div>
                  <div className="mt-6 pt-3 border-t border-border">
                    <span className="text-xs font-mono uppercase tracking-widest text-secondary block mb-1">Production Match</span>
                    <p className="text-xs text-text-secondary">Verified productions completed with accredited creative collaboration.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 10: DRAMATIC FINAL CINEMATIC CALL TO ACTION
               ======================================================== */}
          <section className="relative w-full min-h-[640px] flex items-center justify-center bg-void border-b border-border overflow-hidden text-center">
            <div className="absolute inset-0 z-0">
              <img
                alt="Theatrical stage photograph of performer in dark theater illuminated by warm golden spotlight"
                className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.15]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHWrWywgUhNMUVk0dZh_GCDxzsuUATr4KsmwP0j4YIj4VGM_fBA_mhinFw39uUT3wwKMhXjecW7bSRclOp4vLYh_8g9d4StbDmk2l6w4ZbvEvqMLoLbQp98wril-_eCcEJlutdCCDhXZhGnTNpldqrhqN2P8BeP5SPmEQS1iQafkl7KyZsReHGwZ1OQ77MkbpAzHNFpYw1mthayJNW0NARHmmTAy6wzRY2bc6-Ct2c"
              />
              <div className="absolute inset-0 bg-void/60 backdrop-blur-[1px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-10 py-16 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-void/90 border border-border mb-6">
                <span className="w-1.5 h-1.5 bg-secondary"></span>
                <span className="font-sans text-[11px] text-secondary tracking-[0.25em] font-semibold uppercase">
                  JOIN THE MOVEMENT
                </span>
                <span className="w-1.5 h-1.5 bg-secondary"></span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-text-primary mb-6 leading-[1.08]">
                Step Into the <span className="text-secondary italic font-serif font-normal">Spotlight.</span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-text-primary/90 max-w-xl mb-10 leading-relaxed">
                Your next creative opportunity begins with the right connection. Whether casting an ensemble or stepping onto the stage, build your legacy with Art-e-techt.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <a
                  className="w-full sm:w-auto px-10 py-4 bg-secondary text-primary-text font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-tertiary transition-all border border-secondary shadow-[0_0_30px_color-mix(in srgb, var(--color-secondary) 30%, transparent)] flex items-center justify-center gap-2"
                  href="#talent"
                >
                  <span>Join as Talent</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
                <a
                  className="w-full sm:w-auto px-10 py-4 bg-void/80 text-text-primary font-sans text-xs uppercase tracking-[0.2em] font-medium border border-border hover:border-secondary hover:text-secondary transition-all flex items-center justify-center gap-2"
                  href="#talent"
                >
                  <span>Find Creative Talent</span>
                  <span className="material-symbols-outlined text-[16px]">person_search</span>
                </a>
              </div>

              <span className="font-mono text-[10px] uppercase text-text-secondary tracking-widest mt-6">
                Immediate Access • Multi-Territory Verification Active
              </span>
            </div>
          </section>
        </main>

        {/* ========================================================
             SECTION 11: BRUTALIST ARCHITECTURAL FOOTER
             ======================================================== */}
        <footer className="w-full bg-void border-t border-border">
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
                  <a className="hover:text-secondary transition-colors" href="#talent">
                    Talent Roster
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#projects">
                    Creative Briefs
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#productions">
                    Production Houses
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#talent">
                    Regional Vaults
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#about">
                    Curated Monographs
                  </a>
                </nav>
              </div>

              {/* Col 02: Platform Ecosystem */}
              <div className="lg:col-span-2 flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
                  Platform
                </span>
                <nav className="flex flex-col space-y-1.5 text-xs text-text-secondary">
                  <a className="hover:text-secondary transition-colors" href="#how-it-works">
                    How It Works
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#about">
                    Verified Credentials
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#productions">
                    Studio Direct Access
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#projects">
                    Enterprise Casting
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#about">
                    API &amp; Curation
                  </a>
                </nav>
              </div>

              {/* Col 03: Editorial & Atelier */}
              <div className="lg:col-span-2 flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
                  Atelier
                </span>
                <nav className="flex flex-col space-y-1.5 text-xs text-text-secondary">
                  <a className="hover:text-secondary transition-colors" href="#about">
                    About Atelier
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#about">
                    The Manifesto
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#productions">
                    Press &amp; Releases
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#productions">
                    Archival Records
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#about">
                    Direct Contact
                  </a>
                </nav>
              </div>

              {/* Col 04: Legal & Code */}
              <div className="lg:col-span-2 flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
                  Legal Code
                </span>
                <nav className="flex flex-col space-y-1.5 text-xs text-text-secondary">
                  <a className="hover:text-secondary transition-colors" href="#about">
                    Privacy Protocol
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#about">
                    Terms of Engagement
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#about">
                    Rights &amp; Licensing
                  </a>
                  <a className="hover:text-secondary transition-colors" href="#about">
                    Provenance Seal
                  </a>
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
      </div>
    </div>
  );
};

export default Home;
