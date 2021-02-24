const { TitleWordsTrie } = require("../Models/Title-Words-Trie");

const trieBuilder = (splitTitle, statsObj) => {
    let brandLinesTrie = new TitleWordsTrie();
    for (let i = 0; i < splitTitle.length; i++) {
      //allTitlesArr.length; i++) {
      brandLinesTrie.insert(splitTitle[i], statsObj);
    }
    return brandLinesTrie;
  };

  module.exports.trieBuilder = trieBuilder;