const fs = require("fs");

const files = [
  "UC-01-vulnerability-remediation-spec.md",
  "UC-02-patch-management-spec.md",
  "UC-03-audit-and-compliance-spec.md",
  "UC-04-staff-onboarding-spec.md",
  "UC-05-application-discovery-and-dependency-analysis-spec.md",
  "UC-06-change-readiness-and-health-assessment-spec.md",
  "UC-07-application-change-management-spec.md",
  "UC-08-platform-upgrade-and-migration-spec.md",
  "UC-09-environment-parity-and-drift-control-spec.md",
  "UC-10-disaster-recovery-validation-spec.md",
  "UC-11-capacity-planning-and-performance-readiness-spec.md",
  "UC-12-application-modernization-spec.md",
  "UC-13-regulatory-change-response-spec.md",
  "UC-14-change-governance-and-traceability-spec.md",
];

const allData = {};

for (const f of files) {
  const content = fs.readFileSync("public/" + f, "utf8");
  const ucId = "uc-" + f.match(/UC-(\d+)/)[1].padStart(2, "0");

  console.log("\n========== " + ucId + " ==========");

  const data = { personas: [], current: [], desired: [] };

  // Extract personas
  const personaSection = content.match(/\*\*5\. Personas\*\*([\s\S]*?)(?=\*\*6\. Pillar|\*\*7\. Roadmap)/);
  if (personaSection) {
    const rows = personaSection[1].match(/\|\s*\*\*(Primary|Secondary)\*\*\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/g);
    if (rows) {
      for (const r of rows) {
        const m = r.match(/\|\s*\*\*(Primary|Secondary)\*\*\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
        if (m) {
          data.personas.push({
            engagementType: m[1].toLowerCase(),
            name: m[2].trim(),
            role: m[3].trim(),
          });
          console.log("PERSONA: " + m[1] + " | " + m[2].trim() + " | " + m[3].trim());
        }
      }
    }
  }

  // Extract current state
  const currentSection = content.match(/\*\*Current State \(Without Atlas\):\*\*([\s\S]*?)(?=\*\*Desired Outcome|\*\*Problem)/);
  if (currentSection) {
    const bullets = currentSection[1].match(/- .*/g);
    if (bullets) {
      data.current = bullets.slice(0, 6).map((b) => b.replace(/^- /, ""));
      bullets.slice(0, 6).forEach((b) => console.log("CURRENT: " + b));
    }
  }

  // Extract desired outcome
  const desiredSection = content.match(/\*\*Desired Outcome:\*\*([\s\S]*?)(?=---|\*\*Business Value)/);
  if (desiredSection) {
    const bullets = desiredSection[1].match(/- .*/g);
    if (bullets) {
      data.desired = bullets.slice(0, 6).map((b) => b.replace(/^- /, ""));
      bullets.slice(0, 6).forEach((b) => console.log("DESIRED: " + b));
    }
  }

  allData[ucId] = data;
}

fs.writeFileSync("extracted-data.json", JSON.stringify(allData, null, 2));
console.log("\n\nWrote extracted-data.json");