const _ = require("lodash");

const dataCleaner = (allTitlesArr, wordsStObj) => {
    let splitTitlesArr = [];
    let howMany = allTitlesArr.length
    for (let i = 0; i < allTitlesArr.length; i++) {
      // TODO: wordsStObj[el] < 2 - > use statics to delete (%) 
      _.remove(allTitlesArr[i], (el) => {
        return el === ""  || el.length < 2 || !el in wordsStObj || wordsStObj[el] < 3/*|| !isNaN(el) || wordsStObj[el] < 2*/;
      });
      splitTitlesArr.push(allTitlesArr[i]);
    }
    return splitTitlesArr;
  };

  module.exports.dataCleaner = dataCleaner;