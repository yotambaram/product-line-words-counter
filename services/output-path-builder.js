const fs = require("fs");


const outputPathBuilder = (path) => {
    try {
        let i = 1;
        let currentPath = path + ".txt"
        while (fs.existsSync(currentPath)) {
            console.log(currentPath)
          //number = i.toString();
          currentPath = path + i + ".txt";
          i++;
        }
        return currentPath}
    catch(err) {
        console.group(err)

    }
    
  };

  module.exports.outputPathBuilder = outputPathBuilder;