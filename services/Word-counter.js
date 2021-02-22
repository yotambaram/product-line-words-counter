const wordsCounter = (counter) => {
  counter++;
  return counter;
}
const brandsCounter = (brandArr, brand) => {
  brandArr.push(brand);
  return brandArr;
} 


class WordCounter {
    count = (titleArr) => {
      let words = { _TOTAL_ALL_WORDS: 0, _TOTAL_PRODUCTS: titleArr.length};
      for (let i = 0; i < titleArr.length; i++) {
        //const title = titleArr[i];
        titleArr[i].forEach(word => {
          let currentBrand = titleArr[i][0].toLowerCase()
          let lowWord = word.toLowerCase()
          !words[lowWord] ? words[lowWord] = {count: 1, brand: [currentBrand]} 
                          : words[lowWord] = {count: wordsCounter(words[lowWord].count),
                                              brand: brandsCounter(words[lowWord].brand, currentBrand)};
          words["_TOTAL_ALL_WORDS"]++
        });
      } 
       // words["_TOTAL_WORDS"] = (this.sumValues(words)) - (words["_TOTAL_ALL_WORDS"])
    
      return words
    }
    
    
    sumValues = words => Object.values(words).reduce((a, b) => a + b);
  }

  module.exports.WordCounter = WordCounter;