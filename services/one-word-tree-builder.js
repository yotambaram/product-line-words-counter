const { WordsCounter } = require("../Models/Words-counter");
const fs = require("fs");

const oneWordTreeBuilder = (allTitle) => {
  try {
    let categoryWordsTrie = new WordsCounter();
    for (let i = 0; i < allTitle.length; i++) {
      const title = allTitle[i];
      for (let j = 0; j < title.length; j++) {
        let brand = title[0];
        let word = title[j];
        word.length > 0 ? categoryWordsTrie.insert(word, brand) : null;
        categoryWordsTrie.root["_TOTAL_PRODUCTS"] = allTitle.length;
      }
    }
    return categoryWordsTrie;
  } catch (err) {
    console.log(err);
  }
};

module.exports.oneWordTreeBuilder = oneWordTreeBuilder;
