// deps 
const crypto = require('crypto');
const environments = require('./environments');

const utilities = {};

// parse JSON string to object
utilities.parseJSON = (jsonString) =>{
  let output;

  try{
    output = JSON.parse(jsonString);
  } catch{
    output = {};
  }
}

// hash string 
utilities.hash = (string)=> {
  if(typeof(str) === 'string' && str.length > 0){
    let hash = crypto.createHmac('sha256',environments[process.env.NODE_ENV].secretkey).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
}

module.exports = utilities;
