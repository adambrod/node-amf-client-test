/**
In case you don't read coffeescript!
Generated from ./amf_proxy.coffee
*/
var AMF_CONTENT_TYPE, Amf, AmfProxy, BufferTools, Http, Iconv, NODE_ENCODING, ORIGIN_ENCODING, Util;

Iconv = require('iconv').Iconv;

Util = require('util');

BufferTools = require('buffertools');

Amf = require('amflib/node-amf/amf.js');

Http = require('http');

AMF_CONTENT_TYPE = 'application/x-amf';

ORIGIN_ENCODING = 'ISO-8859-1';

NODE_ENCODING = 'UTF-8';

module.exports = AmfProxy = (function() {

  function AmfProxy(config) {
    this.config = config;
    this.iconv = new Iconv(ORIGIN_ENCODING, NODE_ENCODING);
    this.httpAgent = new Http.Agent();
    this.httpAgent.maxSockets = this.config.originConnection.maxSockets;
  }

  AmfProxy.prototype.call = function(method, args, cb) {
    var argStr, headers, packet, req, requestUri, responseUri,
      _this = this;
    argStr = Util.inspect(args, {
      depth: 1,
      colors: true
    });
    console.log("calling AMF Endpoint: " + method + "(" + argStr + ")");
    packet = Amf.packet();
    requestUri = "" + method;
    responseUri = '/1';
    packet.addMessage(args, requestUri, responseUri);
    headers = {
      'host': this.config.originHost,
      'content-type': AMF_CONTENT_TYPE,
      'accept': AMF_CONTENT_TYPE
    };
    req = Http.request({
      host: this.config.originHost,
      port: this.config.originAmfPort,
      method: 'POST',
      path: this.config.originAmfGatewayPath,
      headers: headers,
      agent: this.httpAgent
    });
    req.setTimeout(this.config.originConnection.timeout, function() {
      console.log("Got a timeout for request.  Aborting request.  " + (Util.inspect(req)));
      return req.abort();
    });
    req.end(packet.serialize(), 'binary');
    return req.on('response', function(res) {
      var body;
      if (res.statusCode !== 200) {
        console.log("Response code " + res.statusCode);
      }
      body = new Buffer(0);
      res.on('data', function(chunk) {
        try {
          return body = BufferTools.concat(body, chunk);
        } catch (e) {
          return sloppyErrorHandling(e);
        }
      });
      res.on('close', function() {
        return sloppyErrorHandling("Connection closed.  Problem receiving response data.");
      });
      return res.on('end', function() {
        var convertBody, convertPacket, error, value;
        if (res.statusCode !== 200) {
          error = "Problem fetching from origin.  Response code: " + res.statusCode + ", body: " + res.body;
        } else {
          convertBody = _this.iconv.convert(body).toString();
          convertPacket = Amf.packet(convertBody.toString());
          if (!(packet.messages != null) || packet.messages.length === 0) {
            sloppyErrorHandling(packet);
          }
          value = packet.messages[0].value;
          if ((value != null ? value.rootCause : void 0) || (value != null ? value.faultString : void 0) || (value != null ? value.faultDetail : void 0)) {
            sloppyErrorHandling(value);
          }
        }
        console.log(Util.inspect(cb));
        return cb(error, value);
      });
    });
  };

  AmfProxy.prototype.sloppyErrorHandling = function(error) {
    console.error("Caught Error: " + error);
    throw error;
  };

  return AmfProxy;

})();
