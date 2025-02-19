import { execSync } from 'child_process';
import fs from 'fs';

const readmePath = 'README.md';

try {
  const testOutput = execSync('npm test', { encoding: 'utf-8' });
  
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const successMessage = "✅ Les tests ont réussi !";
  
  const testResultsSection = `## Test Results\n\n${successMessage}\n\n\`\`\`\n${testOutput}\n\`\`\``;
  readmeContent = readmeContent.replace(/## Test Results[\s\S]*?\`\`\`/, testResultsSection) || readmeContent + '\n' + testResultsSection;

  fs.writeFileSync(readmePath, readmeContent);
  console.log(successMessage);
} catch (error) {
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const failureMessage = "❌ Les tests ont échoué !";

  const testResultsSection = `## Test Results\n\n${failureMessage}\n\n\`\`\`\n${error.stdout || error.message}\n\`\`\``;
  readmeContent = readmeContent.replace(/## Test Results[\s\S]*?\`\`\`/, testResultsSection) || readmeContent + '\n' + testResultsSection;
  
  fs.writeFileSync(readmePath, readmeContent);
  console.error(failureMessage);
  process.exit(1);
}