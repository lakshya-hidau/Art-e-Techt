import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'client/src/pages/Login.jsx',
  'client/src/pages/AdminLogin.jsx',
  'client/src/pages/RegisterActor.jsx',
  'client/src/pages/RegisterDirector.jsx',
  'client/src/pages/FindTalent.jsx',
  'client/src/pages/FindWork.jsx',
  'client/src/pages/Productions.jsx',
  'client/src/pages/PrivacyPolicy.jsx',
  'client/src/pages/TermsAndConditions.jsx',
  'client/src/pages/HelpSupport.jsx',
  'client/src/pages/ContactUs.jsx',
  'client/src/pages/ArtistGuidelines.jsx',
  'client/src/pages/SuccessStories.jsx',
  'client/src/pages/NotFound.jsx',
];

for (const relPath of filesToUpdate) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace text instances
  content = content.replace(/TalentConnect/g, 'Art-e-techt');
  content = content.replace(/TALENTCONNECT/g, 'ART-E-TECHT');
  content = content.replace(/India's Leading Talent Platform/g, 'Where Creative Talent Meets Opportunity');
  content = content.replace(/Where Global Talent Meets Opportunity/g, 'Where Creative Talent Meets Opportunity');
  content = content.replace(/Where World Cinema Talent Meets Opportunity/g, 'Where Creative Talent Meets Opportunity');

  // Update logo import if applicable
  if (content.includes('/TC Logo.png') && !content.includes('ArtLogo')) {
    content = `import ArtLogo from '../components/common/ArtLogo';\n` + content;
    content = content.replace(
      /<img[^>]*src=["']\/TC Logo\.png["'][^>]*\/>/g,
      '<ArtLogo showWordmark={true} />'
    );
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated:', relPath);
}

// Update server email templates footer and references
const emailTemplatesPath = path.resolve('server/lib/emailTemplates.js');
if (fs.existsSync(emailTemplatesPath)) {
  let emailContent = fs.readFileSync(emailTemplatesPath, 'utf8');
  emailContent = emailContent.replace(/TalentConnect/g, 'Art-e-techt');
  fs.writeFileSync(emailTemplatesPath, emailContent, 'utf8');
  console.log('Updated emailTemplates.js');
}

const emailPath = path.resolve('server/lib/email.js');
if (fs.existsSync(emailPath)) {
  let emailContent = fs.readFileSync(emailPath, 'utf8');
  emailContent = emailContent.replace(/TalentConnect/g, 'Art-e-techt');
  emailContent = emailContent.replace(/TC<\/span>/g, 'AT</span>');
  fs.writeFileSync(emailPath, emailContent, 'utf8');
  console.log('Updated email.js');
}
