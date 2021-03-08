const fs = require("fs");


const outputPathBuilder = (path, format) => {
    try {
        let i = 1;
        let currentPath = path + format
        while (fs.existsSync(currentPath)) {
          currentPath = path + "("+i+")" + format;
          i++;
        }
        return currentPath}
    catch(err) {
        console.group(err)

    }
    
  };

  module.exports.outputPathBuilder = outputPathBuilder;