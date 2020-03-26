module.exports = function(inputText, shift, action) {
  const a_CODE = 97;
  const z_CODE = 122;
  const A_CODE = 65;
  const Z_CODE = 90;

  return inputText
    .split('')
    .map(value => {
      let nextCharCode = value.charCodeAt(0);
      if (value.charCodeAt(0) >= a_CODE && value.charCodeAt(0) <= z_CODE) {
        if (action === 'encode') {
          nextCharCode =
            value.charCodeAt(0) + shift > z_CODE
              ? a_CODE + shift - (z_CODE - value.charCodeAt(0) + 1)
              : value.charCodeAt(0) + shift;
        }
        if (action === 'decode') {
          nextCharCode =
            value.charCodeAt(0) - shift < a_CODE
              ? z_CODE - (shift - (value.charCodeAt(0) - a_CODE + 1))
              : value.charCodeAt(0) - shift;
        }
      }
      if (value.charCodeAt(0) >= A_CODE && value.charCodeAt(0) <= Z_CODE) {
        if (action === 'encode') {
          nextCharCode =
            value.charCodeAt(0) + shift > Z_CODE
              ? A_CODE + shift - (Z_CODE - value.charCodeAt(0) + 1)
              : value.charCodeAt(0) + shift;
        }
        if (action === 'decode') {
          nextCharCode =
            value.charCodeAt(0) - shift < A_CODE
              ? Z_CODE - (shift - (value.charCodeAt(0) - A_CODE + 1))
              : value.charCodeAt(0) - shift;
        }
      }
      return String.fromCharCode(nextCharCode);
    })
    .join('');
};
