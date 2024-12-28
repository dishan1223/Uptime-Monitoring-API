// route handler to handle user related routes

const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ['get','post','put','delete'];

  if(acceptedMethods.indexOf(requestProperties.method) > -1){
    callback(200);
  } else{
    callback(405);
  }
}

module.exports = handler;
