const fs = require('fs');
let code = fs.readFileSync('app/monitor/page.tsx', 'utf8');
code = code.replace(/href=\{\{\/cascade\?flight=\} \+/g, "href={'/cascade?flight=' +");
code = code.replace(/href=\{\{\/recovery\?flight=\} \+/g, "href={'/recovery?flight=' +");
fs.writeFileSync('app/monitor/page.tsx', code, 'utf8');
