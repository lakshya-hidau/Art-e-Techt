import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
const rawKey = process.env.FIREBASE_ADMIN_KEY;
if (!rawKey) {
  console.error('FIREBASE_ADMIN_KEY not set');
  process.exit(1);
}
const length = rawKey.length;
const firstChar = rawKey[0];
const lastChar = rawKey[rawKey.length - 1];
const newlineCount = (rawKey.match(/\n/g) || []).length;
const escapedNewlineCount = (rawKey.match(/\\\\n/g) || []).length; // matches literal \n
console.log('Length:', length);
console.log('First char code:', firstChar.charCodeAt(0));
console.log('Last char code:', lastChar.charCodeAt(0));
console.log('Actual newlines (\n) count:', newlineCount);
console.log('Escaped newlines (\\n) count:', escapedNewlineCount);
