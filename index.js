const _ = require("lodash");
const { csvReader } = require("./services/csv-reader");
const { dataCleaner } = require("./services/data-cleaner");
const { trieBuilder } = require("./services/trieBuilder");
const { getStatsObj } = require("./services/get-status");
const { stringToArrCleaner } = require("./services/string-to-array-cleaner");

const { Brand } = require("./Brand");
const { forEach } = require("lodash");
const productEnhancemenPath = "./db/product-enhancement-db.csv";

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
  // get data word stats
  let wordsStatsObj = getStatsObj(firstCleanDataArr);
  // clean data with statics
  let cleanedBrandsArr = dataCleaner(firstCleanDataArr, wordsStatsObj);
  // build trie
  let trieRoot = trieBuilder(cleanedBrandsArr, wordsStatsObj);

  let trieClean = trieResult(trieRoot)
  //console.log(JSON.stringify(trieRoot));

  //console.log(JSON.stringify(cleanedBrandArr));
}
getList(productEnhancemenPath);
