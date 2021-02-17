class WordCounter {
    count = (titleArr, words) => {
      for (let i = 0; i < titleArr.length; i++) {
        const title = titleArr[i];
        title.forEach(word => {
          !words[word] ? words[word] = 1 : words[word] += 1
          words["_TOTAL_ALL_WORDS"]++
        });
        
      }
        
        
       // words["_TOTAL_WORDS"] = (this.sumValues(words)) - (words["_TOTAL_ALL_WORDS"])
      
      return words

    }
    
    
    sumValues = words => Object.values(words).reduce((a, b) => a + b);
  }

  module.exports.WordCounter = WordCounter;