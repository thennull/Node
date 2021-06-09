// Ajax request
const ajax = require('xmlhttprequest');

var url = 'https://api.github.com/users';
var method = 'GET';
var async = true;
var xhr = new ajax.XMLHttpRequest();

function fetchUsers(){
  return new Promise(function onRes(resolve,reject){
    
    xhr.open(method,url,async);
    xhr.onload = function (){
      if(this.status >= 200 && this.status <= 300)
        resolve(this.responseText);
    }
    xhr.onerror = function(){
      reject({
        status: this.status,
        error: this.statusText
      });
    }
    xhr.send();
  });
}

module.exports = { fetchUsers };
