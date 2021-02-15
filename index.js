const { csvReader } = require("./services/csv-reader");
const { Trie } = require("./Trie");
const productEnhancemenPath = "./db/product-enhancement-db.csv";




async function readData(path) {
  let data = await csvReader(path);
  return data;
}



let brandLinesTrie = new Trie();

const getCleanData = (allTitlesArr) => {
  for (let i = 0; i < allTitlesArr.length; i++) {
    const title = allTitlesArr[i].title;
    const brand = allTitlesArr[i].brand;

    let cleanedBrand = title.replace(brand, "");
    let cleanedRegExp = cleanedBrand.replace(/\s/, "");
    let splitTitle = cleanedRegExp.split(" ");
    splitTitle.unshift(brand)
    brandLinesTrie.insert(splitTitle);
  }
  //console.log(JSON.stringify(t.root.children));
  return brandLinesTrie.root.children
};

// ////////////////
async function getList(path) {
  let titleArr = await readData(path);
  let cleanedBrandArr = getCleanData(titleArr);
  console.log(JSON.stringify(cleanedBrandArr));


}

getList(productEnhancemenPath);
