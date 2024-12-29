// route handler to handle user related routes
// deps 
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');

const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ['get','post','put','delete'];

  if(acceptedMethods.indexOf(requestProperties.method) > -1){
    handler._users[requestProperties.method](requestProperties, callback);
    callback(200);
  } else{
    callback(405);
  }
}

handler._users = {};

handler._users.post = (requestProperties, callback)=>{
  // trim() because there in be white space that needs to be filtered
  // shit! this looks ugly. maybe i should re format it some how. later!
  // it works btw
  const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
  const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
  const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
  const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
  const tosAgreement = typeof(requestProperties.body.tosAgreement) === 'boolean' && requestProperties.body.tosAgreement.trim().length > 0 ? requestProperties.body.tosAgreement : false;
  
  if(firstName && lastName && phone && password && tosAgreement){

    // make sure that the user does not already exist
    data.read('users', phone, (err, user)=>{
      // err = true when file does not exist already
      if(err){
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        } 
        // TODO : STORE the user to db
      } else{
        callback(500,{
          'error' : 'There was a problem in server side',
        })
      }
    })

  } else{
    callback(400, {
      error: 'Your have a problem in your request',
    }); // status 400 bcz error from user side
  }
}

handler._users.get = (requestProperties, callback)=>{
  callback(200);
}


handler._users.put = (requestProperties, callback)=>{

}

handler._users.delete = (requestProperties, callback)=>{

}

module.exports = handler;
