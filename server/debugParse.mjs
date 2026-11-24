import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
let rawKey = process.env.FIREBASE_ADMIN_KEY;
console.log('Raw key present?', !!rawKey);
if (!rawKey) { process.exit(1); }
if (rawKey.startsWith("'") && rawKey.endsWith("'")) {
  rawKey = rawKey.slice(1, -1);
}
rawKey = rawKey.replace(/\r?\n/g, "\\n");
console.log('Snippet after replace', rawKey.slice(0,200));
try {
  const obj = JSON.parse(rawKey);
  console.log('Parse succeeded, project_id:', obj.project_id);
} catch (e) {
  console.error('Parse error:', e.message);
}
