const { forEach, keys } = require("lodash");

class TreeNode {
  constructor() {
    this.name = "root";
    this.times = 0;
    this.brandsCounter = 0;
    this.children = {};
    //this.brandKeys = []
  }
}

class WordsCounter {
  constructor() {
    this.root = new TreeNode();
  }

  insert(wordsString, brand) {

    if (wordsString.length === 0) return; // empty string
    let currentNode = this.root;

    //let currentChild = currentNode.children[wordsString]
    currentNode.times++;
    if (!currentNode.children.hasOwnProperty(wordsString)) {
      //currentNode.childrenCounter++;
      currentNode.children[wordsString] = new TreeNode();
      let currentChild = currentNode.children[wordsString]
      currentChild.times++;
      currentChild.name = wordsString;
      currentChild.children[brand] = 1;
      currentChild.brandsCounter++;
    } else {
      let currentChild = currentNode.children[wordsString]
      currentChild.times++;
      let currentbrand = currentChild.children[brand]; //++
      if (currentbrand) {
        currentChild.children[brand]++;
      } else {
        currentChild.children[brand] = 1;
        currentChild.brandsCounter++;
      }
    }
  }

  cleanNodes() {
    let currentNode = this.root;
    const wordsKeys = Object.keys(currentNode.children);
    for (let i = 0; i < wordsKeys.length; i++) {
      let element = currentNode.children[wordsKeys[i]];
      if (element.times < 3) {
        delete currentNode.children[element];
      } else if (element.brandsCounter > 1) {
        delete currentNode.children[element];
      } else if (
        element.brandsCounter === 2 &&
        element.brandsCounter /
        element.times <
          0.6
      ) {
        delete currentNode.children[element];
      } 
    }
    let wordsKeys2 = Object.keys(currentNode.children);
    currentNode.times = wordsKeys2.length;

    return this
  }


  cleanWords(wordsStatsObj) {
  
    let currentNode = this.root;
    const wordsKeys = Object.keys(currentNode.children);
 
  }
}

module.exports.WordsCounter = WordsCounter;
