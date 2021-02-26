const _ = require("lodash");
const fs = require('fs');


const stringToArrCleaner = (allTitleArr) => {
  try {
    let allTitleCleanedArr = [];
    for (let i = 0; i < allTitleArr.length; i++) {
      let product = allTitleArr[i]
    
        
        let brand = product.brand ? product.brand.toLowerCase() : "NO_BRAND";
        let color = product.color ? product.color.toLowerCase() : "NO_COLOR";
        let title = product.title ? product.title.toLowerCase() : "NO_TITLE";
        let cleanedBrand = title
          //.replace(/(?:\\[rn]|[\r\n]+)+/g, "")
          .replace(/[|&;$%@"<>()+,]/g, "")
          .trim()
          .replace(/[{()}]/g, "")
          .trim()
          .replace(/\\|\//g, " ")
          .trim()
          .replace(/[\[\]']+/g, "")
          .trim()
          .replace("-", " ")
          .replace("- ", " ")
          .replace(" -", " ")
          .replace(brand.toLowerCase(), "")
          .trim()
          .replace(color.toLowerCase(), "")
          .trim();
          // TODO: Add words to delete from db
        const splitTitle = _.split(cleanedBrand, " ");
        const filteredTitle = _.filter(splitTitle, _.size)
        filteredTitle.unshift(brand);
        allTitleCleanedArr.push(filteredTitle);
      
      
    }
    return allTitleCleanedArr;
    
  } catch (err) {
    console.log(err)
  }

};

module.exports.stringToArrCleaner = stringToArrCleaner;