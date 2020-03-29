module.exports = function (args) {
  try {
    if (!args.get('shift')) {
      throw new Error('-shift parameter required');
    }
    if (!args.get('action')) {
      throw new Error('-action parameter required');
    }
    if (isNaN(parseInt(args.get('shift')))) {
      throw new Error('Incorrect -shift parameter');
    }
    if (args.get('action') !== 'encode' && args.get('action') !== 'decode') {
      throw new Error('Incorrect -action parameter');
    }
    if (!args.has('input')) {
      args.set('input', '');
    }
    if (!args.has('output')) {
      args.set('output', '');
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};
