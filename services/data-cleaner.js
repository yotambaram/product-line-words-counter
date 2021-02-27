const _ = require("lodash");

const dataCleaner = (allTitlesArr, wordStatsTree) => {
  try {
    //let commonWord = Object.keys(wordStatsTree.timesMap).reduce((a, b) => +a > +b ? +a : +b)
    let splitTitlesArr = [];
    for (let i = 0; i < allTitlesArr.length; i++) {
      let currentBrand = allTitlesArr[i][0];
      let commonWordIndex = allTitlesArr[i].indexOf(wordStatsTree.root.commonWord)
      allTitlesArr[i].splice(commonWordIndex)
      // Filter words
      _.remove(allTitlesArr[i], (el) => {
//        If the word appears X% from the total products. 
      
     
        if(wordStatsTree.root["_TOTAL_PRODUCTS"] > 10 && el != currentBrand) {
          return (

            el.length < 2 ||
            !el in wordStatsTree// ||
            //wordStatsTree.root.children[el].brandsCounter / wordStatsTree.root.BrandMap["_TOTAL_BRANDS"] > 0.6 ||
          //  wordStatsTree.root.children[el].times < 2 ||
           //wordStatsTree.root.children[el].children[currentBrand] / wordStatsTree.root.BrandMap[currentBrand] > 0.9 ? true : false//60

            // || !isNaN(el) || wordStatsTree[el] < 2
          );
        }
      });
      //allTitlesArr[i].unshift(currentBrand)
      allTitlesArr[i].length > 1 ? splitTitlesArr.push(allTitlesArr[i]): null;
    }
    return splitTitlesArr;
  } catch (err) {
    console.log(err);
  }
};

module.exports.dataCleaner = dataCleaner;