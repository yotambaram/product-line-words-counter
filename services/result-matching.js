

const resultMatching =(trieRoot, titelsArr) => {
   // console.log(trieRoot)
   let newList = []
    //console.log("firstCleanDataArr",titelsArr[0])
    for (let i = 0; i < titelsArr.length; i++) {
        
        if (titelsArr[i].title.length > 1) {
           
                //if word in trieRoot
                // TODO: TRAVERS
               
                    // if find the word, take the next word and loog for here at the tree in world child
                    let line = trieRoot.findLine(titelsArr[i])
                    titelsArr[i].line = line
                    newList.push(titelsArr[i])
    
                    
    
                
            
        } else {
            titelsArr[i].line = "no title"
            newList.push(titelsArr[i])
        }
        
        
    }
    return newList
    

}


module.exports.resultMatching = resultMatching;