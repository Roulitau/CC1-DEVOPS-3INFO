import { execSync } from 'child_process';
import fs from 'fs';

try {
  const testOutput = execSync('npm test', { encoding: 'utf-8' });

  const readmePath = 'README.md';
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');

  const testResultsSection = `## Test Results\n\n\`\`\`\n${testOutput}\n\`\`\``;
  readmeContent = readmeContent.replace(/## Test Results[\s\S]*?\`\`\`/, testResultsSection);

  fs.writeFileSync(readmePath, readmeContent);

} catch (error) {
  process.exit(1);
}
