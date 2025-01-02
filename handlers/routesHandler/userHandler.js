// route handler to handle user-related routes
// deps 
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');

const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ['get', 'post', 'put', 'delete'];

  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405); // Method not allowed
  }
};

handler._users = {};

// POST method to create a new user
handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === 'boolean' && requestProperties.body.tosAgreement === true
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // Check if the user already exists
    data.read('users', phone, (err) => {
      if (err) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };

        // Store the user in the database
        data.create('users', phone, userObject, (err) => {
          if (!err) {
            callback(200, {
              message: 'User was created successfully!',
            });
          } else {
            callback(500, {
              error: 'Could not create user',
            });
          }
        });
      } else {
        callback(500, {
          error: 'A user with this phone number already exists',
        });
      }
    });
  } else {
    callback(400, {
      error: 'Your request contains invalid or missing fields',
    });
  }
};

handler._users.get = (requestProperties, callback) => {
  callback(200);
};

handler._users.put = (requestProperties, callback) => {
  callback(200);
};

handler._users.delete = (requestProperties, callback) => {
  callback(200);
};

module.exports = handler;

