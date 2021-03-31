const { WordsCounter } = require("../Models/Words-counter");
const fs = require("fs");
const _ = require("lodash");

const oneWordTreeBuilder = (allTitle) => {
  try {
    let categoryWordsTrie = new WordsCounter();
    categoryWordsTrie.root.brandMap = new Map();
    categoryWordsTrie.root.brandMap["_TOTAL_BRANDS"] = 0
    for (let i = 0; i < allTitle.length; i++) {
      const title = allTitle[i].filteredTitle;
      let brand = title[0];
      for (let j = 0; j < title.length; j++) {
        let word = title[j];
        if(word === 'anti-feeze') {
          debugger
        }
        word.length > 0 ? categoryWordsTrie.insert(word, brand) : null;
      }
      categoryWordsTrie.root["_TOTAL_PRODUCTS"] = allTitle.length;
<<<<<<< HEAD
      if(categoryWordsTrie.root.brandMap[brand]) {
=======
      if (categoryWordsTrie.root.brandMap[brand]) {
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
        (categoryWordsTrie.root.brandMap[brand]++)
      } else {
        categoryWordsTrie.root.brandMap["_TOTAL_BRANDS"]++;
        categoryWordsTrie.root.brandMap[brand] = 1;
      }
    }
    let bigestNum = 0;
    // Can use map()
    for (const [key, value] of Object.entries(
      categoryWordsTrie.root.children
    )) {
      let timesVal = value.times;
      bigestNum < timesVal && !(key in categoryWordsTrie.root.brandMap) ? (bigestNum = timesVal) : null;
      if (!categoryWordsTrie.root.timesMap[timesVal]) {
        categoryWordsTrie.root.timesMap[timesVal] = [key];
      } else {
        categoryWordsTrie.root.timesMap[timesVal].push(key);
      }
    }
    let keysArr = Object.keys(categoryWordsTrie.root.timesMap)
    categoryWordsTrie.root["commonWord"] =
      categoryWordsTrie.root.timesMap[keysArr.pop()];
    return categoryWordsTrie;
  } catch (err) {
    console.log(err);
  }
};

module.exports.oneWordTreeBuilder = oneWordTreeBuilder;