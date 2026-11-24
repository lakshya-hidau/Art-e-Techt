// Seed script to create 5 talent and 5 director profiles with projects, and generate credentials file.
// Run with: node server/scripts/seedProductionProfiles.cjs (BypassSandbox: true)

const { admin, auth, db } = require('../lib/firebaseAdmin'); // Import initialized admin, auth, db
const fs = require('fs');
const path = require('path');

const CREDENTIALS_FILE = path.join(__dirname, 'seed_credentials.txt');
const DEFAULT_PASSWORD = 'Atelier@2026';

const talents = [
  {
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@talentconnect.app',
    role: 'talent',
    talentCategory: 'Actor',
    location: 'Mumbai, Maharashtra, India',
    experienceYears: 6,
    skills: ['Method Acting', 'Classical Hindi', 'Action Combat', 'Urdu Diction', 'Voice Modulation'],
    profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    portfolio: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', title: 'Headshot 1', description: 'Lead Actor portrait' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', title: 'Monologue Still', description: 'Stage monologue' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80', title: 'Character Shot', description: 'Character in costume' },
    ],
  },
  {
    fullName: 'Ananya Mehta',
    email: 'ananya.mehta@talentconnect.app',
    role: 'talent',
    talentCategory: 'Model',
    location: 'Delhi NCR, India',
    experienceYears: 4,
    skills: ['Editorial Runway', 'High Fashion', 'Screen Presence', 'Expressive Posing'],
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    portfolio: [],
  },
  {
    fullName: 'Meera Nair',
    email: 'meera.nair@talentconnect.app',
    role: 'talent',
    talentCategory: 'Dancer / Choreographer',
    location: 'Bengaluru, Karnataka, India',
    experienceYears: 8,
    skills: ['Classical Kathak', 'Contemporary Choreography', 'Aerial Stunts', 'Stage Movement'],
    profilePicture: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    portfolio: [],
  },
  {
    fullName: 'Kabir Malhotra',
    email: 'kabir.malhotra@talentconnect.app',
    role: 'talent',
    talentCategory: 'Cinematographer',
    location: 'Mumbai, Maharashtra, India',
    experienceYears: 7,
    skills: ['35mm Anamorphic', 'Chiaroscuro Lighting', 'ARRI Alexa 65', 'Color Grading'],
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    portfolio: [],
  },
  {
    fullName: 'Priya Sen',
    email: 'priya.sen@talentconnect.app',
    role: 'talent',
    talentCategory: 'Singer',
    location: 'Kolkata, West Bengal, India',
    experienceYears: 5,
    skills: ['Hindustani Classical', 'Playback Vocals', 'Soundtrack Composition', 'Acoustic Guitar'],
    profilePicture: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    portfolio: [],
  },
];

const directors = [
  {
    fullName: 'Vikramaditya Roy',
    email: 'vikramaditya.roy@atelierfilms.com',
    role: 'director',
    companyName: 'Atelier Noir Productions',
    industryType: 'Feature Films',
    location: 'Mumbai, Maharashtra, India',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    bio: 'National Award-winning auteur specializing in neo-noir psychological dramas.',
  },
  {
    fullName: 'Zoya Merchant',
    email: 'zoya.merchant@chalkboardcinema.com',
    role: 'director',
    companyName: 'Chalkboard Cinema Collective',
    industryType: 'OTT / Web Series',
    location: 'Mumbai, Maharashtra, India',
    profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    bio: 'Acclaimed showrunner behind gritty coming-of-age streaming originals.',
  },
  {
    fullName: 'Arjun Singhania',
    email: 'arjun.singhania@apexmotion.com',
    role: 'director',
    companyName: 'Apex Motion Pictures',
    industryType: 'Commercials & Action Cinema',
    location: 'Bengaluru, Karnataka, India',
    profilePicture: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80',
    bio: 'High‑octane commercial and action director for pan‑Indian campaigns.',
  },
  {
    fullName: 'Nandita Swaminathan',
    email: 'nandita.swami@dharmicdreams.com',
    role: 'director',
    companyName: 'Southern Wave CineLabs',
    industryType: 'Indie & Festival Films',
    location: 'Chennai, Tamil Nadu, India',
    profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    bio: 'Cannes & IFFI celebrated filmmaker crafting poetic realism.',
  },
  {
    fullName: 'Karan Thapar',
    email: 'karan.thapar@horizonstudios.in',
    role: 'director',
    companyName: 'Horizon Visual Studios',
    industryType: 'Music Videos & Fashion Films',
    location: 'Delhi NCR, India',
    profilePicture: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    bio: 'Visual stylist director known for high‑fashion aesthetics and narrative music videos.',
  },
];

