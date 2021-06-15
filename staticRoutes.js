const http = require('http');
const fs = require('fs');

var server = http.createServer(incomeData);
server.on('listening', function(){
  console.log(`Server listening on http://localhost:${server.address().port} - with PID: ${process.pid}`);
});

async function logRequest(message){
  if(fs.existsSync('./messages.log'))
    fs.appendFile('./messages.log', message, 'utf-8', function (error){
      if(error)
        console.error(error);
      return;
    });
  return;
}

async function incomeData(req,res){
  res.writeHeader(200,
    {'Content-Type': 'text/html'}
  );

  if(req.method == 'GET'){

    if(req.url == '/'){
      var index = fs.createReadStream('./index.html',{encoding: 'utf-8'});
      index.on('data', function(chunk){
        if(chunk)
         res.write(chunk);
      });
      index.on('end', function(){
        res.end();
      });
    } 
    if(req.url == '/style.css'){
   
      var style = fs.createReadStream('./style.css',{encoding: 'utf-8'});
      res.writeHeader(200,
        {'Content-Type': 'text/css'}
      );
      style.on('data', function(chunk){
        res.write(chunk);
      });
      style.on('end', function(){
        res.end();
      });
    }
    if(req.url == '/main.js') {
      var main = fs.createReadStream('./main.js',{encoding: 'utf-8'});
      main.on('data', function(chunk){
        if(chunk)
        res.write(chunk);
      });
      main.on('end', function(){
        res.end();
      });
    }

  } else if(req.method == 'POST' && req.url == '/sayHi'){
    res.write('<h3>Hi back to you!</h3>');
    logRequest(`200 - ${req.url} - ${req.method}: Someone said Hi!\n`);
    res.end();

  } else if(req.method == 'POST' && req.url == '/greeting'){
    let data = '';
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      if(data == 'Hello'){
        res.write('<h3>Hello There!</h3>');
      } else if(data == "what's up"){
        res.write('<h3>The Sky!</h3>');
      }
      logRequest(`200 - ${req.url} - ${req.method}: ${data}\n`)
      res.end();
    });
  }
}

server.listen(3000);
