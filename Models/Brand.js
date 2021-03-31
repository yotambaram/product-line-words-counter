
const Brand = (matchingResultsArr) => {
    const brandMap = new Map();
  let counter = 0
  for (let i = 0; i < matchingResultsArr.length; i++) {
    counter++
    let brand = matchingResultsArr[i].brand.toLowerCase();
    let line = matchingResultsArr[i].line;
    if (!brandMap[brand]) {
      brandMap[brand] = new Map();
      let currentBrand = brandMap[brand];
      currentBrand[line] = 1;
      currentBrand["_TOTAL"] = 1;
    } else {
      if (brandMap[brand][line]) {
        brandMap[brand][line]++;
        brandMap[brand]["_TOTAL"]++
      } else {
        currentBrand = brandMap[brand];
        currentBrand[line] = 1;
        currentBrand["_TOTAL"] = 1;
      }
    }
  }

}

module.exports.Brand = Brand;