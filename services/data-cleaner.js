const _ = require("lodash");

const dataCleaner = (allTitlesArr, wordStatsTree) => {
  try {
    let splitTitlesArr = [];
    for (let i = 0; i < allTitlesArr.length; i++) {
      let currentBrand = allTitlesArr[i][0];
      let commonWordIndex = allTitlesArr[i].indexOf("stroller")
      allTitlesArr[i].splice(commonWordIndex)
      // Filter words
      _.remove(allTitlesArr[i], (el) => {
        // If the word appears X% from the total products. 
        if (wordStatsTree.root["_TOTAL_PRODUCTS"] > 10 && el != currentBrand) {
          wordStatsTree.root.children[el].times / wordStatsTree.root["_TOTAL_PRODUCTS"] > 0.6 ? true : false//60
        }
        if(el != currentBrand && wordStatsTree.root.children[el].brandsCounter > 1) {
          return true
        }
        if(el != currentBrand) {
          return (

            el.length < 2 ||
            !el in wordStatsTree ||
            wordStatsTree.root.children[el].brandsCounter > 2 ||
            wordStatsTree.root.children[el].times < 3
            // || !isNaN(el) || wordStatsTree[el] < 2
          );
        }
      });
      //allTitlesArr[i].unshift(currentBrand)
      splitTitlesArr.push(allTitlesArr[i]);
    }
    return splitTitlesArr;
  } catch (err) {
    console.log(err);
  }
};

module.exports.dataCleaner = dataCleaner;
