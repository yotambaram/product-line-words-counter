const _ = require("lodash");
const { TrieNode } = require("./TrieNode")

<<<<<<< HEAD

const TrieRecursiveDfs = (node, list, StatsTree) => {
  // If the brand has one product:
  if (StatsTree.root.brandMap[node.name] == 1 && node.level == 1) {
=======
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
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
    while (node.childrenCounter == 1 && node.level < 5) {
      childNode = Object.keys(node.children)[0]
      node = node.children[childNode]
    }
    list.push(node.line);
<<<<<<< HEAD

  } else {
    if (

      node.freq / node.timesInBranch > 0.5 &&
      (node.level > 3 || node.childrenCounter === 0)
    ) {
      list.push(node.line);
    } else if (node.timesInBranch < 2 && node.level > 2) {
      list.push(node.line);
    } else if (node.childrenCounter === 0 && node.timesInBranch > 1) {
      list.push(node.line + "," + node.name);
    }

    const childrens = Object.keys(node.children);
    if (node.childrenCounter > 0 && node.timesInBranch > 1 || node.name === "root" || (StatsTree.root.brandMap[node.name] == 1 && node.level == 1)) {
      childrens.forEach((child) => {
        let childNode = node.children[child];
        TrieRecursiveDfs(childNode, list, StatsTree);
=======
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
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
      });
    }
  }

  return list;
};


class TitleWordsTrie {
  constructor() {
    this.root = new TrieNode();
  }
<<<<<<< HEAD
  
=======
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
  insert(title, statsObj) {
    if (title.length === 0) return;
    let currentNode = this.root;
<<<<<<< HEAD
    let word;
    let brand = title[0]
    for (let i = 0; i < title.length; i++) {
      word = title[i];
      if (!currentNode.children.hasOwnProperty(word) && statsObj.root.children[word]) {
=======
    let brand = title[0];
    for (let i = 0; i < title.length; i++) {
      word = title[i];
      if (!currentNode.children.hasOwnProperty(word)) {
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
        currentNode.childrenCounter++;
        currentNode.children[word] = new TrieNode();
        let currentChild = currentNode.children[word];
        currentChild.timesInBranch++;
<<<<<<< HEAD
        currentChild.timesInBrand = statsObj.root.children[word].children[brand]
        currentChild.name = word;
        currentChild.parent = currentNode.name;
        currentChild.level = currentNode.level + 1;
        if (currentNode.parent !== null && currentNode.parent !== "root") {
          currentChild.line = currentNode.line + "," + currentNode.name
        } else if (currentNode.name === brand) {
          currentChild.line = brand
        }
=======
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
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
      } else if (currentNode.children.hasOwnProperty(word)) {
        currentNode.children[word].timesInBranch++;
      }
      currentNode = currentNode.children[word];
    }
    currentNode.freq++;
    currentNode.isEnd = true;
  }
<<<<<<< HEAD

  getLines(StatsTree) {
    return TrieRecursiveDfs(this.root, [], StatsTree);
=======
  getLines(wordsStaticsObj) {
    return dfs(this.root, [], wordsStaticsObj);
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
  }
  findLine(productArr) {
    let currentNode = this.root;
<<<<<<< HEAD
    let brand = productsArr[0].toLowerCase();


    if (currentNode.children[brand]) {
      currentNode = currentNode.children[brand];
      let wordStats = {};

      for (let i = 0; i < productsArr.length; i++) {
        let word = productsArr[i];
        if (currentNode.children[word] && word != brand) {
          wordStats[word] = currentNode.children[word].timesInBrand;
        }
      }


      let max = 0;
      let startsWord = "";
      let year = 0

      // Get the most common word
      for (let word in wordStats) {
=======
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
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
        if (wordStats[word] > max) {
          max = wordStats[word];
          startsWord = word;
        }
      }
<<<<<<< HEAD



      let productLineString;
      // Get startsWord
      let maxWordIndex = productsArr.indexOf(startsWord)
      // If there are no statsword, take all product line
      if (maxWordIndex == -1) {
        productLineString = productsArr.join(",")
      } else {

        // Checks if the word before Start word is part of the line
        if (productsArr[maxWordIndex - 1] in wordStats && currentNode.children[productsArr[maxWordIndex - 1]].timesInBranch > 2) {
          startsWord = productsArr[maxWordIndex - 1]
          maxWordIndex--
        }

        // Check if the bigest has parent or chile to find where to start



        //console.log(currentNode.name)
        currentNode = currentNode.children[startsWord]
        if (!currentNode) {
          debugger
        }


        productLineString = currentNode.line; + "," + currentNode.name;
        while (currentNode.freq / currentNode.timesInBranch < 0.6) {

          maxWordIndex++
          if (currentNode.children[productsArr[maxWordIndex]]) {
            currentNode = currentNode.children[productsArr[maxWordIndex]]
            productLineString = currentNode.line
          } else { break }
        }
      }




      //   let parentToStartWith
      //  for (currentNode.children[startsWord].parent in wordStats){
      //     let parentToStartWith = currentNode.children[startsWord].parent
      //     currentNode = currentNode.children[parentToStartWith]
      //   }
      //   results = currentNode.line + "," + currentNode.name;
      //results11 = currentLn.replace(/[,]/g, " ").replace(brand, "").trim()
      return productLineString;
=======
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
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
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
