import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

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
        {/* Unified Architectural Header */}
        <TopNav />

        <main className="w-full pt-20">
          {/* ========================================================
               SECTION 01: HERO / ROSTER MANIFESTO HEADER
               ======================================================== */}
          <section className="relative w-full bg-void border-b border-border py-14 px-5 md:px-10 lg:px-16 overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10">
                <div className="space-y-4 max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border">
                    <span className="w-1.5 h-1.5 bg-secondary block"></span>
                    <span className="font-sans text-[11px] text-secondary tracking-[0.25em] font-semibold uppercase">
                      Curated Registry • Vol. 2025
                    </span>
                    <span className="text-border font-sans text-[11px]">—</span>
                    <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                      Verified Provenance
                    </span>
                  </div>

                  <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-text-primary uppercase tracking-tight leading-[1.0] font-bold">
                    The Living Roster <br className="hidden sm:inline" />
                    <span className="text-secondary italic font-serif font-normal lowercase tracking-normal">
                      of
                    </span>{' '}
                    Extraordinary Minds.
                  </h1>

                  <p className="font-sans text-base sm:text-lg text-text-secondary max-w-2xl pt-2 leading-relaxed">
                    A vetted international compendium of dramatic actors, visionary cinematographers, sculptural movers, and sonic architects commissioned for cinematic and editorial triumphs.
                  </p>
                </div>

                {/* Live Metrics Ledger */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 self-start lg:self-end shrink-0 p-6 bg-background border border-border min-w-[280px]">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                      Active Talents
                    </span>
                    <span className="font-display text-2xl text-text-primary font-bold">1,420</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                      Regional Hubs
                    </span>
                    <span className="font-sans text-lg text-secondary font-semibold">14 Global</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-text-secondary">
                      Audit Standard
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-secondary border border-secondary/40 px-2 py-0.5 font-bold">
                      ZERO COMPROMISE
                    </span>
                  </div>
                </div>
              </div>

              {/* Metric Ticker / Live Bar */}
              <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-text-secondary">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2 text-text-primary font-semibold">
                    <span className="w-1.5 h-1.5 bg-secondary animate-pulse block"></span>
                    LIVE CURATION ENGINE
                  </span>
                  <span>•</span>
                  <span>CINEMATIC GRADE: TIER I &amp; II</span>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:inline">CASTING WINDOW: Q2 / Q3 2025</span>
                </div>
                <div className="text-secondary font-mono">
                  <span>BOM • DEL • BLR • PAR • LON</span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 02: ARCHITECTURAL SEARCH & CONTROL STRIP
               ======================================================== */}
          <section className="w-full px-5 md:px-10 lg:px-16 py-5 bg-void/95 border-b border-border sticky top-20 z-40 backdrop-blur-md">
            <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
              {/* Search Field */}
              <div className="relative flex-1 max-w-2xl">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background border border-border py-3 pl-12 pr-4 text-text-primary placeholder:text-text-secondary font-sans text-sm focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Search by discipline, dialect, physical traits, or verified credits..."
                  type="text"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-text-secondary uppercase hidden sm:inline">
                  ⌘K / INDEX
                </span>
              </div>

              {/* Controls: Territory & View Slate */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center bg-background border border-border px-4 py-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary mr-2">
                    Region:
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-secondary font-bold">
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
                    className="ml-3 font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-text-primary underline transition-colors"
                  >
                    Switch
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-border bg-background p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 font-sans text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-secondary text-primary-text font-bold'
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
                        ? 'bg-secondary text-primary-text font-bold'
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
            <div className="max-w-[1440px] mx-auto mt-4 pt-4 border-t border-border flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-text-secondary uppercase tracking-wider mr-1 shrink-0 font-mono">
                Disciplines:
              </span>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setActiveCategory(cat.label)}
                    className={`shrink-0 px-3.5 py-1.5 font-sans text-[11px] uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-surface-low border border-secondary text-secondary font-semibold'
                        : 'bg-background border border-border hover:border-secondary text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                );
              })}
            </div>
          </section>

          {/* ========================================================
               SECTION 03: MASTER ROSTER GRID / SLATE
               ======================================================== */}
          <section className="w-full px-5 md:px-10 lg:px-16 py-16 bg-void">
            <div className="max-w-[1440px] mx-auto">
              {filteredArtists.length === 0 ? (
                <div className="text-center py-20 border border-border bg-background p-8">
                  <p className="font-display text-2xl uppercase tracking-wider text-text-primary mb-2 font-bold">
                    No Records Discovered
                  </p>
                  <p className="font-sans text-sm text-text-secondary mb-6 max-w-md mx-auto">
                    No artists matched the criteria "{searchQuery}". Try a different discipline or keyword.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All Disciplines');
                    }}
                    className="px-6 py-2.5 bg-secondary text-primary-text font-sans text-xs uppercase tracking-widest font-bold hover:bg-tertiary transition-colors"
                  >
                    Reset Ledger Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                /* Grid Matrix (Matching Home.jsx Card Formats) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredArtists.map((artist) => (
                    <article
                      key={artist.id}
                      className="group relative flex flex-col bg-background border border-border hover:border-secondary transition-all duration-300"
                    >
                      {/* Numerical Index & Status Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-low font-mono text-[10px]">
                        <span className="text-secondary font-bold uppercase tracking-widest">
                          SLATE // {artist.id}
                        </span>
                        <span className="flex items-center gap-1.5 text-text-secondary uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 bg-secondary block"></span>
                          {artist.badge}
                        </span>
                      </div>

                      {/* Image Stage Frame */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-low">
                        <img
                          className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700 ease-out"
                          alt={artist.name}
                          src={artist.image}
                        />
                        <div className="absolute top-3 right-3 bg-void/90 border border-border px-2 py-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[14px]">
                            verified
                          </span>
                          <span className="font-mono text-[9px] text-secondary tracking-widest uppercase">
                            Verified
                          </span>
                        </div>

                        {/* Location Badge */}
                        <div className="absolute top-3 left-3 bg-void/90 border border-border px-2.5 py-1 font-mono text-[9px] text-text-primary uppercase tracking-widest">
                          {artist.location}
                        </div>

                        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-text-secondary font-mono text-[10px]">
                          <span>{artist.rep}</span>
                          <span className="text-secondary">{artist.school}</span>
                        </div>
                      </div>

                      {/* Detail Slate */}
                      <div className="p-5 flex flex-col flex-1 justify-between gap-5 bg-background">
                        <div className="space-y-2.5">
                          <div className="space-y-1">
                            <h3 className="font-display text-xl uppercase tracking-wide text-text-primary group-hover:text-secondary transition-colors font-bold">
                              {artist.name}
                            </h3>
                            <p className="font-sans text-[11px] text-secondary uppercase tracking-[0.2em] font-medium">
                              {artist.role}
                            </p>
                          </div>
                          <p className="font-sans text-xs text-text-secondary line-clamp-2 leading-relaxed">
                            {artist.description}
                          </p>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {artist.tags.map((tag, idx) => (
                              <span
                                key={tag}
                                className={`px-2 py-0.5 bg-void border border-border font-mono text-[9px] tracking-wider uppercase ${
                                  idx === artist.tags.length - 1
                                    ? 'text-secondary border-secondary/40'
                                    : 'text-text-secondary'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="pt-4 border-t border-border flex items-center justify-between">
                          <Link
                            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-secondary hover:text-text-primary transition-colors font-semibold"
                            to={`/talent/${artist.id}`}
                          >
                            <span>View Portfolio</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </Link>
                          <span className="font-mono text-[10px] text-text-secondary uppercase">
                            VERIFIED 2025
                          </span>
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
                      className="p-6 bg-background border border-border hover:border-secondary transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-6">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-20 h-20 object-cover border border-border filter contrast-[1.08]"
                        />
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-mono text-xs text-secondary">
                              SLATE // {artist.id}
                            </span>
                            <span className="text-xs text-text-secondary">•</span>
                            <span className="font-mono text-xs text-text-secondary">
                              {artist.location}
                            </span>
                          </div>
                          <h3 className="font-display text-xl uppercase font-bold text-text-primary">
                            {artist.name}
                          </h3>
                          <p className="font-sans text-xs text-secondary uppercase tracking-wider mb-2">
                            {artist.role}
                          </p>
                          <p className="font-sans text-xs text-text-secondary max-w-xl leading-relaxed">
                            {artist.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 self-end md:self-center shrink-0">
                        <div className="flex flex-wrap gap-1">
                          {artist.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-void border border-border text-[9px] font-mono text-text-secondary uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/talent/${artist.id}`}
                          className="px-4 py-2 bg-secondary text-primary-text text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-tertiary transition-colors border border-secondary"
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

          {/* ========================================================
               SECTION 04: ARCHITECTURAL PAGINATION LEDGER
               ======================================================== */}
          <section className="w-full px-5 md:px-10 lg:px-16 py-8 border-t border-border bg-background">
            <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary"></span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                  LEDGER PAGE <span className="text-text-primary font-bold">0{currentPage}</span> / 18 — DISPLAYING 1–8 OF 1,420 VETTED ARTISTS
                </span>
              </div>

              {/* Strict Zero-Radius Pagination Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="px-4 py-2 border border-border bg-void text-text-secondary hover:text-text-primary hover:border-secondary font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>PREV</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className={`w-9 h-9 font-mono text-[11px] font-bold ${
                    currentPage === 1
                      ? 'bg-secondary text-primary-text border border-secondary'
                      : 'bg-void text-text-secondary border border-border hover:border-secondary'
                  }`}
                >
                  01
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className={`w-9 h-9 font-mono text-[11px] ${
                    currentPage === 2
                      ? 'bg-secondary text-primary-text border border-secondary font-bold'
                      : 'bg-void hover:bg-surface-low border border-border hover:border-secondary text-text-secondary'
                  }`}
                >
                  02
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className={`w-9 h-9 font-mono text-[11px] ${
                    currentPage === 3
                      ? 'bg-secondary text-primary-text border border-secondary font-bold'
                      : 'bg-void hover:bg-surface-low border border-border hover:border-secondary text-text-secondary'
                  }`}
                >
                  03
                </button>
                <span className="px-1 text-text-secondary font-mono text-[11px]">…</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(18)}
                  className="w-9 h-9 bg-void hover:bg-surface-low border border-border hover:border-secondary text-text-secondary font-mono text-[11px]"
                >
                  18
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.min(18, currentPage + 1))}
                  className="px-4 py-2 border border-border bg-void hover:bg-surface-low text-text-primary hover:border-secondary font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-1"
                >
                  <span>NEXT</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================
               SECTION 05: CONFIDENTIAL COMMISSION CONCIERGE BANNER
               ======================================================== */}
          <section className="w-full px-5 md:px-10 lg:px-16 py-16 bg-void border-t border-border">
            <div className="max-w-[1440px] mx-auto bg-background p-8 lg:p-12 border border-border relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-secondary font-bold">
                      CONFIDENTIAL SLATE SERVICE
                    </span>
                    <span className="text-border">•</span>
                    <span className="font-sans text-[11px] text-text-secondary tracking-widest uppercase">
                      FOR PRODUCERS &amp; CASTING DIRECTORS
                    </span>
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl uppercase text-text-primary tracking-wide font-bold">
                    Require Bespoke Roster Assembly?
                  </h2>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    Submit your unannounced film treatment, couture runway brief, or episodic casting specifications. The ART-E-TECHT ATELIER Concierge constructs non-disclosed, audition-ready slates within 48 hours.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                  <Link
                    to="/director/create-project/step1"
                    className="px-8 py-3.5 bg-secondary text-primary-text font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-tertiary transition-all duration-200 text-center border border-secondary shadow-[0_0_24px_color-mix(in srgb,var(--color-secondary)_25%,transparent)]"
                  >
                    DISPATCH CASTING BRIEF
                  </Link>
                  <Link
                    to="/about-us"
                    className="px-8 py-3.5 border border-border bg-transparent text-text-primary font-sans text-xs uppercase tracking-[0.2em] hover:border-secondary hover:text-secondary transition-colors text-center"
                  >
                    CONCIERGE HOTLINE
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Unified Architectural Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default TalentRoster;
