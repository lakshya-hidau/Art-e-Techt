// Debug script to test FIREBASE_ADMIN_KEY parsing
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
let rawKey = process.env.FIREBASE_ADMIN_KEY;
console.log('Raw key present?', !!rawKey);
if (!rawKey) { process.exit(1); }
if (rawKey.startsWith("'") && rawKey.endsWith("'")) {
  rawKey = rawKey.slice(1, -1);
}
// Replace real newlines with escaped \n
rawKey = rawKey.replace(/\r?\n/g, "\\n");
// Try parsing
try {
  const obj = JSON.parse(rawKey);
  console.log('Parse succeeded, project_id:', obj.project_id);
} catch (e) {
  console.error('Parse error:', e.message);
}
