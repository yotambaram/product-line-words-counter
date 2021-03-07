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

const dfs = (node, list, StatsTree) => {
  // If the brand has one product:
  if (StatsTree.root.brandMap[node.name] == 1 && node.level == 1) {
    while (node.childrenCounter == 1 && node.level < 5) {
      childNode = Object.keys(node.children)[0]
      node = node.children[childNode]
    }
    list.push(node.line);

  // } 
  // else if (StatsTree.root.brandMap[node.name] == 2 && node.level == 1) {
  //   if(node.childrenCounter > 0 && node.level > 2) {
  //     list.push(node.line);
  //   }
  //   const childrens = Object.keys(node.children);

  //   if (node.childrenCounter > 0 && node.timesInBranch > 1 || node.name === "root" || (StatsTree.root.brandMap[node.name] == 1 && node.level == 1)) {
  //     childrens.forEach((child) => {
  //       let childNode = node.children[child];
  //       dfs(childNode, list, StatsTree);
  //     })
  //   }
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
        dfs(childNode, list, StatsTree);
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
    let currentNode = this.root;
    let word;
    let brand = title[0]

    for (let i = 0; i < title.length; i++) {
      word = title[i];

      if (!currentNode.children.hasOwnProperty(word)) {
        currentNode.childrenCounter++;
        currentNode.children[word] = new TrieNode();
        let currentChild = currentNode.children[word];
        currentChild.timesInBranch++;
        currentChild.timesInBrand = statsObj.root.children[word].children[brand]
        currentChild.name = word;
        currentChild.parent = currentNode.name;
        currentChild.level = currentNode.level + 1;

        currentChild.line =
          currentNode.line === null || currentNode.line === "root"
            ? currentChild.name
            : currentNode.line + "," + currentChild.name; //+
        // "," +
        // currentChild.name;
      } else if (currentNode.children.hasOwnProperty(word)) {
        currentNode.children[word].timesInBranch++;
      }
      currentNode = currentNode.children[word];
    }
    currentNode.freq++;
    currentNode.isEnd = true;
  }

  getLines(StatsTree) {
    // console.log(StatsTree)
    return dfs(this.root, [], StatsTree);
  }

  findLine(productsArr) {
    let currentNode = this.root;
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
      // Get the biggest
      for (let word in wordStats) {
        if (wordStats[word] > max) {
          max = wordStats[word];
          startsWord = word;
        }
      }



      let productLineString;
      let maxWordIndex = productsArr.indexOf(startsWord)

      if (maxWordIndex == -1) {
        productLineString = productsArr.join(",")
      } else {


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


        productLineString = currentNode.line + "," + currentNode.name;
        while (currentNode.freq / currentNode.timesInBranch < 0.6) {

          maxWordIndex++
          if (currentNode.children[productsArr[maxWordIndex]]) {
            currentNode = currentNode.children[productsArr[maxWordIndex]]
            productLineString = currentNode.line + "," + currentNode.name
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
