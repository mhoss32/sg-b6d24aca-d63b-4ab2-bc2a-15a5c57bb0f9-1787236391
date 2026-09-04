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

function parseMarkdown(filename) {
  const content = fs.readFileSync(path.join('public', filename), 'utf8');
  
  // Extract description from Executive Summary
  const execMatch = content.match(/### Executive Summary\s*\n\s*\n([^\n]+)/);
  const description = execMatch ? execMatch[1].trim() : '';
  
  // Extract personas
  const personaSection = content.match(/### Primary Personas\s*\n\s*\n([\s\S]*?)(?=###|## Part)/);
  const personas = [];
  if (personaSection) {
    const lines = personaSection[1].split('\n').filter(l => l.trim().startsWith('-'));
    for (const line of lines) {
      const match = line.match(/-\s*\*\*([^*]+)\*\*\s*—\s*([^:(]+)/);
      if (match) {
        const name = match[1].trim();
        const role = match[2].trim();
        const engagement = line.includes('(primary)') || line.includes('(primary):') ? 'Primary' : 'Secondary';
        personas.push({ name, role, engagement });
      }
    }
  }
  
  // Extract flow table
  const flowMatch = content.match(/### As-Is \/ To-Be Flow\s*\n\s*\n([\s\S]*?)(?=###|## Part)/);
  const asIsStages = [];
  const toBeStages = [];
  const asIsMarkers = [];
  const toBeMarkers = [];
  
  if (flowMatch) {
    const tableLines = flowMatch[1].split('\n').filter(l => l.startsWith('|') && !l.includes('---'));
    // Skip header
    for (let i = 1; i < tableLines.length; i++) {
      const line = tableLines[i];
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length >= 3) {
        const stepCell = cells[0];
        const asIsCell = cells[1];
        const toBeCell = cells[cells.length - 1];
        
        const stepMatch = stepCell.match(/\*\*(\d+)\s*—\s*([^*]+)\*\*/);
        const stageName = stepMatch ? stepMatch[2].trim() : stepCell.replace(/\*\*/g, '').trim();
        
        asIsStages.push({ name: stageName, description: asIsCell.replace(/\*\*/g, '') });
        toBeStages.push({ name: stageName, description: toBeCell.replace(/\*\*/g, '') });
      }
    }
  }
  
  // Extract key pain points
  const painMatch = content.match(/### Key Pain Points\s*\n\s*\n([\s\S]*?)(?=###|## Part)/);
  const painPoints = [];
  if (painMatch) {
    const lines = painMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    for (const line of lines) {
      painPoints.push(line.replace(/^-\s*/, '').trim());
    }
  }
  
  // Extract key wow moments
  const wowMatch = content.match(/### Key Wow Moments\s*\n\s*\n([\s\S]*?)(?=###|## Part)/);
  const wowMoments = [];
  if (wowMatch) {
    const lines = wowMatch[1].split('\n').filter(l => l.trim().startsWith('-'));
    for (const line of lines) {
      wowMoments.push(line.replace(/^-\s*/, '').trim());
    }
  }
  
  // Extract external integrations
  const externalTouchpoints = [];
  
  // Look for handoff sections
  const handoffRegex = /#### (Terraform|Bob PPZ|Concert4Z) Handoff\s*\n\s*\n([\s\S]*?)(?=####|###|## Part|$)/g;
  let handoffMatch;
  while ((handoffMatch = handoffRegex.exec(content)) !== null) {
    const product = handoffMatch[1];
    const section = handoffMatch[2];
    const steps = [];
    const stepMatches = section.matchAll(/(\d+)\.\s*\*\*([^*]+)\*\*\s*—\s*([^\n]+)/g);
    for (const sm of stepMatches) {
      steps.push({ label: sm[2].trim(), description: sm[3].trim() });
    }
    if (steps.length > 0) {
      externalTouchpoints.push({
        type: 'handoff',
        product,
        title: `${product} Handoff`,
        steps,
        stageIndex: 0
      });
    }
  }
  
  // Look for enrichment sections
  const enrichmentRegex = /#### (Terraform|Bob PPZ|Concert4Z) Enrichment Touchpoint\s*\n\s*\n([^\n]+)/g;
  let enrichmentMatch;
  while ((enrichmentMatch = enrichmentRegex.exec(content)) !== null) {
    const product = enrichmentMatch[1];
    const summary = enrichmentMatch[2].trim();
    externalTouchpoints.push({
      type: 'enrichment',
      product,
      title: `${product} Enrichment Touchpoint`,
      summary,
      stageIndex: 0
    });
  }
  
  return {
    description,
    personas,
    asIsStages,
    toBeStages,
    painPoints,
    wowMoments,
    externalTouchpoints
  };
}

// Generate markers from pain points and wow moments
function generateMarkers(painPoints, wowMoments, stages, isAsIs) {
  const markers = [];
  const type = isAsIs ? 'pain' : 'gain';
  
  // Map pain points to stages
  for (let i = 0; i < painPoints.length && i < stages.length; i++) {
    const pp = painPoints[i];
    markers.push({
      persona: 'Zach',
      type,
      title: isAsIs ? `Pain Point — ${pp.substring(0, 60)}` : `Wow Moment — ${pp.substring(0, 60)}`,
      description: pp,
      stageIndex: Math.min(i, stages.length - 1)
    });
  }
  
  return markers;
}

let output = '';

for (const { id, file, label } of files) {
  const data = parseMarkdown(file);
  
  output += `  "${id}": {\n`;
  output += `    id: "${id}",\n`;
  output += `    label: "${label}",\n`;
  output += `    description: "${data.description.replace(/"/g, '\\"')}",\n`;
  output += `    personas: [\n`;
  for (const p of data.personas) {
    output += `      { name: "${p.name}", role: "${p.role.replace(/"/g, '\\"')}", engagement: "${p.engagement}" },\n`;
  }
  output += `    ],\n`;
  
  output += `    asIs: {\n`;
  output += `      title: "Current State",\n`;
  output += `      stages: [\n`;
  for (const s of data.asIsStages) {
    output += `        { name: "${s.name.replace(/"/g, '\\"')}", description: "${s.description.replace(/"/g, '\\"')}" },\n`;
  }
  output += `      ],\n`;
  output += `      markers: [\n`;
  const asIsMarkers = generateMarkers(data.painPoints, [], data.asIsStages, true);
  for (const m of asIsMarkers.slice(0, 8)) {
    output += `        { persona: "${m.persona}", type: "${m.type}", title: "${m.title.replace(/"/g, '\\"')}", description: "${m.description.replace(/"/g, '\\"')}", stageIndex: ${m.stageIndex} },\n`;
  }
  output += `      ],\n`;
  output += `    },\n`;
  
  output += `    toBe: {\n`;
  output += `      title: "Desired Outcome",\n`;
  output += `      stages: [\n`;
  for (const s of data.toBeStages) {
    output += `        { name: "${s.name.replace(/"/g, '\\"')}", description: "${s.description.replace(/"/g, '\\"')}" },\n`;
  }
  output += `      ],\n`;
  output += `      markers: [\n`;
  const toBeMarkers = generateMarkers([], data.wowMoments, data.toBeStages, false);
  for (const m of toBeMarkers.slice(0, 8)) {
    output += `        { persona: "${m.persona}", type: "${m.type}", title: "${m.title.replace(/"/g, '\\"')}", description: "${m.description.replace(/"/g, '\\"')}", stageIndex: ${m.stageIndex} },\n`;
  }
  output += `      ],\n`;
  
  if (data.externalTouchpoints.length > 0) {
    output += `      externalTouchpoints: [\n`;
    for (const tp of data.externalTouchpoints) {
      if (tp.type === 'handoff') {
        output += `        {\n`;
        output += `          type: "handoff",\n`;
        output += `          product: "${tp.product}",\n`;
        output += `          title: "${tp.title}",\n`;
        output += `          steps: [\n`;
        for (const s of tp.steps) {
          output += `            { label: "${s.label.replace(/"/g, '\\"')}", description: "${s.description.replace(/"/g, '\\"')}" },\n`;
        }
        output += `          ],\n`;
        output += `          stageIndex: ${tp.stageIndex},\n`;
        output += `        },\n`;
      } else {
        output += `        {\n`;
        output += `          type: "enrichment",\n`;
        output += `          product: "${tp.product}",\n`;
        output += `          title: "${tp.title}",\n`;
        output += `          summary: "${tp.summary.replace(/"/g, '\\"')}",\n`;
        output += `          stageIndex: ${tp.stageIndex},\n`;
        output += `        },\n`;
      }
    }
    output += `      ],\n`;
  }
  
  output += `    },\n`;
  output += `    capabilities: [\n`;
  output += `      { name: "System Discovery", timeline: "GA", description: "Automated environment inventory" },\n`;
  output += `    ],\n`;
  output += `  },\n`;
}

fs.writeFileSync('scripts/usecase-output.txt', output);
console.log('Generated use case data to scripts/usecase-output.txt');