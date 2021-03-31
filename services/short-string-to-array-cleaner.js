const _ = require("lodash");
const fs = require('fs');


const shortStringToArrCleaner = (allTitleArr) => {
  try {
    let allTitleCleanedArr = [];
    let titleMap = new Map()
    for (let i = 0; i < allTitleArr.length; i++) {
      const splitTitle = _.split(allTitleArr[i], ",")
      allTitleCleanedArr.push(splitTitle);
      // TODO: Add words to delete from db
    }
    return allTitleCleanedArr;

  } catch (err) {
    console.log(err);
  }

};

module.exports.shortStringToArrCleaner = shortStringToArrCleaner;