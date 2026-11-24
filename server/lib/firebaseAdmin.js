// Firebase Admin initialization with robust multiline SERVICE_ACCOUNT handling
// This file emits safe diagnostics (no secrets).

import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load variables from server/.env (may contain a multiline FIREBASE_ADMIN_KEY)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

let serviceAccount = null;
if (process.env.FIREBASE_ADMIN_KEY && process.env.FIREBASE_ADMIN_KEY !== 'your_admin_key_json_string') {
  // Retrieve raw key value
  let rawKey = process.env.FIREBASE_ADMIN_KEY;
  // Strip surrounding single quotes if present (common when .env value is quoted)
  if (rawKey.startsWith("'") && rawKey.endsWith("'")) {
    rawKey = rawKey.slice(1, -1);
  }
  // Escape newlines only inside the private_key field (the key may contain real newlines)
  rawKey = rawKey.replace(/("private_key"\s*:\s*")(.*?)"/s, (_, p1, p2) => {
    const escaped = p2.replace(/\n/g, '\\n');
    return p1 + escaped + '"';
  });
  // Try parsing as JSON; fallback to Base64‑encoded JSON
  try {
    serviceAccount = JSON.parse(rawKey);
  } catch (e) {
    try {
      const decoded = Buffer.from(rawKey, 'base64').toString('utf-8');
      serviceAccount = JSON.parse(decoded);
    } catch (e2) {
      console.error('CRITICAL: Error parsing FIREBASE_ADMIN_KEY. Ensure it is valid JSON or Base64‑encoded JSON.');
      console.error('Parse error:', e2.message);
    }
  }
  // Convert escaped \n back to real newlines for the Admin SDK
  if (serviceAccount && serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }
}

// Initialise Firebase Admin app if not already done and we have a valid service account
if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
    console.log('Firebase Admin initialized successfully');
  } else {
    console.error('CRITICAL: Firebase Admin could not be initialized. Missing or invalid FIREBASE_ADMIN_KEY.');
  }
}

let db = undefined;
let storage = undefined;
let auth = undefined;

if (admin.apps.length > 0) {
  db = admin.firestore();
  db.settings({ ignoreUndefinedProperties: true });
  storage = admin.storage();
  auth = admin.auth();
}

// ---- Diagnostics (safe, no secrets) ----
console.log('Environment loaded: YES');
console.log(`Credential variable present: ${process.env.FIREBASE_ADMIN_KEY ? 'YES' : 'NO'}`);
console.log(`JSON parsed: ${serviceAccount ? 'YES' : 'NO'}`);
if (serviceAccount && serviceAccount.project_id) {
  console.log(`Project ID: ${serviceAccount.project_id}`);
}
console.log(`Admin initialized: ${admin.apps.length > 0 ? 'YES' : 'NO'}`);
console.log(`Auth available: ${auth ? 'YES' : 'NO'}`);
console.log(`Firestore available: ${db ? 'YES' : 'NO'}`);

export { db, storage, auth, admin };