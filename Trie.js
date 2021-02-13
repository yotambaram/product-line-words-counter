class TrieNode {
  constructor() {
    this.isEnd = false;
    this.freq = 0;
    this.times = 0;
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(title) {
    if (title.length === 0) return; // forbid empty string
    let word;
    let currentNode = this.root;
    for (let i = 0; i < title.length; i++) {
      word = title[i];
      if (!currentNode.children.hasOwnProperty(word)) {
        currentNode.children[word] = new TrieNode();
        currentNode.times += 1;
      } else if (currentNode.children.hasOwnProperty(word)) {
        currentNode.times += 1;
      }
      currentNode = currentNode.children[word];
    }
    currentNode.isEnd = true;
    currentNode.times += 1;
    currentNode.freq = currentNode.freq + 1;
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

  getLineArr(sentence) {
    let word;
    let returnArr = []
    let currentNode = this.root;
    for (let i = 0; i < sentence.length; i++) {
      word = sentence[i];
    
      if (currentNode.times > 2){
        returnArr.push(word)  
      }else{
        return returnArr
      };
      currentNode = currentNode.children[word];
    }
    return returnArr;
  }

  issentencArr(title) {
    if (this.getNodeForPrefix(title) === null) return false;
    return this.getNodeForPrefix(title).isEnd;
  }

  getsentencArrFreq(title) {
    if (this.getNodeForPrefix(title) === null) return false;
    return this.getNodeForPrefix(title).freq;
  }

  getsentencArrTimes(title) {
    if (this.getNodeForPrefix(title) === null) return false;
    return this.getNodeForPrefix(title).times;
  }
}

/* -------------------- Testing --------------------*/


// let t = new Trie();
// t.insert(ace);
// t.insert(ace2);
// // console.log(t.issentencArr(ace))	  // true
// t.insert(ww);
//t.insert(ace)
// console.log(t.issentencArr(ace)); // true
// console.log(t.getsentencArrFreq(ace)); // 2

// t.insert(at);
// // console.log(t.issentencArr(at)); // true
// // console.log(t.getsentencArrFreq(at)); // 1

// // t.insert(cat)
// // t.insert(cat)
// // // console.log(t.issentencArr(cat))     // true
// // // console.log(t.getsentencArrFreq(cat))// 2
// // t.insert(cat)
// console.log(t.print(ace)); // 3

// t.insert(cab)
// console.log(t.issentencArr(cab))     // true
// console.log(t.getsentencArrFreq(cab))// 1

//t.insert(of)
// console.log(t.issentencArr(of))     // true
// console.log(t.getsentencArrFreq(of))// 1

// check the internal representation of the Trie

//console.log(t.root)


module.exports.Trie = Trie;
