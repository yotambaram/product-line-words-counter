const _ = require("lodash");

const dataCleaner = (allTitlesArr, oneWordStat) => {
    let splitTitlesArr = [];
    
    for (let i = 0; i < allTitlesArr.length; i++) {
      let currentBrand = allTitlesArr[i][0]
      // TODO: oneWordStat[el] < 2 - > use statics to delete (%) 
      _.remove(allTitlesArr[i], (el) => {
        //word = el.toLowerCase()
        if(el === "" ) {
          return false
        } 
        return el.length < 2 
        || !el in oneWordStat 
        || oneWordStat.root["_TOTAL_PRODUCTS"] > 10 ? oneWordStat.root.children[el].times < 3 : false
        || oneWordStat.root["_TOTAL_PRODUCTS"] > 10 ?  oneWordStat.root.children[el].times / oneWordStat.root["_TOTAL_PRODUCTS"] > 0.6 : false
        /*|| !isNaN(el) || oneWordStat[el] < 2*/
      });
      allTitlesArr[i].unshift(currentBrand)
      splitTitlesArr.push(allTitlesArr[i]);
    }
    return splitTitlesArr;
  };

  module.exports.dataCleaner = dataCleaner;