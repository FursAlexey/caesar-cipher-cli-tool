const fs = require('fs').promises;
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

(() => {
  fs.readFile(argsMap.get('input'), 'utf8')
    .then(data => {
      const caesarCipherData = caesarCipherTransform(
        data,
        +argsMap.get('shift'),
        argsMap.get('action')
      );
      fs.open(argsMap.get('output'), 'r')
        .then(() => {
          fs.writeFile(argsMap.get('output'), caesarCipherData);
        })
        .catch(err => {
          console.error(err.message);

          process.stdout.write(caesarCipherData);
        });
    })
    .catch(err => {
      console.log(err.message);
      process.stdin.setEncoding('utf8');
      process.stdin.addListener('readable', () => {
        let data;
        while ((data = process.stdin.read()) !== null) {
          new Promise((resolve, reject) => {
            data = caesarCipherTransform(
              data,
              +argsMap.get('shift'),
              argsMap.get('action')
            );
            resolve(data);
          }).then(data => {
            fs.open(argsMap.get('output'), 'r')
              .then(() => {
                fs.writeFile(argsMap.get('output'), data);
              })
              .catch(err => {
                console.log(err.message);

                process.stdout.write(data);
              });
          });
        }
      });
    });
})();
