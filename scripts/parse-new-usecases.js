const fs = require('fs');
const path = require('path');

const files = [
  { id: 'uc-01', file: 'UC-01-audit-and-compliance.md', label: 'UC-01: Audit and Compliance' },
  { id: 'uc-02', file: 'UC-02-staff-onboarding.md', label: 'UC-02: Staff Onboarding' },
  { id: 'uc-03', file: 'UC-03-regulatory-change-response.md', label: 'UC-03: Regulatory Change Response' },
  { id: 'uc-04', file: 'UC-04-change-readiness-and-health-assessment.md', label: 'UC-04: Change Readiness and Health Assessment' },
  { id: 'uc-05', file: 'UC-05-change-governance-and-traceability.md', label: 'UC-05: Change Governance and Traceability' },
  { id: 'uc-06', file: 'UC-06-patch-management.md', label: 'UC-06: Patch Management' },
  { id: 'uc-07', file: 'UC-07-application-change-management.md', label: 'UC-07: Application Change Management' },
  { id: 'uc-08', file: 'UC-08-platform-upgrade-and-migration.md', label: 'UC-08: Platform Upgrade and Migration' },
  { id: 'uc-09', file: 'UC-09-application-modernization.md', label: 'UC-09: Application Modernization' },
  { id: 'uc-10', file: 'UC-10-environment-parity-and-drift-control.md', label: 'UC-10: Environment Parity and Drift Control' },
  { id: 'uc-11', file: 'UC-11-disaster-recovery-validation.md', label: 'UC-11: Disaster Recovery Validation' },
  { id: 'uc-12', file: 'UC-12-capacity-planning-and-performance-readiness.md', label: 'UC-12: Capacity Planning and Performance Readiness' },
];

function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract description from Executive Summary
  const execSummary = content.match(/### Executive Summary\s+([^\n#]+(?:\n[^\n#]+)*)/);
  const description = execSummary ? execSummary[1].trim().split('\n')[0].trim() : '';
  
  // Extract personas
  const personas = [];
  const personaSection = content.match(/### Primary Personas\s+([\s\S]*?)(?=### |## |---|$)/);
  if (personaSection) {
    const personaMatches = personaSection[1].matchAll(/-\s+\*\*([^*]+)\*\*\s+—\s+([^(\n]+)(?:\s*\(([^)]+)\))?/g);
    for (const m of personaMatches) {
      const name = m[1].trim();
      const role = m[2].trim();
      const engagement = m[3] ? m[3].trim() : 'Secondary';
      personas.push({ name, role, engagement });
    }
  }
  
  // Extract lifecycle steps
  const lifecycle = content.match(/```\s*([\s\S]*?)\s*```/);
  let stages = [];
  if (lifecycle) {
    const steps = lifecycle[1].split('→').map(s => s.trim()).filter(s => s);
    stages = steps.map((name, i) => ({ name, description: '' }));
  }
  
  // Extract As-Is/To-Be flows from tables
  const asIsMarkers = [];
  const toBeMarkers = [];
  
  // Match As-Is pain tables
  const asIsMatches = content.matchAll(/\| Persona \| Pain Point \| Category \|[\s\S]*?(?=\n\n|\n## |\n### )/g);
  for (const m of asIsMatches) {
    const lines = m[0].split('\n').filter(l => l.startsWith('|') && !l.includes('---'));
    for (const line of lines.slice(1)) {
      const cols = line.split('|').map(c => c.trim()).filter(c => c);
      if (cols.length >= 3) {
        const persona = cols[0];
        const painText = cols[1];
        const category = cols[2];
        
        // Parse time/skill/pain
        let type = 'pain';
        let title = painText;
        let description = painText;
        
        if (category.includes('Lost Time')) {
          type = 'time';
          const timeMatch = painText.match(/⏱️\s*Lost Time\s*—\s*([^\n]+)/);
          title = timeMatch ? `Lost Time — ${timeMatch[1].trim()}` : painText.substring(0, 80);
        } else if (category.includes('Skill Gap')) {
          type = 'skill';
          const skillMatch = painText.match(/🔒\s*Skill Gap \/ Bottleneck\s*—\s*([^\n]+)/);
          title = skillMatch ? `Skill Gap / Bottleneck — ${skillMatch[1].trim()}` : painText.substring(0, 80);
        }
        
        asIsMarkers.push({ persona, type, title, description, stageIndex: 0 });
      }
    }
  }
  
  return {
    description,
    personas,
    stages,
    asIsMarkers,
    toBeMarkers
  };
}

for (const { id, file } of files) {
  const filePath = path.join('public', file);
  if (fs.existsSync(filePath)) {
    const data = parseMarkdown(filePath);
    console.log(`\n=== ${id} ===`);
    console.log('Description:', data.description.substring(0, 100));
    console.log('Personas:', data.personas.map(p => `${p.name}(${p.engagement})`).join(', '));
    console.log('Stages:', data.stages.map(s => s.name).join(' → '));
    console.log('As-Is markers:', data.asIsMarkers.length);
  } else {
    console.log(`MISSING: ${filePath}`);
  }
}