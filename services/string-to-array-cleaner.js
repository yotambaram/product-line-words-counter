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
    splitTitle = _.split(cleanedBrand, " ");
    splitTitle.unshift(brand);
    allTitleCleanedArr.push(splitTitle);
  }
  // let test = JSON.stringify(allTitleCleanedArr)
  //  console.log(allTitleCleanedArr)
  // fs.writeFile('./arr-data.txt', test, function (err) {
  //   if (err) return console.log(err);
  //   console.log('JsonData Ready');
  // });
  return allTitleCleanedArr;
};

module.exports.stringToArrCleaner = stringToArrCleaner;