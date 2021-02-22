const _ = require("lodash");
const { csvReader } = require("./services/csv-reader");
const { dataCleaner } = require("./services/data-cleaner");
const { trieBuilder } = require("./services/trieBuilder");
const { getStatsObj } = require("./services/get-status");
const { stringToArrCleaner } = require("./services/string-to-array-cleaner");
const fs = require("fs");
const { Brand } = require("./Brand");
const { forEach } = require("lodash");
const productEnhancemenPath =
  "./db/result9500category166842011date021721/product-enhancement-db.csv";

const trieResult = (rootNode) => {
  // for (let i = 0; i < getLineArr.length; i++){ //allTitlesArr.length; i++) {
  let test = rootNode.getLineArr();

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

  let JsonData = JSON.stringify(trieRoot);
  fs.writeFile("./json-data.txt", JsonData, (err) => {
    if (err) return console.log(err);
    console.log("JsonData Ready");

    let trieClean = trieResult(trieRoot);
  });
}
getList(productEnhancemenPath);
