const fs = require("fs");
const pdf = require("pdf-parse");

async function extract(file, label) {
  try {
    const dataBuffer = fs.readFileSync(file);
    const data = await pdf(dataBuffer);
    console.log(`\n========== ${label} ==========`);
    console.log(data.text.substring(0, 15000));
    console.log(`\n[Total pages: ${data.numpages}, chars: ${data.text.length}]`);
  } catch (e) {
    console.error(`Error reading ${file}:`, e.message);
  }
}

(async () => {
  await extract("public/roadmap.pdf", "ROADMAP");
  await extract("public/atlas-use-case-library.pdf", "USE CASE LIBRARY");
  await extract("public/atlas-glossary.pdf", "GLOSSARY");
  await extract("public/personas.pdf", "PERSONAS");
})();