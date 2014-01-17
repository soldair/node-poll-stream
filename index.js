var through = require('through');

module.exports = function(cb,interval){
  var s = through();
  var stop = false; 
  var pause = false;
  var resume = false;

  (function fn(){
    if(stop) return;
    if(pause) return (resume = fn); 
    var t = Date.now();
    cb(function(err,data){
      if(stop) return;
      if(err) {
        stop = true;
        return s.emit('error',err);
      }

      var e = Date.now()-t;

      s.queue(data);

      setTimeout(function(){
        fn();
      },interval-e);

    });
  }())

  s.on('end',function(){
    stop = true;
  });

  s.on('pause',function(){
    pause = true;
  });

  s.on('resume',function(){
    if(!pause) return;
    pause = false;
    if(resume) resume();
  })

  return s;

}
