const { forEach, result } = require("lodash");

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
 if(node.freq / node.timesInRoot > 0.5 && (node.level > 3 || node.childrenCounter === 0)) {
  list.push(node.line + "," + node.name);
 }
  else if (node.timesInRoot === 1 && node.level > 3) {
    list.push(node.line);
  } else if (node.childrenCounter === 0 && node.timesInRoot > 1) {
    list.push(node.line + "," + node.name);
  }

  const childrens = Object.keys(node.children);
  if (node.childrenCounter > 0 && node.timesInRoot > 1 || node.level < 4) {
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
        currentChild.level = currentNode.level + 1
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
 
    if (currentNode.children[brand]) {
      currentNode = currentNode.children[brand];
      // get title arr
      let splitedTitle = productNode.title.toLowerCase()
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
      for (let i = 0; i < splitedTitle.length; i++) {
        const word = splitedTitle[i]
        if(currentNode.children[word] && word != brand){
          gotLine = true;
          currentNode = currentNode.children[word]
        } else if(gotLine === true  && word != brand) {
          break
        }
      }
      results = currentNode.line+","+currentNode.name
      //results11 = currentLn.replace(/[,]/g, " ").replace(brand, "").trim()
      return results
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