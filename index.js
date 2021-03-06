const fs = require("fs");
const _ = require("lodash");
const { csvReader } = require("./services/csv-reader");
const { dataCleaner } = require("./services/data-cleaner");
const { twoWordsTreeBuilder } = require("./services/two-words-tree-builder");
const { resultMatching } = require("./services/result-matching");
const { trieBuilder } = require("./services/trieBuilder");
const { oneWordTreeBuilder } = require("./services/one-word-tree-builder");
const { outputPathBuilder } = require("./services/output-path-builder");
const { stringToArrCleaner } = require("./services/string-to-array-cleaner");
const {
  shortStringToArrCleaner,
} = require("./services/short-string-to-array-cleaner");
const { convertArrayToCSV } = require("convert-array-to-csv");
const converter = require("convert-array-to-csv");

const productEnhancemenPath = "./db/product-enhancement-db.csv";

async function getList(path) {
  // Get data (This data is the API results)
  const titleArr = await csvReader(path);

  // Clean data (Open titles String to cleaner Array)
  const firstCleanDataArr = await stringToArrCleaner(titleArr);

  // Get words static (each word)
  const oneWordStatsTree = oneWordTreeBuilder(firstCleanDataArr);

  // Clean more data with statics
  const secondCleanDataArr = dataCleaner(firstCleanDataArr, oneWordStatsTree);

  // Get words static (pairs)
  //const twoWordsStatsTree = twoWordsTreeBuilder(secondCleanDataArr)

  // Build trie to get current statics
  const trieRoot = trieBuilder(secondCleanDataArr, oneWordStatsTree);
  //console.log(JSON.stringify(trieRoot))
  const trieResultsArr = trieRoot.getLines();
  // Split the
  const firstlineArr = shortStringToArrCleaner(trieResultsArr);
  const trieRoot2 = trieBuilder(firstlineArr, oneWordStatsTree);

  const matchingResultsArr = resultMatching(trieRoot2, firstCleanDataArr);

  const testArr = []
  for (let i = 0; i < matchingResultsArr.length; i++) {
    let test = matchingResultsArr[i]
    
    if(test) {
      let test2 = test.split(",")
    testArr.push(test2)  
    }
      
  }

  const trieRoot3 = trieBuilder(testArr, oneWordStatsTree);  



  /////////////////
  const csvFromArrayOfArrays2 = convertArrayToCSV(firstlineArr, {
    // header,
    separator: ",",
  });

  const outputPath1 = await outputPathBuilder(
    "./db-results/product-line-per-brand",
    ".csv"
  );
  fs.writeFile(outputPath1, csvFromArrayOfArrays2, (err) => {
    if (err) return console.log(err);
    console.log("CSV File Data Ready");
  });
  
  // print
  const csvFromArrayOfArrays = convertArrayToCSV(matchingResultsArr, {
    // header,
    separator: ",",
  });

  const outputPath2 = await outputPathBuilder("./db-results/csv-data", ".csv");
  fs.writeFile(outputPath2, csvFromArrayOfArrays, (err) => {
    if (err) return console.log(err);
    console.log("CSV File Data Ready");
  });

  const jsonDataObjStringify = JSON.stringify(trieRoot3);
  outputPath3 = await outputPathBuilder("./db-results/json-data", ".txt");
  fs.writeFile(outputPath3, jsonDataObjStringify, (err) => {
    if (err) return console.log(err);
    console.log("TEXT (Json) File Data Ready");
  });
}

/////////

getList(productEnhancemenPath);
