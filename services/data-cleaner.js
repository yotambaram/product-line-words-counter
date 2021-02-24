const _ = require("lodash");

const dataCleaner = (allTitlesArr, wordStatsTree) => {
    let splitTitlesArr = [];
    
    for (let i = 0; i < allTitlesArr.length; i++) {
      let currentBrand = allTitlesArr[i][0]
      // TODO: wordStatsTree[el] < 2 - > use statics to delete (%) 
      _.remove(allTitlesArr[i], (el) => {
        //word = el.toLowerCase()
        // if(el === "stroller") {
        //   debugger
        // }
        // if(wordStatsTree.root.children[el].times / wordStatsTree.root["_TOTAL_PRODUCTS"] > 0.5) {
        //   return true
        // } 
        return el.length < 2 
        || !el in wordStatsTree
        || wordStatsTree.root.children[el].brandsCounter > 3
        || wordStatsTree.root.children[el].times < 3
        || wordStatsTree.root.children[el].times / wordStatsTree.root["_TOTAL_PRODUCTS"] > 0.5
        /*|| !isNaN(el) || wordStatsTree[el] < 2*/
      });
     // allTitlesArr[i].unshift(currentBrand)
      splitTitlesArr.push(allTitlesArr[i]);
    }
    return splitTitlesArr;
  };

  module.exports.dataCleaner = dataCleaner;