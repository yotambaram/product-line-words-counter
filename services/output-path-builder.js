const fs = require("fs");


const outputPathBuilder = (path) => {
    try {
        let i = 1;
        let currentPath = path + ".txt" //.json
        while (fs.existsSync(currentPath)) {
            console.log(currentPath)
          currentPath = path + i + ".txt";//.json
          i++;
        }
        return currentPath}
    catch(err) {
        console.group(err)

    }
    
  };

  module.exports.outputPathBuilder = outputPathBuilder;