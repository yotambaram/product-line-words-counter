const _ = require("lodash");
const { csvReader } = require("./services/csv-reader");
const { WordCounter } = require("./services/Word-counter");

const { Trie } = require("./Trie");
const { Brand } = require("./Brand");
const { forEach } = require("lodash");
const productEnhancemenPath = "./db/product-enhancement-db.csv";

async function readData(path) {
  let data = await csvReader(path);
  return data;
}

const trieBuilder = (splitTitle, statsObj) => {
  let brandLinesTrie = new Trie();
  for (let i = 0; i < splitTitle.length; i++) {
    //allTitlesArr.length; i++) {
    brandLinesTrie.insert(splitTitle[i], statsObj);
  }
  return brandLinesTrie;
};

const trieResult = (rootNode) => {
  // for (let i = 0; i < getLineArr.length; i++){ //allTitlesArr.length; i++) {
  rootNode.getLineArr();
  // }
  // return brandLinesTrie.root.children
};

const getCleanData = (allTitlesArr, wordsStObj) => {
  let splitTitlesArr = [];
  let howMany = allTitlesArr.length
  for (let i = 0; i < allTitlesArr.length; i++) {
    // TODO: Clean here more with statics / numbers / + % $ ...
    // console.log("before",allTitlesArr[i])
    _.remove(allTitlesArr[i], function (el) {
      return el === "" || wordsStObj[el] < 2 || el.length < 2 || !isNaN(el);
    });
    // console.log("after",allTitlesArr[i])

    splitTitlesArr.push(allTitlesArr[i]);
    //   for (let j = 0; j < splitTitleWordArr.length; j++)
    //   console.log(splitTitleWordArr[j])
  }
  return splitTitlesArr;
};

const stringToCleanArr = (allTitleArr) => {
  let allTitleCleanedArr = []
  for (let i = 0; i < allTitleArr.length; i++) {
    let title = allTitleArr[i].title.toLowerCase();
    let brand = allTitleArr[i].brand;
    let color = allTitleArr[i].color;
    //console.log("color:",color," / title:",title)
    let cleanedBrand = title
      
      //.replace(/(?:\\[rn]|[\r\n]+)+/g, "")
      .replace(/[|&;$%@"<>()+,]/g, "").trim()
      .replace(/[{()}]/g, "").trim()
      .replace(/\\|\//g," ").trim()
      .replace(/[\[\]']+/g, "").trim()
      .replace("- ", "").trim()
      .replace(brand.toLowerCase(), "").trim()
      .replace(color.toLowerCase(), "");
    splitTitle = _.split(cleanedBrand, " ");
    splitTitle.unshift(brand);
    //console.log("firstCleanDataArr",splitTitle)
    allTitleCleanedArr.push(splitTitle)
    
  }
  return allTitleCleanedArr;
};
const getStatsObj = (allTitle) => {
  
  let words = { _TOTAL_ALL_WORDS: 0 };

  brandWordCounter = new WordCounter().count(allTitle, words);
  //console.log(brandWordCounter)
  return brandWordCounter;
};

// ////////////////
async function getList(path) {
  // get data
  let titleArr = await readData(path);
  // clean data
  let firstCleanDataArr = stringToCleanArr(titleArr);

  let wordsStatsObj = getStatsObj(firstCleanDataArr);
  
  
  //wordsStatsObj.print("test")
  let cleanedBrandArr = getCleanData(firstCleanDataArr, wordsStatsObj);

  // build trie
  let trieRoot = trieBuilder(cleanedBrandArr, wordsStatsObj);

  //let trieClean = trieResult(trieRoot)
  console.log(JSON.stringify(trieRoot))

  //console.log(JSON.stringify(cleanedBrandArr));
}
getList(productEnhancemenPath);
