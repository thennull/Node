const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const ajax = require('./outerRes');

var port = 3030;
var hostname = '127.0.0.1';
var router = {
  '/_GET': {
    assets: 'index.html',
    type: mime.getType('html')
  },
  '/style.css_GET': {
    assets: 'style.css',
    type: mime.getType('css')
  },
  '/users_GET': {
    assets: 'users.json',
    type: mime.getType('json')
  }
}

function internalError(err){
  if(err){
    console.error(err);
  }
}

// Proccess the requests *************************

function processRequest(asset){
  return new Promise(function onMatch(resolve,reject){
    switch(asset){
      case 'index.html':
        fs.readFile('index.html', {enconding: 'utf-8'}, function(error, data){
          if(error)
            reject(error)
          else
            resolve(data);
        });
        break;
      case 'users.json':
        let res = ajax.fetchUsers();
        resolve(res); 
        break;
      case 'style.css':
        fs.readFile('style.css', {encoding: 'utf-8'}, function(error, data){
          if(error)
            reject(error);
          else
            resolve(data);
        });
      break;
    }    
  });
}

// Log function ***************

async function logRequests(method, route, status){
  if(method && route)
    await fs.appendFile('./log/messages', `\nRequest: ${method} - ${route}: ${status}`, internalError);
  else 
    await fs.appendFile('./log/messages', 'Request: Unknown Error...', internalError);
}

// HTTP server ****************

http.createServer( async function (req,res){
  var method = req.method;
  var route = url.parse(req.url).pathname;

  var request = router[`${route}_${method}`];

  if(!request){
    res.writeHead(404);
    logRequests(method,route,404);
    return res.end();
  } else {
    let { assets, type } = request;
    res.writeHead(200, {'Content-Type': type});
    res.write(await processRequest(assets));
    logRequests(method,route,200);
    return res.end();
  }

}).listen(port, hostname, function(){
  console.log('Running HTTP server on: http://' + hostname + ':' + port);
});
