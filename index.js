/*
 *
 *  title : Uptime Monitoring Application
 *  description : A RESTFul API to monitor up or down time of user defined links
 *  author : Ishtiaq Dishan
 *
 * */ 

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');

const app = {};

app.config = {
  port: 3000,
};

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`server running on port ${app.config.port}`);
  });
};

app.handleReqRes = handleReqRes;

// start the server
app.createServer(); 

