const fs = require('fs');
const path = require('path');

const walk = function(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
};

const files = [...walk('app'), ...walk('components'), ...walk('lib')];

const replacements = [
    { from: /ML Prediction/g, to: "Predictive Risk Engine" },
    { from: /AI Prediction/g, to: "Risk Prediction" },
    { from: /SHAP/g, to: "Risk Attribution" },
    { from: /Automated Rebooking/g, to: "AI-Assisted Recovery" },
    { from: /Optimization Engine/g, to: "Recovery Recommendation Engine" },
    { from: /machine learning/gi, to: "predictive risk" },
    { from: /Machine Learning/g, to: "Predictive Risk" },
    { from: /trained model/gi, to: "risk model" },
    { from: /deep learning/gi, to: "heuristic engine" },
    { from: /autonomous optimization/gi, to: "AI-Assisted Recovery" },
    { from: /autonomous rebooking/gi, to: "AI-Assisted Recovery" },
    { from: /real airline passenger/gi, to: "simulated passenger" },
    { from: /production airline control/gi, to: "simulated airline control" },
    { from: /100%/g, to: "Simulation" }
];

let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated:', file);
        changedCount++;
    }
});

console.log('Total files changed:', changedCount);
