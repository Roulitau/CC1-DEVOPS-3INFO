import { execSync } from 'child_process';
import fs from 'fs';

const readmePath = 'README.md';

try {
  const testOutput = execSync('npm test', { encoding: 'utf-8' });
  
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const successMessage = "✅ Les tests ont réussi !";
  
  const testResultsSection = `## Résultats des tests\n\n${successMessage}\n\n\`\`\`\n${testOutput}\n\`\`\``;
  readmeContent = readmeContent.replace(/## Résultats des tests[\s\S]*?\`\`\`/, testResultsSection) || readmeContent + '\n' + testResultsSection;

  fs.writeFileSync(readmePath, readmeContent);
  console.log(successMessage);
} catch (error) {
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const failureMessage = "❌ Les tests ont échoué !";

  const testResultsSection = `## Résultats des tests\n\n${failureMessage}\n\n\`\`\`\n${error.stdout || error.message}\n\`\`\``;
  readmeContent = readmeContent.replace(/## Résultats des tests[\s\S]*?\`\`\`/, testResultsSection) || readmeContent + '\n' + testResultsSection;
  
  fs.writeFileSync(readmePath, readmeContent);
  console.error(failureMessage);
  process.exit(1);
}