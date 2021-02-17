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



const trieBuilder = (splitTitle) => {
  
  let brandLinesTrie = new Trie();
  for (let i = 0; i < splitTitle.length; i++){ //allTitlesArr.length; i++) {
    brandLinesTrie.insert(splitTitle[i]);
  
  }
  return brandLinesTrie
};

const trieResult = (rootNode) => {
  
  // for (let i = 0; i < getLineArr.length; i++){ //allTitlesArr.length; i++) {
    rootNode.getLineArr();
  // }
  // return brandLinesTrie.root.children
};

const getCleanData = (allTitlesArr, wordsStObj) => {
  let splitTitle
  let splitTitlesArr = []
  for (let i = 0; i < allTitlesArr.length; i++){
    
    const title = allTitlesArr[i].title;
    const brand = allTitlesArr[i].brand;
    //clean title
    let cleanedBrand = title.replace(brand, "");
    let cleanedRegExp = cleanedBrand.replace(/(?:\\[rn]|[\r\n]+)+/g, "");
    splitTitleWordArr = _.split(title," ")
    // splitTitleWordArr.unshift(brand)
    // TODO: Clean here more with statics / numbers / + % $ ...
    _.remove(splitTitleWordArr, function (el) {
      
      // remove all numbers
      //numbers of times should be % from total 
      return wordsStObj[el] < 10 || el.length < 2 || !isNaN(el)
       
   
  });
  console.log(splitTitleWordArr)
  //   for (let j = 0; j < splitTitleWordArr.length; j++)  
  //   console.log(splitTitleWordArr[j]) 
  }
  return splitTitlesArr
};

const getStatsObj = (allTitlesArr) => {
  let words = {"_TOTAL_ALL_WORDS":0};
  for (let i = 0; i < allTitlesArr.length; i++){ //allTitlesArr.length; i++) {
    const title = allTitlesArr[i].title;
    const brand = allTitlesArr[i].brand;
    let cleanedBrand = title.replace(brand, "");
    let cleanedRegExp = cleanedBrand.replace(/\s/, "");
    let splitTitle = _.words(cleanedRegExp)//cleanedRegExp.split(" ");
    splitTitle.unshift(brand)
    brandWordsCounterObj = new WordCounter().count(splitTitle, words)
  }
  //console.log(brandWordsCounterObj)
  return brandWordsCounterObj
};

// ////////////////
async function getList(path) {
  // get data
  let titleArr = await readData(path);
  //get stats
  let wordsStatsObj = getStatsObj(titleArr);
  // clean data
  let cleanedBrandArr = getCleanData(titleArr, wordsStatsObj);
  
  // build trie
  let trieRoot = trieBuilder(cleanedBrandArr)

  //let trieClean = trieResult(trieRoot)
  console.log(JSON.stringify(trieRoot))
  

 
  

  //console.log(JSON.stringify(cleanedBrandArr));


}
getList(productEnhancemenPath);

