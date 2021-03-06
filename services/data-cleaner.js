const _ = require("lodash");
const { wordsCleaner } = require("./word-to-delete")




const dataCleaner = (allTitles, wordStatsTree) => {
  try {
    let allTitlesArr = allTitles.map(cleanTitle => {
      return cleanTitle.filteredTitle
    })
    // Delete most common word for all search
    let splitTitlesArr = [];
    for (let i = 0; i < allTitlesArr.length; i++) {
      let currentBrand = allTitlesArr[i][0]
      // Filter words
      if (wordStatsTree.root.children[currentBrand].times > 1) {
        _.remove(allTitlesArr[i], (word) => {
          if (
            wordStatsTree.root["_TOTAL_PRODUCTS"] > 10 &&
            word != currentBrand
          ) {
            // return true delete word
            return !word in wordStatsTree ||
              (wordStatsTree.root.brandMap["_TOTAL_BRANDS"] > 2 &&
                wordStatsTree.root.children[word].brandsCounter /
                wordStatsTree.root.brandMap["_TOTAL_BRANDS"] >
                0.9) ||
              word in wordsCleaner.wordsMap ? true : false;
          }
        });
        for (let j = 0; j < wordStatsTree.root.commonWord.length; j++) {
          let commonWordIndex = allTitlesArr[i].indexOf(
            wordStatsTree.root.commonWord[j]
          )
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
              wordStatsTree.root.children[currentWord].children[currentBrand] /
              wordStatsTree.root.brandMap[currentBrand] >
              0.7 && wordStatsTree.root.brandMap[currentBrand] > 3
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
