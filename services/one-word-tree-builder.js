const { WordsCounter } = require("../Models/Words-counter");
const fs = require("fs");
const _ = require("lodash");

const oneWordTreeBuilder = (allTitle) => {
  try {
    let categoryWordsTrie = new WordsCounter();
    categoryWordsTrie.root.BrandMap = new Map();
    categoryWordsTrie.root.BrandMap["_TOTAL_BRANDS"] = 0
    for (let i = 0; i < allTitle.length; i++) {
      const title = allTitle[i];
      let brand = title[0];
      for (let j = 0; j < title.length; j++) {
        let word = title[j];
        word.length > 0 ? categoryWordsTrie.insert(word, brand) : null;
      }
      categoryWordsTrie.root["_TOTAL_PRODUCTS"] = allTitle.length;
      if(categoryWordsTrie.root.BrandMap[brand]) {
        (categoryWordsTrie.root.BrandMap[brand]++)
      } else {
        categoryWordsTrie.root.BrandMap["_TOTAL_BRANDS"]++;
        categoryWordsTrie.root.BrandMap[brand] = 1;
      }
         
         
    }
    // let test = Object.keys(categoryWordsTrie.root.children)
    // console.log(test)
    let bigestNum = 0;
    for (const [key, value] of Object.entries(
      categoryWordsTrie.root.children
    )) {
      let timesVal = value.times;
      bigestNum < timesVal ? (bigestNum = timesVal) : null;
      if (!categoryWordsTrie.root.timesMap[timesVal]) {
        categoryWordsTrie.root.timesMap[timesVal] = [key];
      } else {
        categoryWordsTrie.root.timesMap[timesVal].push(key);
      }
    }
   // categoryWordsTrie.root.commonWord = "";
    categoryWordsTrie.root["commonWord"] =
      categoryWordsTrie.root.timesMap[bigestNum][0]; //takes only one
    return categoryWordsTrie;
  } catch (err) {
    console.log(err);
  }
};

module.exports.oneWordTreeBuilder = oneWordTreeBuilder;
