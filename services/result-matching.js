const resultMatching = (trieRoot, productArr) => {
  let newList = [];
 // let linesMap = new Map()
  for (let i = 0; i < productArr.length; i++) {
    if (productArr[i].title.length > 1) {
      // if find the word, take the next word and loog for here at the tree in world child

      let line = trieRoot.findLine(productArr[i]);
      let brand = productArr[i].brand
     // productArr[i].line = line;
      newList.push({ brand: brand, line: line});
      //  !linesMap[line] ? linesMap[line] = 1 : linesMap[line]++
    } 
    //else {
     // productArr[i].line = "### No Title ###";
    //  newList.push(productArr[i]);
   // }
  }
 
  return newList;
};

module.exports.resultMatching = resultMatching;