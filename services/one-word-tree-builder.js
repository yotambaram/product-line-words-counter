const { WordsCounter } = require("../Models/Words-counter");
const fs = require("fs");


const oneWordTreeBuilder = (allTitle) => {
  ///////////////////////
  let categoryWordsTrie = new WordsCounter();
    for (let i = 0; i < allTitle.length; i++) {
      const title = allTitle[i];
      for (let j = 0; j < title.length; j++) {
        let brand = title[0]
        let word = title[j]
        word.length > 0 ?categoryWordsTrie.insert(word,brand) : null
        categoryWordsTrie.root["_TOTAL_PRODUCTS"] = allTitle.length
  /////////////////////
    // wordCounterObj = new WordCounter().count(allTitle);
    // let wordsObjStatics= JSON.stringify(wordCounterObj);
    // fs.writeFile("./words-counter-obj.txt", wordsObjStatics, (err) => {
    //   if (err) return console.log(err);
    //   });

    
  }}
  return categoryWordsTrie;
}

module.exports.oneWordTreeBuilder = oneWordTreeBuilder;