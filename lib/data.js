// dependencies 
const fs = require('fs');
const path = require('path');

const lib = {};

// base dir of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file 
// data is a js object
// fs.open can create new files but not new dirs. 
// so make sure to create one before running server
lib.create = (dir, file, data, callback) => {
  // open file for writing 
  fs.open(lib.basedir+dir+'/'+file+'.json','wx', (err,fileDescriptor)=>{
    if(!err && fileDescriptor){
      // turn data into string (stringify)
      const stringData = JSON.stringify(data);

      // write data to file and then close it
      fs.writeFile(fileDescriptor, stringData,(err)=>{
        if(!err){
          fs.close(fileDescriptor, (err)=>{
            if(!err){
              callback(false);
            }else{
              callback('Error closing the new file');
            }
          });
        }else{
          callback(`Error Writing New File: ${err}`);
        }
      }); 
    }else{
      callback(`Could not create new file. It may already exists.`);
    }
  });
}

// read data from file 
lib.read = (dir, file,callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
    callback(err, data);
  });
} 


module.exports = lib;
