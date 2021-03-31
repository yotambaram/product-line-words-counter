const _ = require("lodash");
const wordToDelete = require("./word-to-delete")
//take this out


const dataCleaner = (allTitlesArr, wordStatsTree) => {
  try {
    let splitTitlesArr = [];
    for (let i = 0; i < allTitlesArr.length; i++) {
      let currentBrand = allTitlesArr[i][0];
      if (wordStatsTree.root.children[currentBrand].times > 1) {
        _.remove(allTitlesArr[i], (el) => {
          if (
            wordStatsTree.root["_TOTAL_PRODUCTS"] > 10 &&
            el != currentBrand
          ) {
            return !el in wordStatsTree ||

              (wordStatsTree.root.brandMap["_TOTAL_BRANDS"] > 2 &&
                wordStatsTree.root.children[el].brandsCounter /
                wordStatsTree.root.brandMap["_TOTAL_BRANDS"] >
                0.9)
              || el in wordToDelete ? true : false;
            //wordStatsTree.root.children[el].times >||
            // wordStatsTree.root.children[el].children[currentBrand] /
            //   wordStatsTree.root.brandMap[currentBrand] >
            //   0.9
            // ? true
            // : false || 
            // || !isNaN(el) || wordStatsTree[el] < 2
            //el.length < 2 ||
          }
        });
        for (let j = 0; j < wordStatsTree.root.commonWord.length; j++) {

          let commonWordIndex = allTitlesArr[i].indexOf(
            wordStatsTree.root.commonWord[j]
          );
          commonWordIndex > 1 ? allTitlesArr[i].splice(commonWordIndex) : null;
        }
      }
      if (allTitlesArr[i].length > 2) {
        allTitlesArr[i].splice(5);
        if (wordStatsTree.root.brandMap[currentBrand] > 20) {
          for (let j = 2; j < allTitlesArr[i].length; j++) {
            //TODO: save the brand and common word inside map to do let loops
            const currentWord = allTitlesArr[i][j];
            if (
              wordStatsTree.root.children[currentWord].children[currentBrand] /
              wordStatsTree.root.brandMap[currentBrand] >
              0.95
            ) {
              allTitlesArr[i].splice(j);
              break;
            }
          }
        } else {
          for (let j = 3; j < allTitlesArr[i].length; j++) {
            //TODO: save the brand and common word inside map to do let loops
            const currentWord = allTitlesArr[i][j];
            if (
              // How many times this word in this brand / how manyproducts
              wordStatsTree.root.children[currentWord].children[currentBrand] /
              wordStatsTree.root.brandMap[currentBrand] >
              0.7 
            ) {
              allTitlesArr[i].splice(j);
              break;
            }
          }
        }
      }
      allTitlesArr[i].length > 1 ? splitTitlesArr.push(allTitlesArr[i]) : null;
    }
    return splitTitlesArr;
  } catch (err) {
    console.log(err);
  }
};

module.exports.dataCleaner = dataCleaner;
