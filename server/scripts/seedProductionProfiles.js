// Seed script – creates 10 fictional showcase accounts (5 talent, 5 director) with profiles, portfolios, and projects.
// Run with: node server/scripts/seedProductionProfiles.js   (BypassSandbox: true)

import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { admin, auth, db } from '../lib/firebaseAdmin.js';
import fs from 'fs';
import { randomBytes } from 'crypto';

// Resolve __dirname for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env (must contain a valid FIREBASE_ADMIN_KEY)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Abort if Firebase Admin could not be initialised
if (!admin.apps.length) {
  console.error('ERROR: Firebase Admin not initialised. Verify FIREBASE_ADMIN_KEY in server/.env is a single‑line JSON string with escaped newlines.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Credential file – will be .gitignore‑ed.  First line is a header.
const CREDENTIALS_FILE = path.resolve(__dirname, 'seed_credentials.txt');
const writeHeader = () => {
  if (!fs.existsSync(CREDENTIALS_FILE)) {
    fs.writeFileSync(CREDENTIALS_FILE, 'Email\tPassword\n');
  }
};
writeHeader();

const generatePassword = () => 'Atelier@' + randomBytes(4).toString('hex');

// ---------------------------------------------------------------------------
// Helper: create or fetch a Firebase Auth user and return its UID.
async function upsertUser(user) {
  let uid;
  try {
    const existing = await auth.getUserByEmail(user.email);
    uid = existing.uid;
    console.log(`🔑 Existing auth user: ${user.email}`);
  } catch (e) {
    const pwd = generatePassword();
    const newUser = await auth.createUser({
      email: user.email,
      password: pwd,
      displayName: user.fullName,
    });
    uid = newUser.uid;
    console.log(`🆕 Created auth user: ${user.email}`);
    fs.appendFileSync(CREDENTIALS_FILE, `${user.email}\t${pwd}\n`);
  }
  return uid;
}

// ---------------------------------------------------------------------------
// Helper: upsert a profile document (matches the schema used by the platform).
async function upsertProfile(uid, user) {
  const profileRef = db.collection('profiles').doc(uid);
  const base = {
    user: uid,
    fullName: user.fullName,
    displayName: user.displayName,
    headline: user.headline,
    bio: user.bio,
    profilePicture: user.profilePicture,
    bannerImage: user.bannerImage,
    location: user.location,
    languages: ['English', 'Hindi'], // demo defaults
    privacySettings: {
      profileSearchable: true,
      showContactDetails: true,
      showPortfolioPublic: true,
      allowDirectMessages: true,
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (user.role === 'talent') {
    base.talentCategory = user.talentCategory;
    base.experienceYears = user.experienceYears;
    base.skills = user.skills;
    base.portfolio = user.portfolio.map(p => ({
      title: p.title,
      role: p.role,
      category: p.category,
      date: p.date,
      media: p.media,
    }));
  } else {
    base.companyName = user.companyName;
    base.industryType = user.industryType;
    base.portfolio = [];
  }

  await profileRef.set(base, { merge: true });
  console.log(`📄 Upserted profile for ${user.email}`);
}

// ---------------------------------------------------------------------------
// Helper: create a project owned by a director.
async function upsertProject(project, directorUid) {
  const projRef = db.collection('projects').doc();
  const data = {
    director: directorUid,
    title: project.title,
    description: project.description,
    category: project.category,
    budget: project.budget,
    location: project.location,
    requiredTalents: project.requiredTalents,
    status: 'open',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  await projRef.set(data);
  console.log(`🎬 Created project: ${project.title}`);
}

// ---------------------------------------------------------------------------
// Fictional talent profiles – Indian creative‑industry contexts.
const talents = [
  {
    fullName: 'Arjun Mehra',
    displayName: 'Arjun Mehra',
    email: 'arjun.mehra@demo.talentconnect.app',
    role: 'talent',
    talentCategory: 'Actor',
    location: 'Mumbai, Maharashtra, India',
    experienceYears: 6,
    skills: ['Method Acting', 'Improvisation', 'Dialect Coaching', 'Stage Combat', 'Voice Over'],
    headline: 'DEMO – Versatile Actor',
    bio: 'Demo profile – emerging actor passionate about contemporary theatre and indie cinema. Trained at the National School of Drama, Mumbai.',
    profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
    portfolio: [
      { title: 'Monologue – Hamlet', role: 'Lead', category: 'Theatre', date: '2022-03-15', media: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80' },
      { title: 'Web Series – Urban Pulse', role: 'Supporting', category: 'Web Series', date: '2023-01-10', media: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80' },
      { title: 'Short Film – Shadows', role: 'Protagonist', category: 'Film', date: '2024-06-01', media: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80' },
      { title: 'Brand Campaign – Light & Shade', role: 'Model', category: 'Commercial', date: '2025-02-12', media: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' },
    ],
  },
  {
    fullName: 'Leena Kapoor',
    displayName: 'Leena Kapoor',
    email: 'leena.kapoor@demo.talentconnect.app',
    role: 'talent',
    talentCategory: 'Model',
    location: 'Delhi, India',
    experienceYears: 4,
    skills: ['Runway', 'Editorial', 'High Fashion', 'Print Modeling', 'Commercial'],
    headline: 'DEMO – Fashion Model',
    bio: 'Demo profile – professional runway and editorial model with appearances in major Indian fashion weeks and magazine spreads.',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&q=80',
    portfolio: [
      { title: 'Spring Collection – Vogue India', role: 'Model', category: 'Editorial', date: '2023-04-20', media: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' },
      { title: 'Luxury Brand – Silk Ensemble', role: 'Model', category: 'Commercial', date: '2022-09-05', media: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80' },
      { title: 'Street Style Campaign', role: 'Model', category: 'Campaign', date: '2024-01-15', media: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80' },
      { title: 'Digital Lookbook – Urban Edge', role: 'Model', category: 'Digital', date: '2025-03-22', media: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80' },
    ],
  },
  {
    fullName: 'Rohit Kumar',
    displayName: 'Rohit Kumar',
    email: 'rohit.kumar@demo.talentconnect.app',
    role: 'talent',
    talentCategory: 'Dancer / Choreographer',
    location: 'Bengaluru, Karnataka, India',
    experienceYears: 8,
    skills: ['Kathak', 'Contemporary', 'Aerial Stunts', 'Stage Direction', 'Choreography'],
    headline: 'DEMO – Contemporary Dancer',
    bio: 'Demo profile – choreographer blending classical Indian dance with modern movement, trained at Kalakshetra and commissioned for stage productions.',
    profilePicture: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
    portfolio: [
      { title: 'Fusion Performance – Rhythm & Light', role: 'Choreographer', category: 'Stage', date: '2021-11-12', media: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80' },
      { title: 'Music Video – Skyward', role: 'Dancer', category: 'Music Video', date: '2022-07-08', media: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80' },
      { title: 'Theatre – Rivers of Time', role: 'Movement Director', category: 'Theatre', date: '2023-03-30', media: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80' },
      { title: 'Festival Installation – Air Flow', role: 'Lead Dancer', category: 'Installation', date: '2024-10-05', media: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80' },
    ],
  },
  {
    fullName: 'Sneha Rao',
    displayName: 'Sneha Rao',
    email: 'sneha.rao@demo.talentconnect.app',
    role: 'talent',
    talentCategory: 'Singer',
    location: 'Kolkata, West Bengal, India',
    experienceYears: 5,
    skills: ['Classical Hindustani', 'Playback Singing', 'Songwriting', 'Acoustic Guitar'],
    headline: 'DEMO – Vocalist & Composer',
    bio: 'Demo profile – versatile vocalist who has recorded playback tracks for regional cinema and released independent EPs.',
    profilePicture: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
    portfolio: [
      { title: 'Original Single – “Echo”', role: 'Vocalist', category: 'Music', date: '2023-06-01', media: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80' },
      { title: 'Film Song – "Raasta"', role: 'Playback Singer', category: 'Film', date: '2022-11-18', media: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' },
      { title: 'Acoustic EP – "Midnight Strings"', role: 'Composer', category: 'Music', date: '2024-04-22', media: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80' },
      { title: 'Live Session – Kolkata Acoustic', role: 'Performer', category: 'Live', date: '2025-01-10', media: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80' },
    ],
  },
  {
    fullName: 'Maya Singh',
    displayName: 'Maya Singh',
    email: 'maya.singh@demo.talentconnect.app',
    role: 'talent',
    talentCategory: 'Photographer / Video Editor',
    location: 'Chennai, Tamil Nadu, India',
    experienceYears: 7,
    skills: ['Cinematography', 'Color Grading', 'Drone Filming', 'Post‑Production', 'Storyboarding'],
    headline: 'DEMO – Creative Visual Storyteller',
    bio: 'Demo profile – photographer and video editor creating cinematic visual content for fashion, advertising, and short films.',
    profilePicture: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
    portfolio: [
      { title: 'Short Film – "Silhouette" (Cinematographer)', role: 'Cinematographer', category: 'Film', date: '2022-08-18', media: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80' },
      { title: 'Fashion Editorial – "Monochrome"', role: 'Photographer', category: 'Editorial', date: '2023-03-05', media: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80' },
      { title: 'Advertisement – "City Pulse" (Editor)', role: 'Video Editor', category: 'Commercial', date: '2024-09-12', media: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80' },
      { title: 'Documentary B‑Roll – "Rivers of India"', role: 'Cinematographer', category: 'Documentary', date: '2025-02-28', media: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Fictional director profiles.
const directors = [
  {
    fullName: 'Vikramaditya Roy',
    displayName: 'Vikramaditya Roy',
    email: 'vikramaditya.roy@demo.atelierfilms.com',
    role: 'director',
    companyName: 'Atelier Noir Productions',
    industryType: 'Feature Films',
    location: 'Mumbai, Maharashtra, India',
    headline: 'DEMO – Film Director',
    bio: 'Demo profile – award‑winning filmmaker focusing on neo‑noir psychological dramas. Graduate of FTII, Pune.',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
  },
  {
    fullName: 'Zoya Merchant',
    displayName: 'Zoya Merchant',
    email: 'zoya.merchant@demo.chalkboardcinema.com',
    role: 'director',
    companyName: 'Chalkboard Cinema Collective',
    industryType: 'OTT / Web Series',
    location: 'Mumbai, Maharashtra, India',
    headline: 'DEMO – Series Showrunner',
    bio: 'Demo profile – creator of gritty, character‑driven streaming series. Alumni of Satyajit Ray Film Institute.',
    profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
  },
  {
    fullName: 'Arjun Singhania',
    displayName: 'Arjun Singhania',
    email: 'arjun.singhania@demo.apexmotion.com',
    role: 'director',
    companyName: 'Apex Motion Pictures',
    industryType: 'Commercials & Action',
    location: 'Bengaluru, Karnataka, India',
    headline: 'DEMO – Action Commercial Director',
    bio: 'Demo profile – high‑octane director for pan‑Indian advertising campaigns, with a background in stunt coordination.',
    profilePicture: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
  },
  {
    fullName: 'Nandita Swaminathan',
    displayName: 'Nandita Swaminathan',
    email: 'nandita.swaminathan@demo.southerwave.com',
    role: 'director',
    companyName: 'Southern Wave CineLabs',
    industryType: 'Documentary & Indie',
    location: 'Chennai, Tamil Nadu, India',
    headline: 'DEMO – Documentary Filmmaker',
    bio: 'Demo profile – storyteller focusing on cultural and social narratives. Screened at Cannes Short Film Corner.',
    profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
  },
  {
    fullName: 'Karan Thapar',
    displayName: 'Karan Thapar',
    email: 'karan.thapar@demo.horizonstudios.in',
    role: 'director',
    companyName: 'Horizon Visual Studios',
    industryType: 'Music Videos & Fashion',
    location: 'Delhi, India',
    headline: 'DEMO – Music Video Director',
    bio: 'Demo profile – visual stylist creating fashion‑forward music videos for emerging artists.',
    profilePicture: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1487215078513-3a6e62ea7d0b?w=1200&q=80',
  },
];

// ---------------------------------------------------------------------------
// Projects owned by directors.
const projects = [
  {
    title: 'The Silent Canvas',
    description: 'Feature film exploring artistic obsession and the struggle between creation and commerce.',
    category: 'Film',
    budget: 45000000,
    location: 'Mumbai, India',
    directorEmail: directors[0].email,
    requiredTalents: ['Actor', 'Cinematographer', 'Singer'],
  },
  {
    title: 'Shadows of Daryaganj',
    description: 'Web series set in historic Delhi alleyways, blending mystery with social commentary.',
    category: 'Web Series',
    budget: 28000000,
    location: 'Delhi, India',
    directorEmail: directors[1].email,
    requiredTalents: ['Actor', 'Model'],
  },
  {
    title: 'Project Velocidad',
    description: 'High‑energy commercial action piece for a leading automotive brand.',
    category: 'Commercial',
    budget: 8500000,
    location: 'Bengaluru, India',
    directorEmail: directors[2].email,
    requiredTalents: ['Actor', 'Model', 'Dancer'],
  },
  {
    title: 'Echoes in the Monsoon',
    description: 'Indie drama navigating familial ties during the monsoon season, screened at regional festivals.',
    category: 'Film',
    budget: 12000000,
    location: 'Chennai, India',
    directorEmail: directors[3].email,
    requiredTalents: ['Actor', 'Singer'],
  },
  {
    title: 'Neon Mirage',
    description: 'Stylized music video for an upcoming electronic artist, with vibrant visual effects.',
    category: 'Music Video',
    budget: 3500000,
    location: 'Mumbai, India',
    directorEmail: directors[4].email,
    requiredTalents: ['Singer', 'Dancer'],
  },
];

// ---------------------------------------------------------------------------
// Main execution – create users, profiles, then projects.
(async () => {
  // Map director e‑mail → UID for project creation.
  const directorUids = {};

  // Process directors first (they own projects).
  for (const dir of directors) {
    const uid = await upsertUser(dir);
    directorUids[dir.email] = uid;
    await upsertProfile(uid, dir);
  }

  // Process talents.
  for (const tal of talents) {
    const uid = await upsertUser(tal);
    await upsertProfile(uid, tal);
  }

  // Create projects linked to directors.
  for (const proj of projects) {
    const dirUid = directorUids[proj.directorEmail];
    if (dirUid) {
      await upsertProject(proj, dirUid);
    } else {
      console.warn(`⚠️ Director UID not found for project ${proj.title}`);
    }
  }

  console.log('✅ Seeding complete. Credentials stored at', CREDENTIALS_FILE);
  process.exit(0);
})();
