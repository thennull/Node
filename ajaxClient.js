window.onload = function(){

  var ajax = {
    xmlObj: new XMLHttpRequest(),
    method: undefined,
    url: undefined,
    async: true,
    data: undefined,
    setup: function(){
      return new Promise((res,rej) => {

        if(this.method && this.method == 'GET'){

          this.xmlObj.open(this.method, this.url, this.async);
          this.xmlObj.setRequestHeader('Content-Type', 'text');

        } else if(this.method && this.method == 'POST'){

          this.xmlObj.open(this.method, this.url, this.async);
          this.xmlObj.setRequestHeader('Content-Type', 'text');
        }

        this.xmlObj.onload = () => {
          if(this.xmlObj.status >= 200 && this.xmlObj.status <= 300){
            res(this.xmlObj.responseText);
          }
          return;
        }
        this.xmlObj.onerror = () => {
          rej({
            status: this.xmlObj.status,
            code: 404,
            error: this.xmlObj.statusText
          });
          return;
        }
        this.xmlObj.send(this.data);
      }
    )},
  }
  main(ajax);
};

function fillUI(pr){
  if(pr){
    pr.then(
      function (data){
        res.innerHTML = data;
      }, 
      function (err){
        console.error(err);
      });
  }
  return;
}

function main(ajax){
  var btn1 = document.getElementById('hibtn');
  var btn2 = document.getElementById('hellobtn');
  var btn3 = document.getElementById('whatbtn');
  var res = document.getElementById('res');

  btn1.addEventListener('click', function(){
    ajax.method = 'POST', ajax.url = 'http://localhost:3000/sayHi',
    ajax.data = 'Hi';
    let request = ajax.setup();
    fillUI(request);
  });

  btn2.addEventListener('click', function (){
    ajax.method = 'POST', ajax.url =  'http://localhost:3000/greeting',
    ajax.data = 'Hello';

    let request = ajax.setup();
    fillUI(request);
  });

  btn3.addEventListener('click', function (){
    ajax.method = 'POST', ajax.url =  'http://localhost:3000/greeting',
    ajax.data = "what's up";

    let request = ajax.setup();
    fillUI(request);
  });

}
