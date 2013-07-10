var AmfProxy, proxy;
require('coffee-script');
AmfProxy = require('./amf-proxy');
  
proxy = new AmfProxy({
  originHost: "localhost",
  originAmfPort: 8400,
  originAmfGatewayPath: "/samples/messagebroker/amf",
  originConnection: {
    maxSockets: 20
  }
});

try {
  proxy.call("testService.echo", [289764372], function(err, echo) {
    if (err) {
      return console.log("echo err: " + err);
    } else {
      return console.log("Value from server call:" + echo);
    }
  });
} catch (e) {
  console.error("Caught error:" + e)
  if (e.stack) {
    console.error(e.stack)
  }
}