const { WordCounter } = require("./word-counter");


const getStatsObj = (allTitle) => {
    let words = { _TOTAL_ALL_WORDS: 0 };
    brandWordCounterObj = new WordCounter().count(allTitle, words);
    return brandWordCounterObj;
  };

module.exports.getStatsObj = getStatsObj;