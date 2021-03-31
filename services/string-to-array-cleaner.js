const _ = require("lodash");
const fs = require('fs');

const wordToDelete = require("./data-cleaner")


wordsCleaner = (stringTitle) => {
  let wordToDeleteArr = [
    "for",
    "to",
    "from",
    "with",
    "best",
    "inc",
    "2-in-1",
    "3-in-1",
    "4-in-1",
    "5-in-1",
    "2 in 1",
    "3 in 1",
    "4 in 1",
    "5 in 1",
    "best",
    "black",
    "yellow",
    "grey",
    "navy",
    "red",
    "pink",
    "blue",
    "2 weeks delivery!",
   "2-in1"
  
  
  ];
  let cleanedWord
  wordToDeleteArr.forEach(element => {
    cleanedWord = stringTitle.replace(element, "").trim();
    
  });
  return cleanedWord
}



async function stringToArrCleaner(allTitleArr){
  try {
    let allTitleCleanedArr = [];
    for (let i = 0; i < allTitleArr.length; i++) {
      let product = allTitleArr[i]

        let brand = product.brand ? product.brand.toLowerCase() : "no_brand";
        let color = product.color ? product.color.toLowerCase() : "no_color";
        let title = product.title ? product.title.toLowerCase() : "no_title";
        let model = product.title ? product.model.toLowerCase() : "no_model";
       
      
        let cleanedTitle = title
        .replace(/ *\([^)]*\) */g, "")
          //.replace(/(?:\\[rn]|[\r\n]+)+/g, "")
          .replace(/[|&;$%@"<>()]/g, "")
          .trim()
          .replace(/[{()}]/g, "")
          .trim()
          .replace(/\\|\//g, " ")
          .trim()
          
          .replace(/[,\[\]']+/g, "")
          .trim()
          //.replace("-", " ")
          .replace(" +", " ")
          .replace(",", " ")
          .replace(", ", " ")
          .replace("+", " ")
          .replace("- ", " ")
          .replace(" -", " ")
          .replace(brand, "")
          .trim()
          .replace(brand, "")
          .trim()
          .replace(brand, "")
          .trim()
          .replace(color, "")
          .trim()
          .replace(model, "")
          .trim()
          .replace("2 in 1", "")
          .trim();
          
          // TODO: Add words to delete from db (for, From and)
          // if(brand.startsWith('aegilmc') && color == "gray"){
          //   debugger
          // }
          let cleanedBrandString = wordsCleaner(cleanedTitle)
         
  
        const splitTitleArr = _.split(cleanedBrandString, " ");
       
        let cleanBrand = brand.replace(/[-|.&;$%@"<>()-,]/g, " ").trim().replace(/\s+/g, ' ')
      
     
        if(cleanBrand.split(" ").length > 1) {
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