
//TODO: Make here function that takes word to delete from DB

const wordsCleaner = {
  wordsMap: {
    "for": true,
    "to": true,
    "from": true,
    "with": true,
    //sand: true,
    "best": true,
    "inc": true,
    "2-in-1": true,
    "3-in-1": true,
    "4-in-1": true,
    "5-in-1": true,
    "2 in 1": true,
    "3 in 1": true,
    "4 in 1": true,
    "5 in 1": true,
    "2-in1": true,
    "2 weeks delivery!": true,
    "best": true,
    "white": true,
    "black": true,
    "yellow": true,
    "grey": true,
    "navy": true,
    "red": true,
    "pink": true,
    "blue": true,
    "2 Weeks Delivery!": true

  },

  deleteWords(stringTitle) {
    if (stringTitle.length > 0) {
      const wordToDeleteArr = Object.keys(this.wordsMap)
      // 
      let cleanedWord
      wordToDeleteArr.forEach(element => {
        cleanedWord = stringTitle.replace(element, "").trim();
      });
      return cleanedWord
    }
    return ""
  }
}







module.exports.wordsCleaner = wordsCleaner;