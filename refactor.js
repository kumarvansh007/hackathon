const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

const replacements = [
  { search: /AUTOMATED RECOVERY PLAN ENGINE/g, replace: 'AI-ASSISTED RECOVERY PLAN ENGINE' },
  { search: /Approve All Rebookings/g, replace: 'REVIEW & APPROVE' },
  { search: /"APPLIED"/g, replace: '"READY FOR APPROVAL"' },
  { search: /PNR issued for Captain Rohan Sharma/g, replace: 'PNR DEMO-RT-9683 issued for Aarav Mehta (Simulated)' },
  { search: /Captain Rohan Sharma/g, replace: 'Aarav Mehta (Simulated)' },
  { search: /Explainable AI Attribution \(SHAP-calibrated\)/g, replace: 'Risk Contribution (Rule-Based Simulation)' },
  { search: /AI Engine v2\.0 Live/g, replace: 'AI DECISION ENGINE' },
  { search: /LIVE AIRSPACE TELEMETRY/g, replace: 'DEMO TELEMETRY' },
  { search: /100% Probability/g, replace: 'SIMULATION OUTPUT: 100%' }
];

['app', 'components', 'lib'].forEach(folder => {
  walk(path.join(__dirname, folder), (filePath) => {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      let changed = false;
      replacements.forEach(r => {
        if (content.match(r.search)) {
          content = content.replace(r.search, r.replace);
          changed = true;
        }
      });
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
      }
    }
  });
});
