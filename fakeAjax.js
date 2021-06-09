// Module exports by module.exports

var files = {
  'file1': 'git.com/thennull',
  'file2': 'twitter.com/thennull'
}

function fakeAjax(file, error, cb){
  let randomDelay = Math.random(Math.random() * 1E4 % 6000) + 2000;
  setTimeout(
    function(){
      try {
        cb(files[file]);
      } catch(err) {
        error(err);
      }
    }
  ), randomDelay;
}

function getFile(file){
  return new Promise(function(resolve,reject){
    fakeAjax(file,reject,resolve);
  });
}

module.exports = {
  getFile
};                     
