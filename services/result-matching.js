const resultMatching = (trieRoot, titlesArr, splitedTitle) => {
  let newList = [];

  for (let i = 0; i < titlesArr.length; i++) {
  //  if(splitedTitle[i][0] === "uppababy" && splitedTitle[i][1] === "2018" && splitedTitle[i][2] === "vista"){
  //    debugger
  //  }
    if (titlesArr[i].title.length > 1) {
      // if find the word, take the next word and loog for here at the tree in world child
      let line = trieRoot.findLine(titlesArr[i], splitedTitle[i]);
      titlesArr[i].line = line;
      newList.push(titlesArr[i]);
    } else {
      titlesArr[i].line = "### No Title ###";
      newList.push(titlesArr[i]);
    }
  }
 
  return newList;
};

module.exports.resultMatching = resultMatching;
