/**
 * Removes only the deterministic public-showcase records created by
 * importPublicShowcaseProfiles.js. It never touches Firebase Auth users.
 *
 * Usage:
 *   node server/scripts/removePublicShowcaseProfiles.js --check
 *   node server/scripts/removePublicShowcaseProfiles.js --confirm
 */
import { db } from '../lib/firebaseAdmin.js';
import { logger } from '../lib/logger.js';

const expectedIds = [
  'showcase-director-zoya-akhtar',
  'showcase-director-anurag-kashyap',
  'showcase-director-ss-rajamouli',
  'showcase-director-sanjay-leela-bhansali',
  'showcase-director-neeraj-ghaywan',
  'showcase-talent-alia-bhatt',
  'showcase-talent-manoj-bajpayee',
  'showcase-talent-nawazuddin-siddiqui',
  'showcase-talent-radhika-apte',
  'showcase-talent-sobhita-dhulipala',
  'showcase-talent-vicky-kaushal',
  'showcase-talent-shreya-ghoshal',
  'showcase-talent-arijit-singh',
  'showcase-talent-ar-rahman',
  'showcase-talent-ravi-varman',
];

const mode = process.argv[2];
if (!['--check', '--confirm'].includes(mode)) {
  logger.error('Use --check or --confirm.');
  process.exitCode = 1;
} else {
  try {
    const refs = expectedIds.map((id) => db.collection('profiles').doc(id));
    const docs = await db.getAll(...refs);
    const matches = docs.filter((doc) => doc.exists && doc.data().accountType === 'public_showcase');

    logger.info({ found: matches.length, ids: matches.map((doc) => doc.id) }, 'Matched public showcase profiles');

    if (mode === '--confirm') {
      const batch = db.batch();
      matches.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      logger.info({ deleted: matches.length }, 'Public showcase profiles removed');
    }
  } catch (error) {
    logger.error({ err: error }, 'Public showcase removal failed');
    process.exitCode = 1;
  }
}
