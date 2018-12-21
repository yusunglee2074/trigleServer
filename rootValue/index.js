const fs = require('fs');

let exportObj= {}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach((file) => {
    let tempObj = require('./' + file);
    for (let key in tempObj) {
      exportObj[key] = tempObj[key];
    }
  })

module.exports = exportObj;
