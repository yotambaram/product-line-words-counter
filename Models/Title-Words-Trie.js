const { forEach, result } = require("lodash");
const _ = require("lodash");

class TrieNode {
  constructor() {
    this.name = "root";
    this.parent = null;
    this.line = null;
    this.isEnd = false;
    this.freq = 0;
    this.timesInBranch = 0;
    this.timesInBrand = 0;
    this.childrenCounter = 0;
    this.children = {};
    this.level = 0;
  }
}

const dfs = (node, list, StatsObj) => {
  if (node.level == 1 && StatsObj.root.brandMap[node.name] == 1) {
    while (node.childrenCounter == 1 && node.level < 5) {
      childNode = Object.keys(node.children)[0]
      node = node.children[childNode]
    }
    list.push(node.line);
  } else {
    if (
      node.freq / node.timesInBranch > 0.5 &&
      (node.level > 3 || node.childrenCounter === 0)
    ) {
      list.push(node.line + "," + node.name);
    } else if (node.timesInBranch < 2 && node.level > 2 && node.parent) {
      list.push(node.line);
    } else if (node.childrenCounter === 0 && node.timesInBranch > 1) {
      list.push(node.line + "," + node.name);
    }

    const childrens = Object.keys(node.children);
    if (node.level === 0 || node.timesInBranch > 1 && node.level < 4) {
      let t = node.timesInBranch
      childrens.forEach((child) => {
        let childNode = node.children[child];
        dfs(childNode, list, StatsObj);
      });
    }
  }

  return list;
};

class TitleWordsTrie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(title, statsObj) {
    if (title.length === 0) return; // forbid empty string
    let word;
    let currentNode = this.root;
    let brand = title[0];
    for (let i = 0; i < title.length; i++) {
      word = title[i];
      if (!currentNode.children.hasOwnProperty(word)) {
        currentNode.childrenCounter++;
        currentNode.children[word] = new TrieNode();
        let currentChild = currentNode.children[word];
        currentChild.timesInBranch++;
        if (!statsObj.root.children[word]) {
          debugger
        }
        currentChild.timesInBrand = statsObj.root.children[word].children[brand];
        currentChild.name = word;
        currentChild.parent = currentNode.name;
        currentChild.level = currentNode.level + 1;
        currentChild.line =
          currentNode.line === null || currentNode.line === "root"
            ? currentNode.name
            : currentNode.line + "," + currentChild.parent; //+
      } else if (currentNode.children.hasOwnProperty(word)) {
        currentNode.children[word].timesInBranch++;
      }
      currentNode = currentNode.children[word];
    }
    currentNode.freq++;
    currentNode.isEnd = true;
  }
  getLines(wordsStaticsObj) {
    return dfs(this.root, [], wordsStaticsObj);
  }
  findLine(productArr) {
    let currentNode = this.root;
    let brand = productArr[0].toLowerCase();
    let productLine
    if (currentNode.children[brand]) {
      currentNode = currentNode.children[brand];
      let wordStats = {};
      for (let i = 0; i < productArr.length; i++) {
        const word = productArr[i];
        if (currentNode.children[word] && word != brand) {
          wordStats[word] = currentNode.children[word].timesInBranch;
        }
      }
      let max = 0;
      let startsWord = "";
      let year = 0
      for (let word in wordStats) {
        if (!isNaN(word)) {
        }
        if (wordStats[word] > max) {
          max = wordStats[word];
          startsWord = word;
        }
      }
      let maxWordIndex = productArr.indexOf(startsWord)
      if (productArr[maxWordIndex - 1] in wordStats && currentNode.children[productArr[maxWordIndex - 1]].timesInBranch > 2) {
        startsWord = productArr[maxWordIndex - 1]
        maxWordIndex--
      }
      if (currentNode.children[startsWord]) {
        currentNode = currentNode.children[startsWord]
        productLine = currentNode.line + "," + currentNode.name;
        while (currentNode.freq / currentNode.timesInBranch < 0.6) {
          maxWordIndex++
          if (currentNode.children[productArr[maxWordIndex]]) {
            currentNode = currentNode.children[productArr[maxWordIndex]]
            productLine = currentNode.line + "," + currentNode.name
          } else { break }
        }
      } else {
        productLine = productArr.join(",")
        let f;
      }
      if (!productLine) {
        debugger
      }
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
