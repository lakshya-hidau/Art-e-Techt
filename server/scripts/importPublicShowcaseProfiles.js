/**
 * Imports a vetted public-showcase dataset into Firestore.
 *
 * This intentionally does NOT create Firebase Authentication users, credentials,
 * active casting projects, or verification records. A showcase profile is a
 * read-only directory entry and must not be presented as person-operated.
 *
 * Usage:
 *   node server/scripts/importPublicShowcaseProfiles.js "C:\\path\\profiles.json"
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { admin, db } from '../lib/firebaseAdmin.js';
import { logger } from '../lib/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datasetPath = process.argv[2];

if (!datasetPath) {
  logger.error('A dataset JSON path is required.');
  process.exitCode = 1;
} else if (!db || !admin.apps.length) {
  logger.error('Firebase Admin is not initialized; no data was imported.');
  process.exitCode = 1;
} else {
  try {
    const raw = await fs.readFile(path.resolve(datasetPath), 'utf8');
    const dataset = JSON.parse(raw);
    const records = [...(dataset.directors || []), ...(dataset.talents || [])];

    if (records.length !== 15 || records.some((record) => record.accountType !== 'public_showcase' || record.isDemo !== true)) {
      throw new Error('Expected exactly 15 explicit public_showcase demo records.');
    }

    const batch = db.batch();
    records.forEach((record) => {
      const portfolio = (record.portfolio || []).map((credit) => ({
        type: 'image',
        url: credit.media || null,
        title: credit.title,
        description: `${credit.role} • ${credit.category} • ${String(credit.date || '').slice(0, 4)}`,
        date: credit.date,
        datePrecision: credit.datePrecision,
        role: credit.role,
        category: credit.category,
        mediaSearchQuery: credit.mediaSearchQuery,
      }));
      const docId = `showcase-${record.id}`;
      batch.set(db.collection('profiles').doc(docId), {
        ...record,
        id: record.id,
        user: `showcase:${record.id}`,
        publicProfileId: docId,
        directoryStatus: 'public_showcase',
        portfolio,
        showcaseCredits: portfolio,
        showcaseProjects: record.projects || [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    });

    await batch.commit();
    logger.info({ count: records.length }, 'Public showcase profiles imported');
  } catch (error) {
    logger.error({ err: error }, 'Public showcase import failed');
    process.exitCode = 1;
  }
}
