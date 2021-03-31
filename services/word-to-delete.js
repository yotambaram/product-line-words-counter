
//TODO: Make here function that takes word to delete from DB

<<<<<<< HEAD
let wordToDelete = {
=======
const wordsCleaner = {
  wordsMap: {
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
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
<<<<<<< HEAD
    "2 Weeks Delivery!": true,


    wordsCleaner(stringTitle){
        const wordToDeleteArr = Object.keys(this.wordToDelete)
        // 
        let cleanedWord
        wordToDeleteArr.forEach(element => {
          cleanedWord = stringTitle.replace(element, "").trim();
          
        });
        return cleanedWord
      }

    

  
  
  };

  module.exports.wordToDelete = wordToDelete;
=======
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
>>>>>>> 54da39d4040b0326a31577f99abc563383f7903e
