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
const {csvWriter} = require("./services/csv-writer");
const {
  shortStringToArrCleaner,
} = require("./services/short-string-to-array-cleaner");
const { convertArrayToCSV } = require("convert-array-to-csv");
const converter = require("convert-array-to-csv");
const {dataToCsv} = require("./services/data-to-csv")



let categoryName = "grills"
let categoryId = "328983011"
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

  const oneWordStatsTree2 = oneWordTreeBuilder(secondCleanDataArr);

  // Get words static (pairs)
  //const twoWordsStatsTree = twoWordsTreeBuilder(secondCleanDataArr)

  // Build trie to get current statics
  const trieRoot = trieBuilder(secondCleanDataArr, oneWordStatsTree2);
  //console.log(JSON.stringify(trieRoot))
<<<<<<< HEAD
  const trieResultsArr = trieRoot.getLines(oneWordStatsTree2);
  // Split the
  const firstLineArr = shortStringToArrCleaner(trieResultsArr);
  const trieRoot2 = trieBuilder(firstLineArr, oneWordStatsTree2);

  const matchingResultsArr = resultMatching(trieRoot2, secondCleanDataArr);

  const firstMatchResult = shortStringToArrCleaner(matchingResultsArr);
=======
  const trieResultsArr = trieRoot.getLines(oneWordStatsTree);
  // Split the
  const firstlineArr = shortStringToArrCleaner(trieResultsArr);

  const trieRoot2 = trieBuilder(firstlineArr, oneWordStatsTree);
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e


<<<<<<< HEAD
  const trieRoot3 = trieBuilder(firstMatchResult, oneWordStatsTree2);  

  const trieResultsArr2 = trieRoot3.getLines(oneWordStatsTree2);
=======
  // let matchingResultsTitleArr = matchingResultsArr.map(product => {
  //   return product.filteredTitle
  // })

  // const trieRoot3 = trieBuilder(matchingResultsTitleArr, oneWordStatsTree);  

  // const matchingResultsArr2 = resultMatching(trieRoot3, firstCleanDataArr);






>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e

  const secondLineArr = shortStringToArrCleaner(trieResultsArr2);

  
  const secondMatchResult = shortStringToArrCleaner(matchingResultsArr);
  

<<<<<<< HEAD
  /////////////////
  const csvFromArrayOfArrays2 = convertArrayToCSV(secondLineArr, {
    header:["Brand", "Line", "Sub Line 1", "Sub Line 2", "Sub Line 3", "Sub Line 4"],
=======
  //TODO: take out printing

  // Ptint
  let titlesResultMap = {};
  let titlesResultArr = [];
  for (let i = 0; i < matchingResultsArr.length; i++) {
    titledString = matchingResultsArr[i].filteredTitle.join(" ")
    if (!titlesResultMap[titledString]) {
     titlesResultMap[titledString] = 1;
     titlesResultArr.push(matchingResultsArr[i].filteredTitle);
     
    } else {
       titlesResultMap[titledString]++
       
    }
    matchingResultsArr[i].line = matchingResultsArr[i].filteredTitle.join(" ")
     delete matchingResultsArr[i].filteredTitle;
    
  }
  const csvFromArrayOfArrays2 = convertArrayToCSV(titlesResultArr, {
    header: ["Brand", "Line", "Sub Line1", "Sub Line2", "Sub Line3"],
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
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
  

<<<<<<< HEAD
  // const outputPath2 = await outputPathBuilder("./db-results/csv-data", ".csv");
  // fs.writeFile(outputPath2, csvFromArrayOfArrays, (err) => {
=======
  // console.log(matchingResultsArr[0])
  // const csvFromArrayOfProducts = convertArrayToCSV(matchingResultsArr, {
  //   // header,
  //   separator: ",",
  // });

  const outputPath2 = await outputPathBuilder(`./db-results/${categoryId}-${categoryName}`, ".csv");
let resultFields = Object.keys(matchingResultsArr[0])

csvWriter(matchingResultsArr, outputPath2, resultFields)

  // fs.writeFile(outputPath2, matchingResultsArr, (err) => {
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
  //   if (err) return console.log(err);
  //   console.log("CSV File Data Ready");
  // });

  const jsonDataObjStringify = JSON.stringify(trieRoot2);
  outputPath3 = await outputPathBuilder("./db-results/json-data", ".txt");
  fs.writeFile(outputPath3, jsonDataObjStringify, (err) => {
    if (err) return console.log(err);
    console.log("TEXT (Json) File Data Ready");
  });
}

/////////

getList(productEnhancemenPath);
