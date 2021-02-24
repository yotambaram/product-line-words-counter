const _ = require("lodash");
const { csvReader } = require("./services/csv-reader");
const { dataCleaner } = require("./services/data-cleaner");
const { twoWordsTreeBuilder } = require("./services/two-words-tree-builder");
const { oneWordTreeBuilder } = require("./services/one-word-tree-builder");
const { stringToArrCleaner } = require("./services/string-to-array-cleaner");
const fs = require("fs");
const { Brand } = require("./Brand");
const { WordsCounter } = require("./services/Words-counter");
const { forEach } = require("lodash");
const productEnhancemenPath = "./db/product-enhancement-db.csv";


async function getList(path) {
  // get data
  const titleArr = await csvReader(path);
  // // clean data
  
  const firstCleanDataArr = stringToArrCleaner(titleArr);
  // // get data one word stats  
  const oneWordStatsTree = oneWordTreeBuilder(firstCleanDataArr);
  // // clean data with statics
 
  const secondCleanDataArr = dataCleaner(firstCleanDataArr, oneWordStatsTree);

  const twoWordsStatsTree = twoWordsTreeBuilder(secondCleanDataArr);

  const thirdCleanDataArr = dataCleaner(secondCleanDataArr, twoWordsStatsTree);
  console.log(secondCleanDataArr)
  //const jsonDataCleanedNodes = thirdCleanDataArr.cleanNodes()

  //const jsonDataCleanedWords = jsonDataCleanedNodes.cleanWords(wordsStatsObj)

  // // // build trie

  // const jsonDataStringify = JSON.stringify(jsonDataCleanedNodes);
  //console.log(jsonDataStringify)
  // return jsonDataStringify

}

getList(productEnhancemenPath);
