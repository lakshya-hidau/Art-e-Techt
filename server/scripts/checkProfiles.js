import { db } from '../lib/firebaseAdmin.js';
(async () => {
  const snap = await db.collection('profiles').get();
  console.log('Profiles count:', snap.size);
  process.exit(0);
})();