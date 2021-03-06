const { forEach, result } = require("lodash");
const _ = require("lodash");

class TrieNode {
  constructor() {
    this.name = "root";
    this.parent = null;
    this.line = null;
    this.isEnd = false;
    this.freq = 0;
    this.timesInRoot = 0;
    this.timesInBrand = 0;
    this.childrenCounter = 0;
    this.children = {};
    this.level = 0;
  }
}

const dfs = (node, list) => {
  // If the brand has one product:

  //else:
  if (
    node.freq / node.timesInRoot > 0.5 &&
    (node.level > 3 || node.childrenCounter === 0)
  ) {
    list.push(node.line + "," + node.name);
  } else if (node.timesInRoot < 2 && node.level > 2) {
    list.push(node.line);
  } else if (node.childrenCounter === 0 && node.timesInRoot > 1) {
    list.push(node.line + "," + node.name);
  }

  const childrens = Object.keys(node.children);
  if ((node.childrenCounter > 0 && node.timesInRoot > 1) || node.level < 4) {
    childrens.forEach((child) => {
      let childNode = node.children[child];
      dfs(childNode, list);
    });
  }

  return list;
};

class TitleWordsTrie {
  constructor() {
    this.root = new TrieNode();
  }

  // idNumberBuilder = (currentNum) => {
  //   return currentNum + 1;
  // };

  insert(title, statsObj) {
    if (title.length === 0) return; // forbid empty string
    let word;
    let currentNode = this.root;
    for (let i = 0; i < title.length; i++) {
      word = title[i];

      if (!currentNode.children.hasOwnProperty(word)) {
        currentNode.childrenCounter++;
        currentNode.children[word] = new TrieNode();
        let currentChild = currentNode.children[word];
        currentChild.timesInRoot++;
        currentChild.timesInBrand = statsObj[word];
        currentChild.name = word;
        currentChild.parent = currentNode.name;
        currentChild.level = currentNode.level + 1;
        currentChild.line =
          currentNode.line === null || currentNode.line === "root"
            ? currentNode.name
            : currentNode.line + "," + currentChild.parent; //+
        // "," +
        // currentChild.name;
      } else if (currentNode.children.hasOwnProperty(word)) {
        currentNode.children[word].timesInRoot++;
      }
      currentNode = currentNode.children[word];
    }
    currentNode.freq++;
    currentNode.isEnd = true;
  }

  getLines() {
    return dfs(this.root, []);
  }

  findLine(productsArr) {
    let currentNode = this.root;
    let brand = productsArr[0].toLowerCase();

    
    if (currentNode.children[brand]) {
      currentNode = currentNode.children[brand];
      let results;
      let gotLine = false;
      let wordStats = {};

      for (let i = 0; i < productsArr.length; i++) {
        const word = productsArr[i];
        
        ///////////
        //Baby Jogger 81260KIT1 2011 City Select Stroller with Bassinet - Onyx
        if (currentNode.children[word] && word != brand) {
          wordStats[word] = currentNode.children[word].timesInRoot;
        }
      
        //////////
        // if(currentNode.children[word] && word != brand){
        //   gotLine = true;
        //   currentNode = currentNode.children[word]
        // } else if(gotLine === true  && word != brand) {
        //   break
        // }
      }
      // let max = Object.keys(wordStats).reduce((a, b) => wordStats[a] > wordStats[b] ? a : b);
     
      let max = 0;
      let startsWord = "";
      let year = 0
      // Get the biggest
      
      for (let word in wordStats) {
       
       
        if ( !isNaN(word)) {
          //check if its a year
        }
        if (wordStats[word] > max) {
          max = wordStats[word];
          startsWord = word;
        }
       

      }

      let maxWordIndex = productsArr.indexOf(startsWord)
      if (productsArr[maxWordIndex -1] in wordStats && currentNode.children[productsArr[maxWordIndex -1]].timesInRoot > 2) {
        startsWord = productsArr[maxWordIndex -1]
        maxWordIndex--
      }

      // Check if the bigest has parent or chile to find where to start
      
        // if(currentNode.name==="uppababy") {
        //   debugger
        // }
  
     //console.log(currentNode.name)
        currentNode = currentNode.children[startsWord]
        if(!currentNode){
          debugger
        }
        
      
    let productLine = currentNode.line + "," + currentNode.name;
        while(currentNode.freq / currentNode.timesInRoot < 0.6) {
          
          maxWordIndex++
          if(currentNode.children[productsArr[maxWordIndex]]) {
            currentNode = currentNode.children[productsArr[maxWordIndex]]
            productLine = currentNode.line + "," + currentNode.name
          } else{break}
        }
       
     
    

    //   let parentToStartWith
    //  for (currentNode.children[startsWord].parent in wordStats){
    //     let parentToStartWith = currentNode.children[startsWord].parent
    //     currentNode = currentNode.children[parentToStartWith]
    //   }
    //   results = currentNode.line + "," + currentNode.name;
      //results11 = currentLn.replace(/[,]/g, " ").replace(brand, "").trim()
      return productLine;
    }
  }

  getNodeForPrefix(sentence) {
    let word;
    let currentNode = this.root;
    for (let i = 0; i < sentence.length; i++) {
      word = sentence[i];
      if (!currentNode.children.hasOwnProperty(word)) return null;
      currentNode = currentNode.children[word];
    }
    return currentNode;
  }
}

module.exports.TitleWordsTrie = TitleWordsTrie;
