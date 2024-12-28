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
const environment = require('./helpers/environments');
const data = require('./lib/data');

const app = {};

// testing file system
// @TODO: pore muche dibo just testing
data.update('test','newFile',{'name':'name',"language":"lang"}, (err)=>{
  console.log(`error was: ${err}`);
})

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`server running on port: ${environment.port}`);
  });
};

app.handleReqRes = handleReqRes;

// start the server
app.createServer(); 

