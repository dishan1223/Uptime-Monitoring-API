// dependencies
const { StringDecoder } = require('string_decoder'); // StringDecoder is a class to decode buffers
const url = require('url');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routesHandler/notFound');

const handler = {};

handler.handleReqRes = (req, res) => {
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true); // true -> while parsing the server should take query strings also
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperty = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headerObject,
  }

  const decoder = new StringDecoder('utf-8');
  let realData = "";

  // if path does not exist then this line will fire up not found response
  const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;


  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  });

  // after the buffer stream ends the decoder must be stopped!
  req.on('end', () => {
    realData += decoder.end();

    chosenHandler(requestProperty, (statusCode, payload) => {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
      payload = typeof(payload) === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      // write head takes statusCode 
      // tellint the client the reponse is in json format
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    })
  });
};

module.exports = handler;

