const { WordsCounter } = require("../Models/Words-counter");

const twoWordsTreeBuilder = (splitTitle, statsObj) => {
  try {
    const categoryWordsTrie = new WordsCounter();
    for (let i = 0; i < splitTitle.length; i++) {
      const title = splitTitle[i];
      for (let j = 0; j < title.length - 1; j++) {
        let twoWords;
        let brand = title[0];
        twoWords = `${title[j]} ${title[j + 1]}`;
        categoryWordsTrie.insert(twoWords, brand);
      }
    }
    return categoryWordsTrie;
  } catch (err) { }
};

module.exports.twoWordsTreeBuilder = twoWordsTreeBuilder;
