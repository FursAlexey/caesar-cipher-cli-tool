module.exports = function (args) {
  try {
    if (!args.get('shift')) throw new Error('-shift parameter required');
    if (!args.get('action')) throw new Error('-action parameter required');
    if (isNaN(parseInt(args.get('shift')))) throw new Error('Incorrect -shift parameter');
    if (args.get('action') !== 'encode' && args.get('action') !== 'decode') throw new Error('Incorrect -action parameter')
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};
