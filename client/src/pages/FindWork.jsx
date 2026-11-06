import ArtLogo from '../components/common/ArtLogo';
import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';

const FindWork = () => {
  return (
    <div className="bg-background-dark text-text-primary min-h-screen">
      <TopNav />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Search Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-xl bg-void border border-border-subtle p-8 md:p-12 mb-8">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">Find Work</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-primary-text mb-4">Your Next Big Role Awaits</h1>
              <p className="text-text-secondary text-lg mb-8">
                Browse hundreds of active casting calls from top production houses and independent filmmakers.
              </p>
              <div className="flex flex-col md:flex-row gap-3 bg-void p-2 rounded-lg border border-border-subtle shadow-xl">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <span className="material-icons text-text-secondary">search</span>
                  <input
                    className="bg-transparent border-none focus:ring-0 text-primary-text w-full text-sm"
                    placeholder="Search by character, project, or location..."
                    type="text"
                  />
                </div>
                <div className="h-10 w-px bg-container hidden md:block"></div>
                <div className="flex-1 flex items-center px-4 gap-3">
                  <span className="material-icons text-text-secondary">location_on</span>
                  <select className="bg-transparent border-none focus:ring-0 text-text-secondary w-full text-sm appearance-none">
                    {['All Locations', 'Mumbai', 'Hyderabad', 'Chennai', 'Delhi'].map((loc) => (
                      <option key={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-text px-8 py-3 rounded font-bold text-sm tracking-tight active:scale-95 transition-all flex items-center justify-center gap-2">
                  Search Jobs
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filters Bento */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: 'movie', label: 'Feature Film' },
              { icon: 'ad_units', label: 'Commercial' },
              { icon: 'tv', label: 'TV Series' },
              { icon: 'theater_comedy', label: 'Theatre' },
              { icon: 'music_note', label: 'Music Video' },
              { icon: 'emergency_recording', label: 'Short Film' },
            ].map((item) => (
              <button
                key={item.label}
                className="flex flex-col items-center justify-center p-4 bg-void border border-border-subtle rounded-lg hover:border-primary transition-colors group"
              >
                <span className="material-icons text-text-secondary group-hover:text-primary mb-2">{item.icon}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary group-hover:text-primary-text">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="text-primary-text font-bold mb-4 flex items-center gap-2">
                <span className="material-icons text-primary text-sm">filter_list</span>
                Role Requirements
              </h3>
              <div className="space-y-3">
                {['Leading Role', 'Supporting Role', 'Background / Extra', 'Voice Over'].map((label) => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-border-subtle bg-container text-primary focus:ring-gold" type="checkbox" />
                    <span className="text-sm text-text-secondary group-hover:text-primary-text">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-primary-text font-bold mb-4">Production House</h3>
              <div className="space-y-3">
                {['Dharma Productions', 'Yash Raj Films', 'Excel Entertainment'].map((house) => (
                  <label key={house} className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-border-subtle bg-container text-primary focus:ring-gold" type="checkbox" />
                    <span className="text-sm text-text-secondary group-hover:text-primary-text">{house}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-border-subtle">
              <button className="text-xs font-bold text-primary uppercase tracking-widest hover:text-primary/80">Clear All Filters</button>
            </div>
          </aside>

          {/* Jobs Feed */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-text-secondary">
                Showing <span className="text-primary-text font-bold">42</span> active casting calls
              </p>
              <select className="bg-transparent border-none text-sm text-text-secondary focus:ring-0 cursor-pointer">
                {['Sort by: Newest First', 'Sort by: Deadline', 'Sort by: Relevance'].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {[
              {
                title: 'The Shadow Legacy',
                posted: '2h ago',
                badge: 'Feature Film',
                badgeTone: 'primary',
                description:
                  'Looking for a lead female actor (22-28) for an upcoming psychological thriller. Must have formal training in physical theatre or contemporary dance.',
                role: 'Lead Protagonist',
                location: 'Mumbai / Pune',
                prod: 'Dharma Productions',
                shoot: 'Sept - Nov 2024',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSMTpzW9Pxt1KUOljQs2cwbxfwQb1JS0-Ki__Hx0PPeh0pO2Aosi6j4jiX3YwRCvEPE_zrIwJ44LSOt1l2p2NaesaP2Wsa_dIp23AS1IQ8axKjNv3XFvhDmrdCdflS8khrK87rKSmEEVtneuer8JcnUqJWcjR4iMmfGqEro8I0irCqaQYJ5gXodcZzfvN13wKFp5f308XDucxfqFa2JzevdIlvXm1gqQL9sbH3nHTvRGmFSJiUVlxAy8Wc-Zaf_QFtN5iFSFP1-S4f',
                pay: null,
              },
              {
                title: 'Premium Fragrance Launch',
                posted: '5h ago',
                badge: 'Commercial',
                badgeTone: 'blue',
                description:
                  'Seeking elegant, expressive faces for a luxury fragrance campaign. Experience in high-fashion modeling preferred but not mandatory.',
                role: 'Main Model',
                location: 'Bangalore',
                prod: 'Creative Eye Ltd',
                shoot: '10-12 Aug 2024',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqh2DMjqiVxsUvn1sNbIFEGn3WSudPKXJf17VvJWlwkGJaJMP4gswqwPkXgWU1IhiSDMti3uIuBtXldPcWWGv1zrMMCjDCakgnqurybCUmnspX8a61rWhyarkReLisynktiLqtLjQ_DN7kf7Rw9Z7SwO2rl_xb28M7mShLQP0v28Lgdr4rNmobl6o5XLwB88bedzqxyd1GOfq6gt6HaQiVOTzzJ-4DqcNE_dnebKhxOfz1fkCqafsqO4iIoQuT6JhL9rSKHJcIsaUe',
                pay: '₹50k - ₹80k',
              },
            ].map((job) => (
              <article
                key={job.title}
                className="bg-void border border-border-subtle rounded-xl overflow-hidden hover:border-border transition-all group"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-72 h-48 md:h-auto relative shrink-0">
                    <img className="w-full h-full object-cover" alt={job.title} src={job.img} />
                    <div className="absolute inset-0 bg-gradient-to-t from-text-secondary/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded ${
                          job.badgeTone === 'primary'
                            ? 'bg-primary text-primary-text'
                            : 'bg-gold text-primary-text'
                        }`}
                      >
                        {job.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <h2 className="text-xl font-bold text-primary-text group-hover:text-primary transition-colors">{job.title}</h2>
                        <span className="text-xs text-text-secondary font-medium whitespace-nowrap">{job.posted}</span>
                      </div>
                      <p className="text-sm text-text-secondary mb-4 line-clamp-2">{job.description}</p>
                      <div className="grid grid-cols-2 gap-y-3 mb-6 text-xs text-text-secondary">
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm">person</span>
                          <span className="font-semibold text-text-primary">Role: {job.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm">location_on</span>
                          <span className="font-semibold text-text-primary">Location: {job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm">apartment</span>
                          <span className="font-semibold text-text-primary">Prod: {job.prod}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm">calendar_today</span>
                          <span className="font-semibold text-text-primary">Shoot: {job.shoot}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                      {job.pay ? (
                        <span className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Pay: {job.pay}</span>
                      ) : (
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full border-2 border-border-subtle overflow-hidden bg-container flex items-center justify-center text-[10px] font-bold">
                            +12
                          </div>
                        </div>
                      )}
                      <div className="flex gap-3">
                        <button className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-primary-text transition-colors">Details</button>
                        <button className="bg-primary hover:bg-primary/90 text-primary-text px-6 py-2 rounded font-bold text-sm transition-all active:scale-95">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Pagination */}
            <div className="flex justify-center pt-8">
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-container">
                  <span className="material-icons">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-text font-bold">1</button>
                <button className="w-10 h-10 rounded border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-container">2</button>
                <button className="w-10 h-10 rounded border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-container">3</button>
                <button className="w-10 h-10 rounded border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-container">
                  <span className="material-icons">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer (same as Home) */}
      <footer className="bg-background-dark text-text-secondary py-16 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <ArtLogo showWordmark={true} />
                <span className="font-display font-bold text-xl tracking-wide text-primary-text">TALENT<span className="text-primary">CONNECT</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-6">The world's most trusted platform for discovering talent and casting for films, ads, and web series — across every cinema industry.</p>
              <div className="flex gap-4">
                <a className="text-text-secondary hover:text-primary transition-colors" href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5H10v7a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-7h2.1a.5.5 0 0 0 .5-.5l.4-3a.5.5 0 0 0-.5-.5H14V7a1 1 0 0 1 1-1H17a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a className="text-text-secondary hover:text-primary transition-colors" href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" strokeWidth="1.5"/>
                    <circle cx="17" cy="7" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a className="text-text-secondary hover:text-primary transition-colors" href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6.99A4.11 4.11 0 0 0 12 8.09c0 .32.04.64.1.94A11.65 11.65 0 0 1 3 4.89a4.11 4.11 0 0 0 1.27 5.48A4.07 4.07 0 0 1 2.8 9.1v.05a4.11 4.11 0 0 0 3.3 4.03c-.2.05-.41.08-.62.08-.15 0-.3-.01-.45-.04a4.13 4.13 0 0 0 3.84 2.85A8.24 8.24 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 5.92z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a className="text-text-secondary hover:text-primary transition-colors" href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5"/>
                    <path d="M7 10v7M7 7v.01M12 10v7m0 0v-4a2 2 0 0 1 4 0v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-primary-text font-bold mb-6 uppercase tracking-wider text-sm">For Talents</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Search Jobs</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Create Portfolio</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Audition Tips</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary-text font-bold mb-6 uppercase tracking-wider text-sm">For Recruiters</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Post a Job</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Browse Talent</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Casting Services</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary-text font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><span className="material-icons text-xs">email</span> support@Art-e-techt.io</li>
                <li className="flex items-center gap-2"><span className="material-icons text-xs">phone</span> +1 (800) TALENT-1</li>
                <li className="flex items-center gap-2"><span className="material-icons text-xs">place</span> Global HQ · Los Angeles, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border-subtle mt-12 pt-8 text-center text-xs">
            © 2026 TALENT<span className="text-primary">CONNECT</span> • Where Creative Talent Meets Opportunity | Privacy Policy | Terms of Service
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FindWork;
