
//let input = cleanedRegExp.split(" ", 3);
let input = ["5544gf", "fsdfsdfdsfs65","53gdgdfgdf4534"]

const toDeletArr = []
input.forEach(word => {
  let numCounter = 0
  for (let i = 0; i < word.length; i++) {
   
    const element = word[i];
    !isNaN(element) ? numCounter++ : null;  
    if (numCounter > 3 ) {
      (toDeletArr.push(word))
     break
    }
  }

  
});