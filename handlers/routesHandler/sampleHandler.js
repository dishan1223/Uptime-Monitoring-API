// sample handler

const handler = {};

handler.sampleHandle = (requestProperty, callback) => {
  callback(200, {
    message: "this is a sample url",
  });
}

module.exports = handler;
