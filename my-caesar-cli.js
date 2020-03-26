const fs = require('fs');
const args = require('minimist')(process.argv.slice(2), {
  alias: {
    s: 'shift',
    i: 'input',
    o: 'output',
    a: 'action'
  },
  string: ['shift', 'input', 'output', 'action']
});

const checkRequiredInputArgs = require('./checkRequiredInputArgs');
const caesarCipherTransform = require('./caesarCipherTransform');

const argsMap = new Map(Object.entries(args));

checkRequiredInputArgs(argsMap);

let inputText = null;
let outputText = null;

try {
  const fd = fs.openSync(argsMap.get('input'), 'r');
  inputText = fs.readFileSync(fd, 'utf8').trim();
  outputText = caesarCipherTransform(
    inputText,
    +argsMap.get('shift'),
    argsMap.get('action')
  );
  fs.closeSync(fd);
} catch  (e) {
  console.error(e.code, e.message);
  inputText = process.stdin;
}

try {
  const fd = fs.openSync(argsMap.get('output'), 'w');
  fs.writeFileSync(fd, outputText);
  fs.closeSync(fd);
} catch (e) {
  console.error(e.code, e.message);
}
