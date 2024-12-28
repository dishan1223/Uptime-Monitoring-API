// sample handler

const handler = {};

handler.sampleHandler = (requestProperty, callback) => {
  callback(200, {
    message: "this is a sample url",
  });
}

module.exports = handler;
