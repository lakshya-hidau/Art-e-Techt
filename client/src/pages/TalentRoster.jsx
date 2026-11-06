import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const artistsData = [
  {
    id: '001',
    name: 'Aarav Sharma',
    role: 'Lead Dramatic Actor',
    category: 'Actors & Screen',
    location: 'Mumbai • BOM',
    rep: 'REP: ATELIER PRINCIPAL',
    school: 'NSDA ALUM',
    description: 'Method-rooted presence commanding psychological thrillers and period epics. Fluent in Classical Hindi, Urdu, and RP English.',
    tags: ['METHOD INTENSITY', 'STAGE & SCREEN', 'Q2 2025 OPEN'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADiw-9YiC9JCht6RGpPYfT_nSa8ipGLxMDfv_xe_ADZr-Q9YbFuj7uA1QqVmO46Db9mTCe_7og1mAdz7ePWv5XNUcGAqR2P2KupHgIFdxNQ17XmDdEMabTpCAdJ5qCQJmDu2BZftXbSNHwIkt9qZZM5cNGEDj4CqAGH9ZD0cYr8QqjtgEGhfEbKAIUxpnCiMn5XV8Emb3xDZuN7k4Fo1KZybHsrLCBW_vyPt1Hzmay',
    badge: 'EXCLUSIVE ROSTER',
    badgeColor: 'text-primary',
  },
  {
    id: '002',
    name: 'Ananya Mehta',
    role: 'Couture & Editorial Face',
    category: 'Sculptural & Fashion',
    location: 'Delhi / Paris',
    rep: 'HAUTE COUTURE EDITORIAL',
    school: 'CAMPAIGN FACE',
    description: 'Architectural runway movement and cinematic campaign presence. Frequent collaborator with Milanese and Indian ateliers.',
    tags: ['VOGUE ARCHIVE', 'GLOBAL MOBILITY', 'ACTIVE'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmfnXVJ8PYyKH-drw6VNbi5ozGmTPpHf_s_K0Y97zQqlMsO8FfwpoGt-Z_sKwIDgkUkTC_dxkGlBQ24EVS_VUBaYfq0BIKLqZKOoETRXdidWOg8HhZ9oQ5U36BcGOIXbrzvftjlZDZ_w91QAdy_FfQPDEBkrrcFG3K2TRGU-Re6aQEpfh2H2lLqtv5FmzCuWIqAHc-lYB7TaD3-oBtui11RrqyN-TC-CvNPdoR6ta9',
    badge: 'RUNWAY ARCHIVE',
    badgeColor: 'text-on-surface-variant',
  },
  {
    id: '003',
    name: 'Rohan Verma',
    role: 'Film Director & Narrative Architect',
    category: 'Narrative Writers',
    location: 'Mumbai • BOM',
    rep: 'DIRECTORS GUILD',
    school: 'CANNES SLATE',
    description: 'Specializing in monumental slow-burn psychological narrative, neo-noir realism, and international co-productions.',
    tags: ['FEATURE SLATES', 'ANAMORPHIC', 'DEVELOPMENT'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCyOk5_6fTo2E9lH4kfY_QKbn231JKqEsd2SEILIsPoIzjf8xBrHFLFSjGtIvxAXOtwJXkbpKT0ZGyABr0Rq-n2GfU2msSbs7Yuk3YqPA5E7gquFRosfR1dwoPehVDnVYIDLPsBGxZhPLRGvpW0TsrHyrrP8XScveedxt9kHzCSspI7dB5VM0kDkyZU0x65cUEq1VsIA28TyeTrIBGZs4wi8qDwUiHNBDnP0kdvr76',
    badge: 'AUTEUR ROSTER',
    badgeColor: 'text-primary',
  },
  {
    id: '004',
    name: 'Meera Nair',
    role: 'Classical & Movement Artist',
    category: 'Movement & Dance',
    location: 'Bengaluru • BLR',
    rep: 'CLASSICAL • PHYSICAL',
    school: 'STAGE STILLS',
    description: 'Kathak mastery recontextualized within experimental physical theatre, aerial suspension, and high-fashion choreography.',
    tags: ['KATHAK DISCIPLINE', 'AERIAL CORPS', 'TOURING'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMeABF6jXx2WoSlNzle4JO8Z62N-qzRKhQS59mKWKwul_EGhNyE8FkffZUxyjR7cs7TsrEV_rVEMiwN84HbLOqbUx4MfFFAp_fw3g25-gOhHggI83JiFPjCiHvMSnUS-NpwFRKDgrvAY6vlojfOcX1sodTXqv0cUQJbKeXfK9f-1rTGmU2g4kTMeDOkBuP2OSFruuQZ8DZo3MKZy5dJRBydjPxFjOhs0kcU4WO9Ubv',
    badge: 'PHYSICAL DRAMA',
    badgeColor: 'text-on-surface-variant',
  },
  {
    id: '005',
    name: 'Kabir Malhotra',
    role: 'Director of Photography',
    category: 'Directors of Photography',
    location: 'Mumbai • BOM',
    rep: '35MM ANAMORPHIC',
    school: 'LOW-KEY SHADOW',
    description: 'Master of chiaroscuro lighting, large-format cinema glass, and architectural frame composition for international features.',
    tags: ['ARRI ALEXA 65', 'HAWK LENSES', 'OCT BOOKINGS'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtUjVOygX9sFtsd7Zob9855ObKSt3Zv7UQEH8YVNgox4V4ubv-MoJpWH0KcCbv-dLhrBFybIwBQkMFwtAdwzBHztvxHviLKmjcfNjOiV3XQqyf-BTPp0G0IAru97X8QWqwdqsEVQUty3Mcx0ZZPjixy-WytcjU5Ip63oAbVGnD7x_nwuTlcPH5TIA2_UOOTZ0UBkV9kXZUiZKw94AdenVN0J2L8m22eYV0ZlyAE5G3',
    badge: 'ISC FELLOW',
    badgeColor: 'text-primary',
  },
  {
    id: '006',
    name: 'Priya Kapoor',
    role: 'Vocalist & Film Composer',
    category: 'Vocal & Composition',
    location: 'Chennai • MAA',
    rep: 'SOUNDTRACK • SCORE',
    school: 'CARNATIC MODULAR',
    description: 'Seamlessly weaving microtonal Carnatic vocal chants with analog modular synthesizers and monolithic orchestral strings.',
    tags: ['ORIGINAL SCORE', 'ATMOS MIX', 'ACTIVE'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhpINjsV0JIGhUAOTTGNYvvhsJXulC0Mv-4_RYbPm9O-vPQFGjFNAE11XoUv1kYQOaauw4u7YvO_5MYinh5Fz8L8Zk_0ceiF-9j2cYNNi3ktpDuqmjOqNFn6WqkjS2sOWVy5sUw_pZE0yTAhAR6CIl6paAMOTAAitaSJOBN8i0ypARcJO2F_PmUK3-v1QZInYFJ0IjoFN7sCkqM-Xlz56eThdYfiegNir4VItw0L5A',
    badge: 'SONIC ARCHIVES',
    badgeColor: 'text-on-surface-variant',
  },
  {
    id: '007',
    name: 'Vikramaditya Sen',
    role: 'Sculptural Set Designer',
    category: 'Sculptural & Fashion',
    location: 'Kolkata / Mumbai',
    rep: 'PRODUCTION DESIGN',
    school: 'SET ARCHITECTURE',
    description: 'Architectural set construction for luxury fashion cinema and grand historical productions. Known for raw monolithic textures.',
    tags: ['LARGE SCALE BUILDS', 'SPATIAL SCULPT', 'AVAILABLE'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIbv6ltJOIpQefu2mmieV4fWEO9cz0JrPxoWeesb45zpG1KR0uLRntLelEsZtcUoRneOX5CJWJeCKSwdRPSnFIKJBuM6kQ8tGRCnCC1Z8sEOTxGR9BraMkousr-kVqu_J1annpjeM7pfZums3zTNAx37BvpXGz82sG2y542HLop1DV4_bf2x7qUZ90tpmyFxcOcFrEuPZVp0c0aQMTuYcHPvxp8JckWRPlCkKcVpf9',
    badge: 'BRUTALIST PRODUCTION',
    badgeColor: 'text-primary',
  },
  {
    id: '008',
    name: 'Sarah Jenkins',
    role: 'Dialogue & Voice Architect',
    category: 'Vocal & Composition',
    location: 'London / Mumbai',
    rep: 'RADA TRAINED',
    school: 'INTERNATIONAL SLATE',
    description: 'Dialect mastery for global cinema, bridging South Asian dramatic actors into international English, European, and regional slates.',
    tags: ['DIALECT COACHING', 'VOICE-OVER SUITE', 'ACTIVE'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3BcjXIkk7jaYQVal1FzpPJp6rZv4CDsnYB85pJPYguJRbBxTkRR6HpLtvv_yA330T7FM1sntM8yeIibJrwEd1pqKLl_-MPZaBuM2jw_bl76BmVdCZvKO5vPtyVfWoUUGDK6dXDsfh_4IYHOUWYgnZydKRG-7OtxyW53Vb2Cwep2CjvgpGWIhlBpXKZyc-1Re8i6Czh7MpnbuJ51Yp3fhbFkwCpcpYWtfIPHqqYn8s',
    badge: 'VOICE & DIALECT',
    badgeColor: 'text-on-surface-variant',
  },
];

const categories = [
  { label: 'All Disciplines', count: 1420 },
  { label: 'Actors & Screen', count: 512 },
  { label: 'Movement & Dance', count: 184 },
  { label: 'Directors of Photography', count: 210 },
  { label: 'Vocal & Composition', count: 165 },
  { label: 'Sculptural & Fashion', count: 204 },
  { label: 'Narrative Writers', count: 145 },
];

const TalentRoster = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Disciplines');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('India [BOM / DEL / BLR]');

  const filteredArtists = artistsData.filter((artist) => {
    const matchesCategory =
      activeCategory === 'All Disciplines' || artist.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background text-text-primary font-sans min-h-screen antialiased selection:bg-secondary-hover selection:text-tertiary">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-lowest/95 backdrop-blur-md border-b border-surface-highest">
        <div className="h-20 w-full px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link className="flex flex-col group" to="/">
              <span className="font-display font-bold text-xl uppercase tracking-wider text-text-primary group-hover:text-secondary-hover transition-colors">
                ART-E-TECHT
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-secondary-hover mt-0.5">
                ATELIER EDITION
              </span>
            </Link>

            <nav className="hidden xl:flex items-center gap-8 pl-6 border-l border-surface-highest">
              <Link
                className="font-sans text-[11px] uppercase tracking-widest text-secondary-hover border-b-2 border-secondary-hover pb-1 font-bold"
                to="/find-talent"
              >
                Talent Roster
              </Link>
              <Link
                className="font-sans text-[11px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
                to="/find-work"
              >
                Creative Briefs
              </Link>
              <Link
                className="font-sans text-[11px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
                to="/productions"
              >
                Production Houses
              </Link>
              <Link
                className="font-sans text-[11px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
                to="/#how-it-works"
              >
                Ecosystem
              </Link>
              <Link
                className="font-sans text-[11px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
                to="/about-us"
              >
                Manifesto
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-surface-highest bg-surface-low">
              <span className="w-1.5 h-1.5 bg-secondary-hover"></span>
              <span className="font-sans text-[11px] tracking-widest text-text-secondary">
                {selectedRegion}
              </span>
            </div>
            <Link
              className="font-sans text-[11px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors px-2"
              to="/login"
            >
              Log In
            </Link>
            <Link
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-secondary-hover text-tertiary font-sans text-[11px] uppercase tracking-[0.2em] font-bold border border-secondary-hover hover:bg-tertiary hover:text-secondary-hover transition-all"
              to="/register/actor"
            >
              GET STARTED
            </Link>
            <Link
              to="/dashboard/talent"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
              title="Dashboard"
            >
              <span className="material-symbols-outlined text-primary-hover text-[18px]">person</span>
            </Link>
            {/* Mobile Nav Toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="xl:hidden p-2 text-text-primary border border-surface-highest"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileNavOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="xl:hidden w-full bg-background border-t border-surface-highest px-6 py-4 space-y-3">
            <Link
              className="block font-sans text-xs uppercase tracking-widest text-secondary-hover"
              to="/find-talent"
              onClick={() => setMobileNavOpen(false)}
            >
              Talent Roster
            </Link>
            <Link
              className="block font-sans text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary"
              to="/find-work"
              onClick={() => setMobileNavOpen(false)}
            >
              Creative Briefs
            </Link>
            <Link
              className="block font-sans text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary"
              to="/productions"
              onClick={() => setMobileNavOpen(false)}
            >
              Production Houses
            </Link>
            <Link
              className="block font-sans text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary"
              to="/#how-it-works"
              onClick={() => setMobileNavOpen(false)}
            >
              Ecosystem
            </Link>
            <Link
              className="block font-sans text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary"
              to="/about-us"
              onClick={() => setMobileNavOpen(false)}
            >
              Manifesto
            </Link>
            <div className="pt-2 border-t border-surface-highest flex gap-3">
              <Link
                to="/login"
                className="flex-1 text-center py-2 text-xs uppercase tracking-wider text-text-primary border border-surface-highest"
                onClick={() => setMobileNavOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/register/actor"
                className="flex-1 text-center py-2 text-xs uppercase tracking-wider bg-secondary-hover text-tertiary font-bold"
                onClick={() => setMobileNavOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="w-full pt-20 bg-background min-h-[calc(100vh-20rem)]">
        <div className="flex flex-col w-full">
          {/* Top Ambient Spotlight Flare */}
          <div className="relative w-full overflow-hidden bg-surface-lowest">
            <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-secondary-hover/5 blur-[140px] pointer-events-none rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none rounded-full"></div>

            {/* Editorial Header Section */}
            <section className="w-full px-6 lg:px-16 pt-12 pb-14 border-b border-surface-highest relative z-10">
              <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10">
                  <div className="space-y-4 max-w-4xl">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary inline-block"></span>
                      <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-secondary-hover">
                        CURATED REGISTRY • VOL. 2025
                      </span>
                      <span className="text-surface-highest font-sans text-[11px]">—</span>
                      <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                        VERIFIED PROVENANCE
                      </span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-text-primary uppercase tracking-tight leading-[0.95] font-bold">
                      The Living Roster <br className="hidden sm:inline" />
                      <span className="text-secondary-hover italic font-normal lowercase tracking-normal">
                        of
                      </span>{' '}
                      Extraordinary Minds.
                    </h1>
                    <p className="font-sans text-lg text-text-secondary max-w-2xl pt-2 leading-relaxed">
                      A vetted international compendium of dramatic actors, visionary cinematographers, sculptural movers, and sonic architects commissioned for cinematic and editorial triumphs.
                    </p>
                  </div>

                  {/* Live Metrics Ledger */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-4 self-start lg:self-end shrink-0 p-6 bg-container border border-surface-highest min-w-[280px]">
                    <div className="flex items-center justify-between border-b border-surface-highest pb-2">
                      <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                        Active Talents
                      </span>
                      <span className="font-display text-2xl text-text-primary font-bold">1,420</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-surface-highest pb-2">
                      <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                        Regional Hubs
                      </span>
                      <span className="font-sans text-lg text-secondary-hover font-semibold">14 Global</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                        Audit Standard
                      </span>
                      <span className="font-sans text-[11px] uppercase tracking-widest text-error bg-surface-highest px-2 py-0.5 font-bold">
                        ZERO COMPROMISE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric Ticker / Live Bar */}
                <div className="pt-6 border-t border-surface-highest flex flex-wrap items-center justify-between gap-4 font-sans text-[11px] tracking-[0.2em] text-text-secondary">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 text-text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-hover animate-pulse"></span>
                      LIVE CURATION ENGINE
                    </span>
                    <span>•</span>
                    <span>CINEMATIC GRADE: TIER I &amp; II</span>
                    <span className="hidden md:inline">•</span>
                    <span className="hidden md:inline">CASTING WINDOW: Q2 / Q3 2025</span>
                  </div>
                  <div className="flex items-center gap-4 text-secondary-hover">
                    <span>BOM • DEL • BLR • PAR • LON</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Architectural Search & Control Strip */}
            <section className="w-full px-6 lg:px-16 py-6 bg-surface-low border-b border-surface-highest sticky top-20 z-40 backdrop-blur-md bg-opacity-95">
              <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
                {/* Search Field */}
                <div className="relative flex-1 max-w-2xl">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">
                    search
                  </span>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-container border border-surface-highest py-3.5 pl-12 pr-4 text-text-primary placeholder:text-text-secondary font-sans text-[15px] focus:outline-none focus:border-secondary-hover transition-colors"
                    placeholder="Search by discipline, dialect, physical traits, or verified credits..."
                    type="text"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-[11px] text-text-secondary uppercase hidden sm:inline">
                    ⌘K / INDEX
                  </span>
                </div>

                {/* Controls: Territory & View Slate */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center bg-container border border-surface-highest px-4 py-2.5">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary mr-2">
                      Region:
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-wider text-secondary-hover font-bold">
                      {selectedRegion}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedRegion(
                          selectedRegion.includes('BOM')
                            ? 'Global International [LON / NYC / PAR]'
                            : 'India [BOM / DEL / BLR]'
                        )
                      }
                      className="ml-3 font-sans text-[11px] uppercase tracking-widest text-text-secondary hover:text-text-primary underline transition-colors"
                    >
                      Switch
                    </button>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-surface-highest bg-container p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1.5 font-sans text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-surface-highest text-text-primary font-bold'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">grid_view</span>
                      <span>Architectural</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('slate')}
                      className={`px-3 py-1.5 font-sans text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                        viewMode === 'slate'
                          ? 'bg-surface-highest text-text-primary font-bold'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">table_rows</span>
                      <span>Detailed Slate</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter Chips */}
              <div className="max-w-[1440px] mx-auto mt-6 pt-4 border-t border-surface-highest/60 flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.label;
                  return (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => setActiveCategory(cat.label)}
                      className={`shrink-0 px-4 py-2 font-sans text-[11px] uppercase tracking-widest transition-colors ${
                        isActive
                          ? 'bg-surface-highest text-secondary-hover border-l-2 border-primary font-bold'
                          : 'bg-container text-text-secondary hover:text-text-primary hover:bg-surface-high border border-surface-highest'
                      }`}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Master Roster Grid */}
            <section className="w-full px-6 lg:px-16 py-16">
              <div className="max-w-[1440px] mx-auto">
                {filteredArtists.length === 0 ? (
                  <div className="text-center py-20 border border-surface-highest bg-container p-8">
                    <p className="font-display text-2xl uppercase tracking-wider text-text-primary mb-2">
                      No Records Discovered
                    </p>
                    <p className="font-sans text-sm text-text-secondary mb-6">
                      No artists matched the criteria "{searchQuery}". Try a different discipline or keyword.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('All Disciplines');
                      }}
                      className="px-6 py-2.5 bg-secondary-hover text-tertiary font-sans text-xs uppercase tracking-widest font-bold"
                    >
                      Reset Ledger Filters
                    </button>
                  </div>
                ) : viewMode === 'grid' ? (
                  /* Grid Matrix */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredArtists.map((artist) => (
                      <article
                        key={artist.id}
                        className="group relative flex flex-col bg-container border border-surface-highest hover:border-secondary-hover/40 transition-all duration-300"
                      >
                        {/* Numerical Index & Status Bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-highest bg-surface-low font-sans text-[11px]">
                          <span className="text-secondary-hover font-bold">SLATE // {artist.id}</span>
                          <span className={`flex items-center gap-1.5 ${artist.badgeColor}`}>
                            <span className="w-1.5 h-1.5 bg-primary"></span>
                            {artist.badge}
                          </span>
                        </div>

                        {/* Image Stage Frame */}
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-lowest">
                          <img
                            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                            alt={artist.name}
                            src={artist.image}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-surface-lowest/30 to-transparent"></div>
                          {/* Location Badge */}
                          <div className="absolute top-3 left-3 bg-surface-lowest/90 border border-surface-highest px-2.5 py-1">
                            <span className="font-sans text-[11px] text-text-primary uppercase tracking-widest">
                              {artist.location}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-text-secondary font-sans text-[11px]">
                            <span>{artist.rep}</span>
                            <span className="text-secondary-hover">{artist.school}</span>
                          </div>
                        </div>

                        {/* Detail Slate */}
                        <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <h3 className="font-display text-xl uppercase tracking-wide text-text-primary group-hover:text-secondary-hover transition-colors font-bold">
                                {artist.name}
                              </h3>
                              <p className="font-sans text-[11px] text-secondary-hover uppercase tracking-[0.2em] font-medium">
                                {artist.role}
                              </p>
                            </div>
                            <p className="font-sans text-sm text-text-secondary line-clamp-2 leading-relaxed">
                              {artist.description}
                            </p>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {artist.tags.map((tag, idx) => (
                                <span
                                  key={tag}
                                  className={`px-2 py-0.5 bg-surface-highest font-sans text-[10px] tracking-wider uppercase ${
                                    idx === artist.tags.length - 1 ? 'text-secondary-hover' : 'text-text-secondary'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Bar */}
                          <div className="pt-4 border-t border-surface-highest flex items-center justify-between">
                            <Link
                              className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-text-primary hover:text-secondary-hover transition-colors font-bold"
                              to={`/talent/${artist.id}`}
                            >
                              <span>View Portfolio</span>
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                            <span className="font-sans text-[11px] text-text-secondary">VERIFIED 2025</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  /* Detailed Slate View */
                  <div className="space-y-4">
                    {filteredArtists.map((artist) => (
                      <div
                        key={artist.id}
                        className="p-6 bg-container border border-surface-highest hover:border-secondary-hover/50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                      >
                        <div className="flex items-center gap-6">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-20 h-20 object-cover border border-surface-highest grayscale group-hover:grayscale-0"
                          />
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-mono text-xs text-secondary-hover">SLATE // {artist.id}</span>
                              <span className="text-xs text-text-secondary">•</span>
                              <span className="font-mono text-xs text-text-secondary">{artist.location}</span>
                            </div>
                            <h3 className="font-display text-xl uppercase font-bold text-text-primary">
                              {artist.name}
                            </h3>
                            <p className="font-sans text-xs text-secondary-hover uppercase tracking-wider mb-2">
                              {artist.role}
                            </p>
                            <p className="font-sans text-xs text-text-secondary max-w-xl">
                              {artist.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 self-end md:self-center shrink-0">
                          <div className="flex flex-wrap gap-1">
                            {artist.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-surface-highest text-[10px] text-text-secondary uppercase"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            to={`/talent/${artist.id}`}
                            className="px-4 py-2 bg-secondary-hover text-tertiary text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-secondary-hover transition-colors"
                          >
                            <span>Portfolio</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Architectural Pagination Ledger */}
            <section className="w-full px-6 lg:px-16 py-8 border-t border-surface-highest bg-surface-low">
              <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-secondary-hover"></span>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                    LEDGER PAGE <span className="text-text-primary font-bold">0{currentPage}</span> / 18 — DISPLAYING 1–8 OF 1,420 VETTED ARTISTS
                  </span>
                </div>

                {/* Strict Zero-Radius Pagination Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="px-4 py-2 border border-surface-highest bg-container text-text-secondary hover:text-text-primary font-sans text-[11px] uppercase tracking-widest transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>PREV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    className={`w-9 h-9 font-sans text-[11px] font-bold ${
                      currentPage === 1 ? 'bg-primary text-error' : 'bg-container text-text-secondary border border-surface-highest'
                    }`}
                  >
                    01
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(2)}
                    className={`w-9 h-9 font-sans text-[11px] ${
                      currentPage === 2 ? 'bg-primary text-error' : 'bg-container hover:bg-surface-high border border-surface-highest text-text-secondary'
                    }`}
                  >
                    02
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(3)}
                    className={`w-9 h-9 font-sans text-[11px] ${
                      currentPage === 3 ? 'bg-primary text-error' : 'bg-container hover:bg-surface-high border border-surface-highest text-text-secondary'
                    }`}
                  >
                    03
                  </button>
                  <span className="px-1 text-text-secondary font-sans text-[11px]">…</span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(18)}
                    className="w-9 h-9 bg-container hover:bg-surface-high border border-surface-highest text-text-secondary font-sans text-[11px]"
                  >
                    18
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(Math.min(18, currentPage + 1))}
                    className="px-4 py-2 border border-surface-highest bg-container hover:bg-surface-high text-text-primary font-sans text-[11px] uppercase tracking-widest transition-colors flex items-center gap-1"
                  >
                    <span>NEXT</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Confidential Commission Concierge Banner */}
            <section className="w-full px-6 lg:px-16 py-14 bg-surface-lowest border-t border-surface-highest">
              <div className="max-w-[1440px] mx-auto bg-container p-8 lg:p-12 border border-surface-highest relative overflow-hidden">
                <div className="absolute right-0 top-0 w-80 h-full bg-secondary-hover/5 blur-[100px] pointer-events-none"></div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-primary font-bold">
                        CONFIDENTIAL SLATE SERVICE
                      </span>
                      <span className="text-surface-highest">•</span>
                      <span className="font-sans text-[11px] text-text-secondary tracking-widest uppercase">
                        FOR PRODUCERS &amp; CASTING DIRECTORS
                      </span>
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl uppercase text-text-primary tracking-wide font-bold">
                      Require Bespoke Roster Assembly?
                    </h2>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
                      Submit your unannounced film treatment, couture runway brief, or episodic casting specifications. The Art-e-techt Atelier Concierge constructs non-disclosed, audition-ready slates within 48 hours.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                    <Link
                      to="/director/create-project/step1"
                      className="px-8 py-3.5 bg-primary text-error font-sans text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-primary transition-all duration-200 text-center"
                    >
                      DISPATCH CASTING BRIEF
                    </Link>
                    <Link
                      to="/about-us"
                      className="px-8 py-3.5 border border-surface-highest bg-surface-low text-text-primary font-sans text-[11px] uppercase tracking-[0.2em] hover:border-secondary-hover transition-colors text-center"
                    >
                      CONCIERGE HOTLINE
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-lowest border-t border-surface-highest">
        <div className="w-full px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-1 flex flex-col justify-between pr-4">
              <div className="space-y-3">
                <div className="font-display font-bold text-xl uppercase tracking-wider text-text-primary">
                  ART-E-TECHT
                </div>
                <div className="font-sans text-[11px] uppercase tracking-[0.25em] text-secondary-hover">
                  ATELIER EDITION
                </div>
                <p className="font-sans text-xs text-text-secondary pt-2 leading-relaxed">
                  Architectural luxury platform uniting elite creative auteurs, bespoke commissions, and state-of-the-art production infrastructure.
                </p>
              </div>
              <div className="pt-8">
                <span className="font-sans text-[11px] tracking-widest text-text-secondary uppercase">
                  BOM · DEL · BLR · INT
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-secondary-hover border-b border-surface-highest pb-2 font-bold">
                Explore
              </h4>
              <ul className="space-y-2.5 font-sans text-xs">
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/find-talent">
                    Talent Roster
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/find-work">
                    Creative Briefs
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/productions">
                    Production Houses
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-secondary-hover border-b border-surface-highest pb-2 font-bold">
                Platform
              </h4>
              <ul className="space-y-2.5 font-sans text-xs">
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/#how-it-works">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/artist-guidelines">
                    Verified Credentials
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/about-us">
                    Developer API
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-secondary-hover border-b border-surface-highest pb-2 font-bold">
                Atelier
              </h4>
              <ul className="space-y-2.5 font-sans text-xs">
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/about-us">
                    About Atelier
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/about-us">
                    The Manifesto
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/success-stories">
                    Press &amp; Publications
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/about-us">
                    Direct Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-secondary-hover border-b border-surface-highest pb-2 font-bold">
                Legal Code
              </h4>
              <ul className="space-y-2.5 font-sans text-xs">
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/privacy-policy">
                    Privacy Protocol
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/terms-and-conditions">
                    Terms of Curation
                  </Link>
                </li>
                <li>
                  <Link className="text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider" to="/artist-guidelines">
                    Provenance Seal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-surface-highest flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
              © 2025 ART-E-TECHT ATELIER. ARCHITECTURAL ALLIANCE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <span className="font-sans text-[11px] text-secondary-hover uppercase tracking-[0.2em]">
                CURATED IN INDIA · SERVING GLOBAL LUXURY
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TalentRoster;
