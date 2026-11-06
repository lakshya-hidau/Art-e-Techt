import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getProducerProjects,
  getProducerApplications,
  updateProducerApplicationStatus,
  scheduleProducerAudition
} from '../services/producerService';

const ProducerDashboard = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Modal state for audition scheduling
  const [auditionModalApp, setAuditionModalApp] = useState(null);
  const [auditionDate, setAuditionDate] = useState('');
  const [auditionLocation, setAuditionLocation] = useState('');
  const [auditionNotes, setAuditionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [projRes, appRes] = await Promise.allSettled([
        getProducerProjects(),
        getProducerApplications()
      ]);

      if (projRes.status === 'fulfilled') {
        const rawProj = projRes.value?.data || projRes.value || [];
        setProjects(Array.isArray(rawProj) ? rawProj : []);
      }
      if (appRes.status === 'fulfilled') {
        const rawApps = appRes.value?.data || appRes.value || [];
        setApplications(Array.isArray(rawApps) ? rawApps : []);
      }
    } catch (err) {
      console.error('Error fetching producer data:', err);
      setError('Unable to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateProducerApplicationStatus(appId, newStatus);
      setApplications(prev =>
        prev.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update application status.');
    }
  };

  const handleScheduleAuditionSubmit = async (e) => {
    e.preventDefault();
    if (!auditionModalApp || !auditionDate) return;
    setIsSubmitting(true);
    try {
      await scheduleProducerAudition(auditionModalApp.id, {
        auditionDate,
        auditionLocation: auditionLocation || 'Atelier Studio A',
        auditionNotes
      });
      setApplications(prev =>
        prev.map(app =>
          app.id === auditionModalApp.id
            ? { ...app, status: 'auditioning', auditionDate, auditionLocation, auditionNotes }
            : app
        )
      );
      setAuditionModalApp(null);
      setAuditionDate('');
      setAuditionLocation('');
      setAuditionNotes('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to schedule audition.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const stats = {
    totalProductions: projects.length,
    activeProductions: projects.filter(p => p.status !== 'closed').length,
    totalApplications: applications.length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    auditioning: applications.filter(a => a.status === 'auditioning').length,
    selected: applications.filter(a => a.status === 'selected').length
  };

  return (
    <div className="min-h-screen bg-void text-text-primary font-['Space_Grotesk'] antialiased">
      {/* Top Bar */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold tracking-tight text-text-primary font-['Syne'] flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-primary" />
              <span>ART-E-TECHT</span>
            </Link>
            <span className="text-xs uppercase tracking-widest px-2.5 py-1 bg-container border border-border text-secondary font-mono">
              Producer Atelier
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/talent-roster"
              className="text-xs uppercase tracking-widest px-4 py-2 border border-border hover:border-secondary text-text-secondary hover:text-text-primary transition-colors"
            >
              Browse Talent
            </Link>
            <Link
              to="/director/create-project/step1"
              className="text-xs uppercase tracking-widest px-4 py-2 bg-primary hover:bg-primary-hover text-text-primary font-semibold transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Production
            </Link>
            <button
              onClick={logout}
              className="text-xs uppercase tracking-widest px-3 py-2 text-text-secondary hover:text-primary transition-colors"
              title="Sign out"
            >
              <span className="material-symbols-outlined text-base">logout</span>
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div role="alert" className="mx-auto mt-4 max-w-7xl px-4 text-error">
          {error}
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Banner */}
        <div className="border border-border bg-background p-6 lg:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-secondary font-mono mb-1">
                Executive Production Console
              </p>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-text-primary font-['Syne']">
                Welcome, {user?.name || user?.email?.split('@')[0] || 'Producer'}
              </h1>
              <p className="text-sm text-text-secondary mt-1 max-w-2xl">
                Coordinate active casting calls, review talent submissions, dispatch audition invitations, and finalize ensemble selections.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/director/create-project/step1"
                className="px-5 py-3 bg-secondary hover:bg-tertiary text-void font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Launch Casting Call
              </Link>
            </div>
          </div>
        </div>

        {/* Executive Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {[
            { label: 'Active Productions', value: stats.activeProductions, icon: 'movie' },
            { label: 'Total Productions', value: stats.totalProductions, icon: 'folder_open' },
            { label: 'Total Submissions', value: stats.totalApplications, icon: 'badge' },
            { label: 'Shortlisted', value: stats.shortlisted, icon: 'bookmark_check' },
            { label: 'Auditions', value: stats.auditioning, icon: 'mic' },
            { label: 'Cast / Selected', value: stats.selected, icon: 'verified' }
          ].map((metric, idx) => (
            <div key={idx} className="border border-border bg-background p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-2">
                <span className="text-[10px] uppercase tracking-wider font-mono">{metric.label}</span>
                <span className="material-symbols-outlined text-sm text-secondary">{metric.icon}</span>
              </div>
              <div className="text-2xl font-bold font-['Syne'] text-text-primary">
                {loading ? '-' : metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Section: Active Productions */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
            <h2 className="text-lg font-bold font-['Syne'] text-text-primary uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary" />
              Your Productions & Castings
            </h2>
            <Link
              to="/director/create-project/step1"
              className="text-xs uppercase tracking-widest text-secondary hover:underline"
            >
              + Create New
            </Link>
          </div>

          {loading ? (
            <div className="border border-border p-8 text-center text-text-secondary text-sm">
              Loading active productions...
            </div>
          ) : projects.length === 0 ? (
            <div className="border border-dashed border-border bg-background p-10 text-center">
              <span className="material-symbols-outlined text-4xl text-text-secondary mb-2">video_library</span>
              <p className="text-sm text-text-primary font-semibold mb-1">No productions published yet</p>
              <p className="text-xs text-text-secondary mb-4">Post your first casting call to start receiving talent submissions.</p>
              <Link
                to="/director/create-project/step1"
                className="inline-block px-4 py-2 bg-primary text-text-primary text-xs uppercase tracking-wider font-bold"
              >
                Post Casting Call
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(proj => (
                <div key={proj.id} className="border border-border bg-background hover:border-secondary transition-colors p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-2 font-mono">
                      <span>{proj.category || 'Production'}</span>
                      <span className={`px-2 py-0.5 uppercase tracking-wider text-[10px] ${
                        proj.status === 'open' ? 'bg-container text-secondary border border-border' : 'bg-container text-text-secondary'
                      }`}>
                        {proj.status || 'open'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-['Syne'] text-text-primary mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2 mb-4">
                      {proj.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="border-t border-border pt-4 mt-2">
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                      <span>Budget: <strong className="text-text-primary">{proj.budget || 'Competitive'}</strong></span>
                      <span>Location: <strong className="text-text-primary">{proj.location || 'Pan-India'}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/director/project/${proj.id}`}
                        className="flex-1 text-center py-2 border border-border hover:border-text-primary text-xs uppercase tracking-widest text-text-primary transition-colors"
                      >
                        Manage Roles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Submissions Stream */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 mb-6 gap-4">
            <h2 className="text-lg font-bold font-['Syne'] text-text-primary uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-primary" />
              Talent Submissions & Review Slate
            </h2>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {['all', 'applied', 'shortlisted', 'auditioning', 'selected', 'rejected'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`text-[11px] uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                    filterStatus === st
                      ? 'bg-primary border-primary text-text-primary font-bold'
                      : 'border-border bg-background text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="border border-border p-8 text-center text-text-secondary text-sm">
              Loading submissions...
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="border border-dashed border-border bg-background p-8 text-center text-text-secondary text-xs">
              No submissions found for status filter "{filterStatus}".
            </div>
          ) : (
            <div className="border border-border bg-background divide-y divide-border">
              {filteredApplications.map(app => (
                <div key={app.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-low transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-container border border-border flex items-center justify-center font-bold text-sm text-secondary shrink-0 font-['Syne']">
                      {(app.talentName || 'A')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-text-primary">{app.talentName || app.talent || 'Artist Candidate'}</span>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border font-mono ${
                          app.status === 'selected' ? 'border-secondary text-secondary bg-secondary/10' :
                          app.status === 'shortlisted' ? 'border-primary text-primary bg-primary/10' :
                          app.status === 'auditioning' ? 'border-warning text-warning bg-warning/10' :
                          app.status === 'rejected' ? 'border-border-subtle text-text-secondary' :
                          'border-border text-text-secondary'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Project: <strong className="text-text-primary">{app.projectTitle || app.project}</strong>
                      </p>
                      {app.auditionDate && (
                        <p className="text-[11px] text-secondary mt-1 flex items-center gap-1 font-mono">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          Audition scheduled: {new Date(app.auditionDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      to={`/talent/${app.talent}`}
                      className="px-3 py-1.5 border border-border hover:border-secondary text-xs text-text-secondary hover:text-text-primary uppercase tracking-wider font-mono transition-colors"
                    >
                      View Dossier
                    </Link>

                    {app.status !== 'shortlisted' && app.status !== 'selected' && (
                      <button
                        onClick={() => handleStatusChange(app.id, 'shortlisted')}
                        className="px-3 py-1.5 bg-container hover:bg-border border border-border text-xs text-secondary uppercase tracking-wider font-mono transition-colors"
                      >
                        Shortlist
                      </button>
                    )}

                    {app.status !== 'auditioning' && app.status !== 'selected' && (
                      <button
                        onClick={() => setAuditionModalApp(app)}
                        className="px-3 py-1.5 bg-container hover:bg-border border border-border text-xs text-text-primary uppercase tracking-wider font-mono transition-colors"
                      >
                        Schedule Audition
                      </button>
                    )}

                    {app.status !== 'selected' && (
                      <button
                        onClick={() => handleStatusChange(app.id, 'selected')}
                        className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-xs text-text-primary uppercase tracking-wider font-bold transition-colors"
                      >
                        Select & Cast
                      </button>
                    )}

                    {app.status !== 'rejected' && app.status !== 'selected' && (
                      <button
                        onClick={() => handleStatusChange(app.id, 'rejected')}
                        className="px-2 py-1.5 text-xs text-text-secondary hover:text-error font-mono transition-colors"
                        title="Reject application"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Schedule Audition Modal */}
      {auditionModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm p-4">
          <div className="border border-border bg-background max-w-lg w-full p-6 text-text-primary">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="font-['Syne'] font-bold text-lg uppercase tracking-wider text-text-primary">
                Schedule Audition Call
              </h3>
              <button
                onClick={() => setAuditionModalApp(null)}
                className="text-text-secondary hover:text-text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleScheduleAuditionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-text-secondary mb-1">
                  Candidate
                </label>
                <input
                  type="text"
                  disabled
                  value={auditionModalApp.talentName || auditionModalApp.talent || 'Candidate'}
                  className="w-full bg-container border border-border px-3 py-2 text-xs text-text-secondary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-text-secondary mb-1">
                  Audition Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={auditionDate}
                  onChange={(e) => setAuditionDate(e.target.value)}
                  className="w-full bg-container border border-border px-3 py-2 text-xs text-text-primary focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-text-secondary mb-1">
                  Location / Virtual Studio Link
                </label>
                <input
                  type="text"
                  placeholder="e.g. Studio 4B, Mumbai or Google Meet link"
                  value={auditionLocation}
                  onChange={(e) => setAuditionLocation(e.target.value)}
                  className="w-full bg-container border border-border px-3 py-2 text-xs text-text-primary focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-text-secondary mb-1">
                  Audition Script & Preparation Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Instructions for dialogue monologue, wardrobe, or prep..."
                  value={auditionNotes}
                  onChange={(e) => setAuditionNotes(e.target.value)}
                  className="w-full bg-container border border-border px-3 py-2 text-xs text-text-primary focus:border-secondary focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setAuditionModalApp(null)}
                  className="px-4 py-2 border border-border text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-xs uppercase tracking-wider text-text-primary font-bold disabled:opacity-50"
                >
                  {isSubmitting ? 'Dispatching...' : 'Dispatch Audition Call'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProducerDashboard;
