// listRules.js
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync('./full-eslint.json', 'utf8'));
const groups = { error: [], warn: [], off: [] };

for (const [rule, setting] of Object.entries(cfg.rules)) {
  const level = Array.isArray(setting) ? setting[0] : setting;
  groups[level === 2 || level === 'error' ? 'error'
        : level === 1 || level === 'warn'  ? 'warn'
        : 'off'].push(rule);
}

for (const [lvl, list] of Object.entries(groups)) {
  console.log(`\n=== ${lvl.toUpperCase()} (${list.length}) ===`);
  list.sort().forEach(r => console.log(r));
}
