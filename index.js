const fs = require("fs");
const _ = require("lodash");
const { csvReader } = require("./services/csv-reader");
const { dataCleaner } = require("./services/data-cleaner");
const { twoWordsTreeBuilder } = require("./services/two-words-tree-builder");
const { trieBuilder } = require("./services/trieBuilder");
const { oneWordTreeBuilder } = require("./services/one-word-tree-builder");
const { outputPathBuilder } = require("./services/output-path-builder");
const { stringToArrCleaner } = require("./services/string-to-array-cleaner");


const productEnhancemenPath = "./db/product-enhancement-db.csv";

async function getList(path) {
  // Get data (This data is the API results)
  const titleArr = await csvReader(path);

  // Clean data (Open titles String to cleaner Array)
  const firstCleanDataArr = stringToArrCleaner(titleArr);

  // Get words static (each word)
  const oneWordStatsTree = oneWordTreeBuilder(firstCleanDataArr);

  // Clean more data with statics
  const secondCleanDataArr = dataCleaner(firstCleanDataArr, oneWordStatsTree);

  // Get words static (couples)
  //const twoWordsStatsTree = twoWordsTreeBuilder(secondCleanDataArr);

  // Clean more data with statics
  //const thirdCleanDataArr = dataCleaner(secondCleanDataArr, twoWordsStatsTree);

  // Build trie to get mote statics
  const trieRoot = trieBuilder(secondCleanDataArr, oneWordStatsTree);
 
  // Clean trie
  
  //const jsonDataCleanedNodes = thirdCleanDataArr.cleanNodes()

  //const jsonDataCleanedWords = jsonDataCleanedNodes.cleanWords(wordsStatsObj)

  

  const jsonDataStringify = JSON.stringify(trieRoot);
  let outputPath = outputPathBuilder("./db-results/json-data");
  fs.writeFile(outputPath, jsonDataStringify, (err) => {
    if (err) return console.log(err);
    console.log("JsonData Ready");
  });
}

getList(productEnhancemenPath);
