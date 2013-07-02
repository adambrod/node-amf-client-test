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

try {
  proxy.call("echo", [289764372], function(err, value) {
    if (err) {
      return console.log("err: " + err);
    } else {
      return console.log("Value from server: " + value);
    }
  });
} catch (e) {
  console.error("Caught error:" + e)
  if (e.stack) {
    console.error(e.stack)
  }
}