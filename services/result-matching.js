const resultMatching = (trieRoot, productArr) => {
  for (let i = 0; i < productArr.length; i++) {
<<<<<<< HEAD
    if (productArr[i].length > 1) {
      // if find the word, take the next word and loog for here at the tree in world child 
     
      let line = trieRoot.findLine(productArr[i]);
     // let brand = productArr[0]
     // productArr[i].line = line;
     if(!line) {
      
       line = productArr[i]
     }
      newList.push(line);
      //  !linesMap[line] ? linesMap[line] = 1 : linesMap[line]++
    } 
    //else {
     // productArr[i].line = "### No Title ###";
    //  newList.push(productArr[i]);
   // }
=======
    if (productArr[i].filteredTitle.length > 1) {
      let line = trieRoot.findLine(productArr[i].filteredTitle);
      if (!line) {
        line = productArr[i].filteredTitle
      }
      if (typeof (line) === "string") {
        line = line.split(",");
      }

      productArr[i].filteredTitle = line
    }
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
  }
  return productArr;
};

module.exports.resultMatching = resultMatching;