const { WordCounter } = require("../services/Word-counter");
const fs = require("fs");


const getStatsObj = (allTitle) => {
    
    wordCounterObj = new WordCounter().count(allTitle);
    /////////////////

    // cleane words status
    let words = Object.keys(wordCounterObj)
    //console.group(words)
    words.forEach(word => {
      // delete words exists 1 time
      //delete short words (1 char)
      wordCounterObj[word].count < 2 || word.lenght < 2 ? delete wordCounterObj[word] : null;
      
      // delete brands, colors, models

      // delete words exists to many times
    });

    let wordsObjStatics= JSON.stringify(wordCounterObj);
    fs.writeFile("./word-counter-obj.txt", wordsObjStatics, (err) => {
      if (err) return console.log(err);
      console.log("word-counter Ready");
      });



    ////////////////
    return wordCounterObj;
  };

module.exports.getStatsObj = getStatsObj;