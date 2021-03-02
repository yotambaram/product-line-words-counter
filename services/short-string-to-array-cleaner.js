const _ = require("lodash");
const fs = require('fs');


const shortStringToArrCleaner = (allTitleArr) => {
  try {
    let allTitleCleanedArr = [];
    for (let i = 0; i < allTitleArr.length; i++) {
      // let product = allTitleArr[i];
      //   product
        
          // TODO: Add words to delete from db
        const splitTitle = _.split(allTitleArr[i], ",");
        //const filteredTitle = _.filter(splitTitle, _.size);
       // filteredTitle.unshift(brand);
        allTitleCleanedArr.push(splitTitle);
      
      
    }
    return allTitleCleanedArr;
    
  } catch (err) {
    console.log(err);
  }

};

module.exports.shortStringToArrCleaner = shortStringToArrCleaner;