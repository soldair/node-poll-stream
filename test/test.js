var test = require('tape');
var poller = require('../');

test("can poll",function(t){

  var s = poller(function(cb){
    // error,   data
    cb(false,Date.now());
  },100);

  c = 0;  

  s.on('data',function(data){
    t.ok(data,'should get data');
    if(++c === 3) s.end();
  })

  s.on('end',function(){
    t.end();
  })

});