const projects = [
  {
    title: 'The Silent Canvas',
    description: 'Feature film exploring artistic obsession.',
    category: 'Film',
    budget: 45000000,
    location: 'Mumbai, India',
    directorEmail: directors[0].email,
  },
  {
    title: 'Shadows of Daryaganj',
    description: 'Web series set in historic Delhi alleyways.',
    category: 'Web Series',
    budget: 28000000,
    location: 'Delhi, India',
    directorEmail: directors[1].email,
  },
  {
    title: 'Project Velocidad',
    description: 'High‑energy commercial action piece.',
    category: 'Commercial',
    budget: 8500000,
    location: 'Bengaluru, India',
    directorEmail: directors[2].email,
  },
  {
    title: 'Echoes in the Monsoon',
    description: 'Festival‑circuit indie drama.',
    category: 'Film',
    budget: 12000000,
    location: 'Chennai, India',
    directorEmail: directors[3].email,
  },
  {
    title: 'Neon Mirage',
    description: 'Stylized music video for emerging artist.',
    category: 'Music Video',
    budget: 3500000,
    location: 'Mumbai, India',
    directorEmail: directors[4].email,
  },
];

async function createOrUpdateUser(user) {
  let uid;
  try {
    const existing = await auth.getUserByEmail(user.email);
    uid = existing.uid;
    console.log(`User already exists: ${user.email}`);
  } catch (e) {
    const newUser = await auth.createUser({
      email: user.email,
      password: DEFAULT_PASSWORD,
      displayName: user.fullName,
    });
    uid = newUser.uid;
    console.log(`Created user: ${user.email}`);
    fs.appendFileSync(CREDENTIALS_FILE, `${user.email}\t${DEFAULT_PASSWORD}\n`);
  }

  // Users collection
  await db.collection('users').doc(uid).set(
    {
      email: user.email,
      role: user.role,
      isVerified: true,
      verificationStatus: 'verified',
      plan: 'studio_pro',
      subscriptionStatus: 'active',
    },
    { merge: true }
  );

  // Profiles collection
  const profileData = {
    user: uid,
    fullName: user.fullName,
    bio: user.bio || `${user.fullName} professional ${user.role}.`,
    profilePicture: user.profilePicture,
    location: user.location,
    skills: user.skills || [],
    experienceYears: user.experienceYears || 0,
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
    profileData.talentCategory = user.talentCategory;
    profileData.physicalMetrics = {};
    profileData.portfolio = user.portfolio || [];
  } else {
    profileData.companyName = user.companyName;
    profileData.industryType = user.industryType;
    profileData.portfolio = [];
    profileData.bio = user.bio;
  }
  await db.collection('profiles').doc(uid).set(profileData, { merge: true });
  return uid;
}

async function createProject(project, directorUid) {
  const docRef = db.collection('projects').doc();
  await docRef.set({
    director: directorUid,
    title: project.title,
    description: project.description,
    category: project.category,
    budget: project.budget,
    location: project.location,
    status: 'open',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log(`Created project: ${project.title}`);
}

(async () => {
  // Reset credentials file
  fs.writeFileSync(CREDENTIALS_FILE, 'Email\tPassword\n', { flag: 'w' });
  const directorUids = {};
  for (const dir of directors) {
    const uid = await createOrUpdateUser(dir);
    directorUids[dir.email] = uid;
  }
  for (const tal of talents) {
    await createOrUpdateUser(tal);
  }
  for (const proj of projects) {
    const dirUid = directorUids[proj.directorEmail];
    if (dirUid) await createProject(proj, dirUid);
  }
  console.log('Seeding complete. Credentials saved at', CREDENTIALS_FILE);
  process.exit(0);
})();
