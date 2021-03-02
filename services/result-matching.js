

const resultMatching =(trieRoot, titlesArr) => {
   // console.log(trieRoot)
    console.log("firstCleanDataArr",titlesArr[0])
    for (let i = 0; i < titlesArr.length; i++) {
        let brand = titlesArr[i].brand.toLowerCase();
        let title = titlesArr[i].title.toLowerCase();
        splitedTitle = title.split(" ")
        let titleString ="";
        for (let j = 1; j < splitedTitle.length; j++) {
            const word = splitedTitle[j];
            //if word in trieRoot
            // TODO: TRAVERS
            if( word in trieRoot.root.children[brand].children) {
                // if find the word, take the next word and loog for here at the tree in world child
                titleString += word

                

            }
            
        }
        console.log(titleString)
        
    }
    

}


module.exports.resultMatching = resultMatching;