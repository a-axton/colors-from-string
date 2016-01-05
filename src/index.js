/* eslint-disable */
const csscolors = require('json!css-color-names');
/* eslint-enable */

const types = {
  hsl: new RegExp(/(hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\))/gi),
  hsla: new RegExp(/(hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d]+)\))/gi),
  rgba: new RegExp(/(rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([\d]+)\))/gi),
  rgb: new RegExp(/(rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}))\)/gi),
  hex: new RegExp(/(#[0-9a-f]{6}|#[0-9a-f]{3})/gi),
  keyword: new RegExp('\\b(' + Object.keys(csscolors).join('|') + ')\\b', 'gi')
};

const execRegex = (re, str) => {
  var match;
  var results = [];
  re.lastIndex = 0;
  while ((match = re.exec(str)) !== null) {
    results.push({
      match: match[0],
      index: match.index
    });
  }
  return results;
};

const getMatches = (str) => ({
  hsl: types.hsl.test(str) ? execRegex(types.hsl, str) : null,
  hsla: types.hsla.test(str) ? execRegex(types.hsla, str) : null,
  rgba: types.rgba.test(str) ? execRegex(types.rgba, str) : null,
  rgb: types.rgb.test(str) ? execRegex(types.rgb, str) : null,
  hex: types.hex.test(str) ? execRegex(types.hex, str) : null,
  keyword: types.keyword.test(str) ? execRegex(types.keyword, str) : null
});

module.exports = (str) => {
  if (!str) { return; }
  else if (typeof str !== 'string') {
    throw new Error('You must provide a string');
  }
  let matches = getMatches(str);
  let results = [];
  for (let key in matches) {
    let match = matches[key];
    if (match) {
      match.forEach((result) => {
        result.type = key;
        return results.push(result);
      });
    }
  }
  return results.sort((a, b) => (a.index - b.index));
};
