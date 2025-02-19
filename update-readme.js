import { execSync } from 'child_process';
import fs from 'fs';

// Exécuter les tests et capturer la sortie
const testOutput = execSync('npm test', { encoding: 'utf-8' });

// Mettre à jour le README.md avec les résultats des tests
const readmePath = 'README.md';
let readmeContent = fs.readFileSync(readmePath, 'utf-8');

// Remplacer ou ajouter une section de résultats de tests
const testResultsSection = `## Test Results\n\n\`\`\`\n${testOutput}\n\`\`\``;
readmeContent = readmeContent.replace(/## Test Results[\s\S]*?\`\`\`/, testResultsSection);

// Écrire les modifications dans le fichier README.md
fs.writeFileSync(readmePath, readmeContent);

console.log('README.md updated with test results.');
