import fs from 'fs';
import path from 'path';

const dir = 'd:/Collage Lakshya Hidau/talentconnect/client/src/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix text colors
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(text-(?:slate|gray|zinc)-900)(?!.*?dark:text-)(.*?[\"\'\`\}])/g, '$1$2 dark:text-primary-text$3');
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(text-(?:slate|gray|zinc)-800)(?!.*?dark:text-)(.*?[\"\'\`\}])/g, '$1$2 dark:text-text-primary$3');
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(text-(?:slate|gray|zinc)-700)(?!.*?dark:text-)(.*?[\"\'\`\}])/g, '$1$2 dark:text-text-primary$3');
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(text-(?:slate|gray|zinc)-600)(?!.*?dark:text-)(.*?[\"\'\`\}])/g, '$1$2 dark:text-text-secondary$3');

  // Fix bg-surface missing dark mode background
  content = content.replace(/(class(?:Name)?=[\"\'\`{].*?)(bg-surface)(?!.*?dark:bg-)(.*?[\"\'\`\}])/g, '$1$2 dark:bg-card-dark$3');

  fs.writeFileSync(filePath, content, 'utf-8');
});
console.log('Processed files successfully.');
