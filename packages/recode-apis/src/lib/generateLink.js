const {numToBase64} = require("./numToB64");

function generateLink () {
  const numVal = Math.floor(Math.random() * 8999999999) + 1000000000;
  return [numToBase64(numVal),numVal];
}

module.exports = generateLink;
