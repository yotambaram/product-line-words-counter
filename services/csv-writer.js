const fs = require("fs");
const json2csv = require("json2csv").parse;
const newLine = "\r\n";

const csvWriter = (data, filePath, fields) => {
  try {
    fs.stat(filePath, function (err, stat) {
      if (err == null) {
        //write the actual data and end with newline
        let csv = json2csv(data, { header: false }) + newLine;
        fs.appendFile(filePath, csv, function (err) {
          if (err) throw err;
        });
      } else {
        //write the headers and newline
        fields = fields + newLine;
        fs.writeFile(filePath, fields, function (err) {
          if (err) throw err;
          csvWriter(data, filePath, fields);
        });
      }
    });
  } catch (err) {
    console.log("ERROR Csv Writer", err);
  }
  return true;
};

module.exports.csvWriter = csvWriter;
