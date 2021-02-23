const { WordsCounter } = require("../Words-counter");

const trieBuilder = (splitTitle, statsObj) => {
    let categoryWordsTrie = new WordsCounter();
    for (let i = 0; i < splitTitle.length; i++) {
      const title = splitTitle[i];
      for (let j = 1; j < title.length - 1; j++) {
      let twoWords;
      let brand = title[0]
      twoWords = `${title[j]} ${title[j + 1]}`;
      categoryWordsTrie.insert(twoWords, brand);
    }
  }
     return categoryWordsTrie;
  };

  module.exports.trieBuilder = trieBuilder;