const fs = require("fs");
const _ = require("lodash");
const { csvReader } = require("./services/csv-reader");
const { dataCleaner } = require("./services/data-cleaner");
const { twoWordsTreeBuilder } = require("./services/two-words-tree-builder");
const { trieBuilder } = require("./services/trieBuilder");
const { oneWordTreeBuilder } = require("./services/one-word-tree-builder");
const { outputPathBuilder } = require("./services/output-path-builder");
const { stringToArrCleaner } = require("./services/string-to-array-cleaner");
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
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
  //const header = ['brand', 'line1', 'line2', 'line3', 'line4', 'line5', 'line6'];

  const csvFromArrayOfArrays = convertArrayToCSV(secondCleanDataArr, {
   // header,
    separator: ','
  });

  // Get words static (couples)
  //const twoWordsStatsTree = twoWordsTreeBuilder(secondCleanDataArr);

  // Clean more data with statics
  //const thirdCleanDataArr = dataCleaner(secondCleanDataArr, twoWordsStatsTree);

  // Build trie to get mote statics
  const trieRoot = trieBuilder(secondCleanDataArr, oneWordStatsTree);

  // Clean trie

  //const jsonDataCleanedNodes = thirdCleanDataArr.cleanNodes()

  //const jsonDataCleanedWords = jsonDataCleanedNodes.cleanWords(wordsStatsObj)

  //const jsonDataArrStringify = JSON.stringify(secondCleanDataArr);
  
  let outputPath = await outputPathBuilder("./db-results/csv-data", ".csv");
  fs.writeFile(outputPath, csvFromArrayOfArrays, (err) => {
    if (err) return console.log(err);
    console.log("CSV File Data Ready");
  });

  const jsonDataObjStringify = JSON.stringify(trieRoot);
  outputPath = await outputPathBuilder("./db-results/json-data", ".txt");
  fs.writeFile(outputPath, jsonDataObjStringify, (err) => {
    if (err) return console.log(err);
    console.log("TEXT (Json) File Data Ready");
  });
}

getList(productEnhancemenPath);
