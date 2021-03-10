const _ = require("lodash");
const fs = require('fs');
const { wordsCleaner } = require("./word-to-delete")
const { titleCleaner } = require("./title-cleaner")




async function stringToArrCleaner(allTitleArr) {
  try {

    for (let i = 0; i < allTitleArr.length; i++) {
      let product = allTitleArr[i]
      let brand = product.brand ? product.brand.toLowerCase() : "no_brand";
      let cleanedTitle = titleCleaner(product, brand)
      // TODO: Add words to delete from db (for, From and)
      let cleanedBrandString = wordsCleaner.deleteWords(cleanedTitle)
      const splitTitleArr = _.split(cleanedBrandString, " ");
      let cleanBrand = brand.replace(/[-|.&;$%@"<>()-,]/g, " ").trim().replace(/\s+/g, ' ')
      if (cleanBrand.split(" ").length > 1) {
        splitedBrand = cleanBrand.split(" ")
        for (let j = 0; j < splitedBrand.length; j++) {
          splitTitleArr[0] === splitedBrand[j] ? splitTitleArr.shift() : null;
        }
      }
      // TODO: dont delete size if its a num
      const filteredTitle = _.filter(splitTitleArr, word => {
        return word.length > 0 || word.match(/[a-z]/i);
      })
      filteredTitle.unshift(cleanBrand);
      allTitleArr[i].filteredTitle = filteredTitle
    }
    return allTitleArr;
  } catch (err) {
    console.log(err)
  }
};

module.exports.stringToArrCleaner = stringToArrCleaner;