const _ = require("lodash");

const dataCleaner = (allTitlesArr, wordStatsTree) => {
  try {
    let splitTitlesArr = [];
    for (let i = 0; i < allTitlesArr.length; i++) {
      let currentBrand = allTitlesArr[i][0];
      // TODO: wordStatsTree[el] < 2 - > use statics to delete (%)
      _.remove(allTitlesArr[i], (el) => {
        if (wordStatsTree.root["_TOTAL_PRODUCTS"] > 10 && el != currentBrand) {
          if (
            wordStatsTree.root.children[el].times /
              wordStatsTree.root["_TOTAL_PRODUCTS"] >
            0.6 //60%
          ) {
            return true;
          }
        } else {
          return (
            el.length < 2 ||
            !el in wordStatsTree ||
            wordStatsTree.root.children[el].brandsCounter > 2 ||
            wordStatsTree.root.children[el].times < 3
            // || !isNaN(el) || wordStatsTree[el] < 2
          );
        }
      });
      splitTitlesArr.push(allTitlesArr[i]);
    }
    return splitTitlesArr;
  } catch (err) {
    console.log(err);
  }
};

module.exports.dataCleaner = dataCleaner;
