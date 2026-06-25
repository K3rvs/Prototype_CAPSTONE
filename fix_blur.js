const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Student') && f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace blur classes that are not guarded
  // For simplicity, we just remove them from the string completely
  let newContent = content
    .replace(/blur-\w+/g, '')
    .replace(/backdrop-blur-\w+/g, '');
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
