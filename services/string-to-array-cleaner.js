const _ = require("lodash");
const fs = require('fs');


const stringToArrCleaner = (allTitleArr) => {
  try {
    let allTitleCleanedArr = [];
    for (let i = 0; i < allTitleArr.length; i++) {
      let product = allTitleArr[i]
    
         

        let brand = product.brand ? product.brand.toLowerCase() : "no_brand";
        let color = product.color ? product.color.toLowerCase() : "no_color";
        let title = product.title ? product.title.toLowerCase() : "no_title";
        let model = product.title ? product.model.toLowerCase() : "no_model";
       
      
        let cleanedBrand = title
          //.replace(/(?:\\[rn]|[\r\n]+)+/g, "")
          .replace(/[|&;$%@"<>()]/g, "")
          .trim()
          .replace(/[{()}]/g, "")
          .trim()
          .replace(/\\|\//g, " ")
          .trim()
          .replace(/[\[\]']+/g, "")
          .trim()
          //.replace("-", " ")
          .replace(" +", " ")
          .replace(",", " ")
          .replace(", ", " ")
          .replace("+", " ")
          .replace("- ", " ")
          .replace(" -", " ")
          .replace(brand.toLowerCase(), "")
          .trim()
          .replace(brand.toLowerCase(), "")
          .trim()
          .replace(brand.toLowerCase(), "")
          .trim()
          .replace(color.toLowerCase(), "")
          .trim()
          .replace(model.toLowerCase(), "")
          .trim();
          // TODO: Add words to delete from db (for, From and)
          
        
        const splitTitle = _.split(cleanedBrand, " ");
       
        cleanBrand = brand.replace(/[-|.&;$%@"<>()-,]/g, " ").trim().replace(/\s+/g, ' ')
      
        // if(brand.startsWith('blu-pier')){
        //   debugger
        // }

        if(cleanBrand.split(" ").length > 1) {
          splitedBrand = cleanBrand.split(" ")
          for (let j = 0; j < splitedBrand.length; j++) {
            splitTitle[0] === splitedBrand[j] ? splitTitle.shift() : null;
            
          }
        }
        // TODO: dont delete size if its a num
        const filteredTitle = _.filter(splitTitle, word => {
          return word.length > 0 || word.match(/[a-z]/i);
        })
        

        filteredTitle.unshift(cleanBrand);
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