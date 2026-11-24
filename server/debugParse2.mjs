import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
let rawKey = process.env.FIREBASE_ADMIN_KEY;
if (!rawKey) { console.error('no key'); process.exit(1); }
if (rawKey.startsWith("'") && rawKey.endsWith("'")) rawKey = rawKey.slice(1,-1);
rawKey = rawKey.replace(/\r?\n/g, "\\n");
console.log('First 20 chars rawKey:', rawKey.slice(0,20));
console.log('Char codes:', Array.from(rawKey.slice(0,5)).map(c=>c.charCodeAt(0)));
try{JSON.parse(rawKey); console.log('Parse ok');}catch(e){console.error('Parse error', e.message);}
