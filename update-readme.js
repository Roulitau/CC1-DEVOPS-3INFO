import { execSync } from 'child_process';
import fs from 'fs';

try {
  const testOutput = execSync('npm test', { encoding: 'utf-8' });

  const readmePath = 'README.md';
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Supprimer tout le contenu en dessous de ## Test Results
  readmeContent = readmeContent.replace(/## Test Results[\s\S]*$/, '');

  // Ajouter les nouveaux résultats des tests
  const testResultsSection = `## Test Results\n\n\`\`\`\n${testOutput}\n\`\`\``;
  readmeContent += testResultsSection;

  fs.writeFileSync(readmePath, readmeContent);

} catch (error) {
  process.exit(1);
}
