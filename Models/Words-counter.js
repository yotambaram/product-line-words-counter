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
      currentNode.children[wordsString].times++;
      currentNode.children[wordsString].name = wordsString;
      currentNode.children[wordsString].children[brand] = 1;
      currentNode.children[wordsString].brandsCounter++;
    } else if (currentNode.children.hasOwnProperty(wordsString)) {
      currentNode.children[wordsString].times++;
      let currentbrand = currentNode.children[wordsString].children[brand]; //++
      if (currentbrand) {
        currentNode.children[wordsString].children[brand]++;
      } else {
        currentNode.children[wordsString].children[brand] = 1;
        currentNode.children[wordsString].brandsCounter++;
      }
    }
  }

  cleanNodes() {
    let currentNode = this.root;
    const wordsKeys = Object.keys(currentNode.children);
    for (let i = 0; i < wordsKeys.length; i++) {
      const element = wordsKeys[i];
      if (currentNode.children[element].times < 3) {
        delete currentNode.children[element];
      } else if (currentNode.children[element].brandsCounter > 1) {
        delete currentNode.children[element];
      } else if (
        currentNode.children[element].brandsCounter === 2 &&
        currentNode.children[element].brandsCounter /
          currentNode.children[element].times <
          0.6
      ) {
        delete currentNode.children[element];
      } else {
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
