const _ = require("lodash");
const fs = require('fs');


const stringToArrCleaner = (allTitleArr) => {
  let allTitleCleanedArr = [];
  for (let i = 0; i < allTitleArr.length; i++) {
    let title = allTitleArr[i].title.toLowerCase();
    let brand = allTitleArr[i].brand;
    let color = allTitleArr[i].color;
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
      .replace("- ", " ")
      .replace(" -", " ")
      .replace(brand.toLowerCase(), "")
      .trim()
      .replace(color.toLowerCase(), "")
      .trim();
    const splitTitle = _.split(cleanedBrand, " ");
    const filteredTitle = _.filter(splitTitle, _.size)
    filteredTitle.unshift(brand);
    allTitleCleanedArr.push(filteredTitle);
  }
  return allTitleCleanedArr;
};

module.exports.stringToArrCleaner = stringToArrCleaner;