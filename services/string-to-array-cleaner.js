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
          .replace(/[|&;$%@"<>(),]/g, "")
          .trim()
          .replace(/[{()}]/g, "")
          .trim()
          .replace(/\\|\//g, " ")
          .trim()
          .replace(/[\[\]']+/g, "")
          .trim()
          //.replace("-", " ")
          .replace(" +", " ")
          .replace("- ", " ")
          .replace(" -", " ")
          .replace(brand.toLowerCase(), "")
          .trim()
          .replace(color.toLowerCase(), "")
          .trim();
          // TODO: Add words to delete from db (for, From and)
          
        const splitTitle = _.split(cleanedBrand, " ");

        if(brand.split(" ").length > 1) {
          splitedBrand = brand.split(" ")
          for (let j = 0; j < splitedBrand.length; j++) {
            splitTitle[0] === splitedBrand[j] ? splitTitle.shift() : null;
            
          }
        }
        // TODO: dont delete size if its a num
        const filteredTitle = _.filter(splitTitle, word => {
         
          
          return word.length > 0 || word.match(/[a-z]/i);
        })
        

        filteredTitle.unshift(brand);
        // if(brand === "bob gear" && filteredTitle[1] === "deluxe") {
        //   debugger
        // }
        allTitleCleanedArr.push(filteredTitle);
      
      
     
    }
    return allTitleCleanedArr;
    
  } catch (err) {
    console.log(err)
  }

};

module.exports.stringToArrCleaner = stringToArrCleaner;