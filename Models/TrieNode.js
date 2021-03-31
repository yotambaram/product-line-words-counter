
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

  module.exports.TrieNode = TrieNode;