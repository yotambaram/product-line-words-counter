

const resultMatching =(trieRoot, titleArr) => {
    console.log(trieRoot)
    console.log("firstCleanDataArr",titleArr)
    for(let i = 0; titleArr.length -1; i++) {
        if (i == titleArr.length) {
            debugger
        }
        let title = titleArr[i].title
        let splitedTitle = title.split(" ")
        for (let j = 1; j < splitedTitle.length-1; j++) {
            const element = splitedTitle[j];
            console.log(element)
            
        }
    }


}


module.exports.resultMatching = resultMatching;