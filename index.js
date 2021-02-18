const _ = require("lodash");
const { csvReader } = require("./services/csv-reader");
const { dataCleaner } = require("./services/data-cleaner");
const { trieBuilder } = require("./services/trieBuilder");
const { getStatsObj } = require("./services/get-status");
const { stringToArrCleaner } = require("./services/string-to-array-cleaner");
const fs = require('fs');
const { Brand } = require("./Brand");
const { forEach } = require("lodash");
const productEnhancemenPath = "./db/1000times1 021621/product-enhancement-db.csv";

const trieResult = (rootNode) => {
  // for (let i = 0; i < getLineArr.length; i++){ //allTitlesArr.length; i++) {
  let test = rootNode.getLineArr();
  console.log(test)
  // }
  // return brandLinesTrie.root.children
};



async function getList(path) {
  // get data
  let titleArr = await csvReader(path);
  // clean data
  let firstCleanDataArr = stringToArrCleaner(titleArr);
console.log(firstCleanDataArr)
  // get data word stats
  let wordsStatsObj = getStatsObj(firstCleanDataArr);
  // clean data with statics
  let cleanedBrandsArr = dataCleaner(firstCleanDataArr, wordsStatsObj);
  // build trie
  let trieRoot = trieBuilder(cleanedBrandsArr, wordsStatsObj);

  //let trieClean = trieResult(trieRoot)
  let JsonData = JSON.stringify(trieRoot);
  //console.log(JsonData)
fs.writeFile('./json-data.txt', JsonData, function (err) {
  if (err) return console.log(err);
  console.log('JsonData Ready');
});

}
getList(productEnhancemenPath);
