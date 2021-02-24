const fs = require("fs");


const outputPathBuilder = (path) => {
    let i = 1;
    let currentPath = path + ".txt"
    while (fs.existsSync(currentPath)) {
        console.log(currentPath)
      //number = i.toString();
      currentPath = path + i + ".txt";
      i++;
    }
    return currentPath
  };

  module.exports.outputPathBuilder = outputPathBuilder;