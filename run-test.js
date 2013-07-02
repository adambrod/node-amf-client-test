var AmfProxy, proxy;
require('coffee-script');
AmfProxy = require('./amf-proxy');
  
proxy = new AmfProxy({
  originHost: "localhost",
  originAmfPort: 8081,
  originAmfGatewayPath: "",
  originConnection: {
    maxSockets: 20
  }
});


proxy.call("test", [], function(err, value) {
  if (err) {
    return console.log("err: " + err);
  } else {
    return console.log(value);
  }
});

try {
  proxy.call("echo", ["Test Echo", Number.MIN_VALUE, -1234.5, -20000, -1, 0, 0.0123456, 2000000, 289764372, 1234.5678, Number.MAX_VALUE, Number.NaN], function(err, value) {
    if (err) {
      return console.log("err: " + err);
    } else {
      return console.log("Value from server: " + value);
    }
  });
} catch (e) {
  console.error("Caught error:" + e)
  if (e.stack) {
    console.error(err.stack)
  }
}