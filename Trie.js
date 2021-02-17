class TrieNode {
  constructor() {
    this.isEnd = false;
    this.freq = 0;
    this.timesInRoot = 0;
    this.timesInBrand = 0;
    this.childrenCounter = 0;
    this.children = {};
    
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(title, statsObj) {
    if (title.length === 0) return; // forbid empty string
    let word;
    let currentNode = this.root;
    for (let i = 0; i < title.length; i++) {
      word = title[i];
      if (!currentNode.children.hasOwnProperty(word)) {
        currentNode.childrenCounter++;
        currentNode.children[word] = new TrieNode();
        currentNode.children[word].timesInRoot++;
        currentNode.children[word].timesInBrand = statsObj[word]
      } else if (currentNode.children.hasOwnProperty(word)) {
        currentNode.children[word].timesInRoot++;
      }
      currentNode = currentNode.children[word];
    }
    currentNode.isEnd = true;

    currentNode.freq++; // = currentNode.freq + 1;
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
    let returnArr = [];
    let currentNode = this.root;
    let i = 0;
    const testArr = [];

    let buildLine = () => {
      for (let word in currentNode.children) {
        console.log(word)
      }
      if(currentNode.children) {
        
      }

    }
    

    // while (5 > i) {
    //   for (let word in currentNode.children) {
    //     currentNode.children[word].timesInRoot > 4 ? testArr.push(word) : null;
    //     currentNode = currentNode.children[word];
    //   }

      //currentNode = currentNode.children[curChar];
    //   i++;
    // }

    // if (currentNode.value === null && key.length === 0) {
    // 	return d;
    // } else {
    // 	return -1;
    // }

    ////////////////
    // for (let i = 0; i < sentence.length; i++) {
    //   word = sentence[i];

    //   if (currentNode.children[word].timesInRoot > 1){
    //     returnArr.push(word)
    //   } else {
    //     return returnArr
    //   };
    //   currentNode = currentNode.children[word];
    // }
    // return returnArr;
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
    return this.getNodeForPrefix(title).timesInRoot;
  }
}

module.exports.Trie = Trie;

/* -------------------- Testing --------------------*/
// let titleArr = ["test1","test2", "test3"]
// let titleArr2 = ["test1","test2"]

// let t = new Trie();
// t.insert(titleArr);
// t.insert(titleArr2);
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
// test = t.getLineArr(titleArr)
// test2 = t.getLineArr(titleArr2)
// console.log(test)
// console.log(test2)
