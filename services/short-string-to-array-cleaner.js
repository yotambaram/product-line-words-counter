const _ = require("lodash");
const fs = require('fs');


const shortStringToArrCleaner = (allTitleArr) => {
  try {
    let allTitleCleanedArr = [];
    let titleMap = new Map()
    for (let i = 0; i < allTitleArr.length; i++) {
      // let product = allTitleArr[i];
      //   product
    
        // if(!titleMap[allTitleArr[i]]) {
        //   titleMap[allTitleArr[i]] = 1;
        const splitTitle = _.split(allTitleArr[i], ",")
        //const filteredTitle = _.filter(splitTitle, _.size);
       // filteredTitle.unshift(brand);
        allTitleCleanedArr.push(splitTitle);
        // } 
        // else {
        //   titleMap[allTitleArr[i]]++;
        // }
          // TODO: Add words to delete from db
          
      
      
    }
    return allTitleCleanedArr;
    
  } catch (err) {
    console.log(err);
  }

};

module.exports.shortStringToArrCleaner = shortStringToArrCleaner;