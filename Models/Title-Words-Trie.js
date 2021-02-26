const { forEach } = require("lodash");

class TrieNode {
  constructor() {
    this.name = "root";
    this.parent = null;
    this.line = null;
    //this.isEnd = false;
    this.freq = 0;
    this.timesInRoot = 0;
    this.timesInBrand = 0;
    this.childrenCounter = 0;
    this.children = {};
  }
}

class TitleWordsTrie {
  constructor() {
    this.root = new TrieNode();
  }

  idNumberBuilder = (currentNum) => {
    return currentNum + 1;
  };
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
        currentChild.line =
          currentNode.line === null || currentNode.line === "root"
            ? currentNode.name
            : currentNode.line +
              "," +
              currentChild.parent +
              "," +
              currentChild.name;
      } else if (currentNode.children.hasOwnProperty(word)) {
        currentNode.children[word].timesInRoot++;
      }
      currentNode = currentNode.children[word];
    }
    currentNode.freq++;
   // currentNode.isEnd = true;
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

  issentencArr(title) {
    if (this.getNodeForPrefix(title) === null) return false;
    return this.getNodeForPrefix(title).isEnd;
  }

  getsentencArrFreq(title) {
    if (this.getNodeForPrefix(title) === null) return false;
    return this.getNodeForPrefix(title).freq;
  }
}

module.exports.TitleWordsTrie = TitleWordsTrie;

// getsentencArrTimes(title) {
//   if (this.getNodeForPrefix(title) === null) return false;
//   return this.getNodeForPrefix(title).timesInRoot;
// }

// findAllWords(node, arr) {
//   // base case, if node is at a word, push to output
//   if (node.childrenCounter > 0) {
//     test = this.getWord();
//     arr.unshift(node.test);
//   }
//   // iterate through each children, call recursive findAllWords
//   for (var child in node.children) {
//     this.findAllWords(node.children[child], arr);
//   }
// }

// getWord() {
//   var output = [];
//   var node = this;

//   while (node !== null) {
//     node.name ? output.unshift(node.name) : null;
//     node = node.children;
//   }

//   return output.join("");
// }
/* -------------------- Testing --------------------*/
// let titleArr = ["test1","test2", "test3"]
// let titleArr2 = ["test1","test2"]

// let t = new Trie();
// t.insert(titleArr);
// t.insert(titleArr2);
// t.insert(ace2);

// t.insert(ww);
//t.insert(ace)

// t.insert(at);

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

// function rec(node) {
//   let currentNode = node;
//   if(currentNode.childrenCounter > 0) {
//     for (let word in currentNode.children) {
//       output.push(word)
//       console.log(word)
//       return rec(currentNode.children[word])
//     }

//   } else {
//     console.log("no")
//     return rec(node)
//   }

// }
// rec(rootNode)

//     for (let word in currentNode.children) {
//       if (currentNode.children[word].childrenCounter > 0) {
//         currentNode = currentNode.children[word];
//         test.push(word)
//         console.log(test)
//         return rec(currentNode);
//       } else {
//        // console.log("DONE", word);
//       }
//       if (currentNode.children[word].timesInRoot > 5) {
//         test.push(word);
//       }

//     }
//   };
//   rec(currentNode);
//   return "%$#%#$%#$% getLineArr return";

////////////
// for every character in the prefix

//  for (let word in currentNode.children) {
//   // make sure prefix actually has words
//   if (currentNode.children[word]) {
//     currentNode = currentNode.children[word];
//   } else {
//     // there's none. just return it.
//     return output;
//   }
// }

// recursively find all words in the node
// this.findAllWords(currentNode, output);
// return output;
// };

// recursive function to find all words in the given node.

////////////

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

//stack.push(currentNode);

// let dfs = (currentNode) => {
//   if (Object.keys(currentNode.children).length > 0) {
//     for (const word of Object.keys(currentNode.children)) {
//       stack.push(word);
//       currentNode = currentNode.children[word];
//       //console.log(word)
//       dfs(currentNode);
//     }
//   }
// };
// dfs(currentNode);
