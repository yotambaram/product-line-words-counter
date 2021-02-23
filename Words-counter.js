const { forEach } = require("lodash");

class TrieNode {
  constructor() {
    this.name = "root";
    this.times = 0;
    this.children = {};
  }
}

class WordsCounter {
  constructor() {
    this.root = new TrieNode();
  }

  insert(wordsString, brand) {
   
    if (wordsString.length === 0) return; // forbid empty string
    let currentNode = this.root;
     //let currentChild = currentNode.children[wordsString]
    currentNode.times++
      if (!currentNode.children.hasOwnProperty(wordsString)) {
        //currentNode.childrenCounter++;
        currentNode.children[wordsString] = new TrieNode();
        currentNode.children[wordsString].times++;
        currentNode.children[wordsString].name = wordsString;
        currentNode.children[wordsString].children[brand] = 1;
        //currentNode.children[wordsString] = wordsString;
        //currentNode.children[wordsString].parent = currentNode.name;
      } 
      else if (currentNode.children.hasOwnProperty(wordsString)) {
        currentNode.children[wordsString].times++;
        let currentbrand = currentNode.children[wordsString].children[brand]//++
        currentbrand ? currentNode.children[wordsString].children[brand]++ : currentNode.children[wordsString].children[brand] = 1;
        let re;
      }
      // currentNode = currentNode.children[wordsString];
  //  // console.log(currentNode)
  //   currentNode.freq++;
  //   currentNode.isEnd = true;
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

  getLineArr() {
    let currentNode = this.root;
    const output = {};
    const stack = [];

    while (stack.length > 0) {
      currentNode = stack[stack.length - 1];
      output[currentNode.name];
      if (currentNode.childrenCounter > 0) {
        for (let word in currentNode.children) {
          stack.push(currentNode.children[word]);
        }
      } else {
        console.log(output);
      }
    }
  }

  issentencArr(wordsString) {
    if (this.getNodeForPrefix(wordsString) === null) return false;
    return this.getNodeForPrefix(wordsString).isEnd;
  }

  getsentencArrFreq(wordsString) {
    if (this.getNodeForPrefix(wordsString) === null) return false;
    return this.getNodeForPrefix(wordsString).freq;
  }
}

module.exports.WordsCounter = WordsCounter;
