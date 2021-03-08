const resultMatching = (trieRoot, productArr) => {
  let newList = [];
  for (let i = 0; i < productArr.length; i++) {
    if (productArr[i].filteredTitle.length > 1) {
      let line = trieRoot.findLine(productArr[i].filteredTitle);
     if(!line) {
      line = productArr[i].filteredTitle
     }
     if(typeof(line) === "string") {
      line = line.split(",");
     }
    
     productArr[i].filteredTitle = line
    } 
  }
 
  return productArr;
};

module.exports.resultMatching = resultMatching;