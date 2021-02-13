const csv = require("csvtojson");
const fs = require("fs");

async function csvReader(path) {
  try {
    if (fs.existsSync(path)) {
      return csv().fromFile(path);
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR Csv Reader", err);
  }
}

module.exports.csvReader = csvReader;