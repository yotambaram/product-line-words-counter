const resultMatching = (trieRoot, productArr) => {
  let newList = [];
 // let linesMap = new Map()
  for (let i = 0; i < productArr.length; i++) {
    if (productArr[i].length > 1) {
      // if find the word, take the next word and loog for here at the tree in world child 
     
      let line = trieRoot.findLine(productArr[i]);
     // let brand = productArr[0]
     // productArr[i].line = line;
     if(!line) {
       line = "NO LINE FOUND"
     }
      newList.push(line);
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