AmfProxy = require './amf-proxy'

console.log "Inside run-test.coffee"


proxy = new AmfProxy {
  originHost: "localhost",
  originAmfPort: 8081,
  originAmfGatewayPath: "",
  originConnection: {
    maxSockets: 20
  }
} 

console.log "hi"

proxy.call "test", [], {}, (err, value)->
  if err
    console.log "err: #{err}"
  else
    console.log value


proxy.call "echo", ["Test Echo"], {}, (err, value)->
  if err
    console.log "err: #{err}"
  else
    console.log value

