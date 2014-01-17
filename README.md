node-poll-stream
================

poll a function on an interval emit data 

```js

var poller = require('poll-stream');

poller(function(cb){
  doSomething(cb);
},1000).pipe(process.stdout)

```

i subtract the time to run the async function from the polling interval to let it sample as close to interval as possible.
