const { TitleWordsTrie } = require("../Models/Title-Words-Trie");

const trieBuilder = (splitTitle, statsObj) => {
  try {
    let brandLinesTrie = new TitleWordsTrie();
    for (let i = 0; i < splitTitle.length; i++) {
      //allTitlesArr.length; i++) {
        // if(splitTitle[i][0]==="babideal") {
        //   debugger
        // }
      brandLinesTrie.insert(splitTitle[i], statsObj);
    }
    return brandLinesTrie;
  } catch (err) {
    console.log(err)
  }
    
  };

  module.exports.trieBuilder = trieBuilder;