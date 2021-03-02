const _ = require("lodash");

//take this out
let wordToDelete = {
  for: true,
  to: true,
  from: true,
  with: true,
  //sand: true,
  best: true,
};

const dataCleaner = (allTitlesArr, wordStatsTree) => {
  try {
    // Delete most common word for all search
    let splitTitlesArr = [];
    for (let i = 0; i < allTitlesArr.length; i++) {
      let currentBrand = allTitlesArr[i][0];

      // Filter words
      _.remove(allTitlesArr[i], (el) => {
        //        If the word appears X% from the total products.

        if (wordStatsTree.root["_TOTAL_PRODUCTS"] > 10 && el != currentBrand) {
          return !el in wordStatsTree ||
            (wordStatsTree.root.children[el].brandsCounter /
              wordStatsTree.root.BrandMap["_TOTAL_BRANDS"] >
              0.9 &&
              wordStatsTree.root.BrandMap["_TOTAL_BRANDS"] > 2) ||
            wordStatsTree.root.children[el].times < 2 ||
            wordStatsTree.root.children[el].children[currentBrand] /
              wordStatsTree.root.BrandMap[currentBrand] >
              0.9
            ? true
            : false || el in wordToDelete
            ? true
            : false;

          // || !isNaN(el) || wordStatsTree[el] < 2
          //el.length < 2 ||
        }
      });

      let commonWordIndex = allTitlesArr[i].indexOf(
        wordStatsTree.root.commonWord
      );
      commonWordIndex > 3 ? allTitlesArr[i].splice(commonWordIndex) : null;
      allTitlesArr[i].splice(5);
      if (allTitlesArr[i].length > 2) {
        // if (allTitlesArr[i][0] === "hot mom") {
        //   debugger;
        // }
        if (wordStatsTree.root.BrandMap[currentBrand] > 20) {
          for (let j = 2; j < allTitlesArr[i].length; j++) {
            //TODO: save the brand and common word inside map to do let loops
            const currentWord = allTitlesArr[i][j];
            if (
              wordStatsTree.root.children[currentWord].children[currentBrand] /
                wordStatsTree.root.BrandMap[currentBrand] >
              0.5
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
                wordStatsTree.root.BrandMap[currentBrand] >
              0.5
            ) {
              allTitlesArr[i].splice(j);
              break;
            }
          }
        }
      }

      //allTitlesArr[i].unshift(currentBrand)

      allTitlesArr[i].length > 1 ? splitTitlesArr.push(allTitlesArr[i]) : null;
    }
    return splitTitlesArr;
  } catch (err) {
    console.log(err);
  }
};

module.exports.dataCleaner = dataCleaner;
