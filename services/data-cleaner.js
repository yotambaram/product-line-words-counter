const _ = require("lodash");

const dataCleaner = (allTitlesArr, wordsStObj) => {
    let splitTitlesArr = [];
    let howMany = allTitlesArr.length
    for (let i = 0; i < allTitlesArr.length; i++) {
      // TODO: wordsStObj[el] < 2 - > use statics to delete (%) 
      _.remove(allTitlesArr[i], function (el) {
        return el === "" || wordsStObj[el] < 2 || el.length < 2 || !isNaN(el);
      });
      splitTitlesArr.push(allTitlesArr[i]);
    }
    return splitTitlesArr;
  };

  module.exports.dataCleaner = dataCleaner;