
const { outputPathBuilder } = require("./output-path-builder");
const fs = require("fs");
const _ = require("lodash");

const dataToCsv = () => {

    const arrToCsv = (matchingResultsArr2)=>{

        let titlesResultMap = {};
        let titlesResultArr = [];
        for (let i = 0; i < matchingResultsArr2.length; i++) {
          titledString = matchingResultsArr2[i].filteredTitle.join(" ")
          let titleArrRes
          if (!titlesResultMap[titledString]) {
           titlesResultMap[titledString] = 1;
           titlesResultArr.push(matchingResultsArr2[i].filteredTitle);
           
          } else {
             titlesResultMap[titledString]++ 
          }
        }
        //TODO: make headers from object keys
        const csvFromArrayOfArrays2 = convertArrayToCSV(titlesResultArr, {
          header: ["Brand", "Line", "Sub Line1", "Sub Line2", "Sub Line3"],
          separator: ",",
        });

        const outputPath1 = outputPathBuilder(
            "./db-results/product-line-per-brand",
            ".csv"
          );
          fs.writeFile(outputPath1, csvFromArrayOfArrays2, (err) => {
            if (err) return console.log(err);
            console.log("CSV File Data Ready");
          });
          
    }
}

module.exports.dataToCsv = dataToCsv