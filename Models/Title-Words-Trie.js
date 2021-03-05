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
  } else if (node.timesInRoot === 1 && node.level > 3) {
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

  findLine(productNode) {
    let currentNode = this.root;
    let brand = productNode.brand.toLowerCase();
    // if (productNode.brand==="Blu-Pier Technology, Inc.") {
    //   debugger
    // }

    if (currentNode.children[brand]) {
      currentNode = currentNode.children[brand];
      // get title arr
      let splitedTitle = productNode.title
        .toLowerCase()
        .replace(/[|&;$%@"<>(),]/g, "")
        .trim()
        .replace(/[{()}]/g, "")
        .trim()
        .replace(/\\|\//g, " ")
        .trim()
        .replace(/[\[\]']+/g, "")
        .trim()
        //.replace("-", " ")
        .replace(" +", " ")
        .replace("- ", " ")
        .replace(" -", " ")
        .replace(brand, "")
        .replace(/\s+/g, " ")
        .trim()
        // .replace(/\s+/g, '');
        .split(" ");

      // splitedTitle[0] === brand ? splitedTitle.shift() : null;

      //let currentLn;
      let results;
      let gotLine = false;
      let wordStats = {};

      for (let i = 0; i < splitedTitle.length; i++) {
        const word = splitedTitle[i];
        
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
      let maxWord = "";
      // Get the biggest
      for (let word in wordStats) {
        if (word == "81260kit1") {
          debugger;
        }
        if (wordStats[word] > max) {
          max = wordStats[word];
          maxWord = word;
        }
      }
      // Check if the bigest has parent or chile to find where to start
    
      if (currentNode.children[maxWord] && currentNode.children[maxWord].parent in wordStats){
        parentToStartWith = currentNode.children[maxWord].parent
        currentNode = currentNode.children[parentToStartWith]
      }
      results = currentNode.line + "," + currentNode.name;
      //results11 = currentLn.replace(/[,]/g, " ").replace(brand, "").trim()
      return results;
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
