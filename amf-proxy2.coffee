Iconv = require('iconv').Iconv
Util = require 'util'
BufferTools = require 'buffertools'
Amf = require 'amflib/node-amf/amf.js'
Http = require 'http'

AMF_CONTENT_TYPE = 'application/x-amf'
ORIGIN_ENCODING = 'ISO-8859-1'
NODE_ENCODING = 'UTF-8'

module.exports =
class AmfProxy2
  constructor: (@config) ->
    # set up encoding converter so node can speak with origin
    @iconv = new Iconv(ORIGIN_ENCODING, NODE_ENCODING)
    @httpAgent = new Http.Agent()
    @httpAgent.maxSockets = @config.originConnection.maxSockets

  call: (method, args, cb) ->
    argStr = Util.inspect args, {depth:1, colors:true}
    console.log "calling AMF Endpoint: #{method}(#{argStr})"
    packet = Amf.packet()
    requestUri = "#{method}"
    responseUri = '/1'
    packet.addMessage args, requestUri, responseUri

    headers = {
      'host': @config.originHost,
      'content-type': AMF_CONTENT_TYPE,
      'accept': AMF_CONTENT_TYPE
    }

    req = Http.request
      host: @config.originHost
      port: @config.originAmfPort
      method: 'POST'
      path: @config.originAmfGatewayPath
      headers: headers,
      agent: @httpAgent

    req.setTimeout @config.originConnection.timeout, () ->
      console.log "Got a timeout for request.  Aborting request.  #{Util.inspect req}"
      req.abort()

    req.end packet.serialize(), 'binary'

    req.on 'response', (res) =>
      console.log "Response code #{res.statusCode}" if res.statusCode!=200

      body = new Buffer(0)
      #body = ''
      res.on 'data', (chunk) =>
        try
          body = BufferTools.concat(body, chunk)
          #body += chunk
        catch e
          sloppyErrorHandling e
      res.on 'close', () =>
          sloppyErrorHandling "Connection closed.  Problem receiving response data."
      res.on 'end', =>
        if res.statusCode != 200
          error = "Problem fetching from origin.  Response code: #{res.statusCode}, body: #{res.body}"
        else
        
          #packet = Amf.packet(@iconv.convert(body).toString())
          packet = Amf.packet body.toString()
          if !packet.messages? or packet.messages.length == 0
            sloppyErrorHandling packet

          value = packet.messages[0].value

          if value?.rootCause || value?.faultString || value?.faultDetail
              sloppyErrorHandling value

        console.log Util.inspect cb
        cb error, value
      

  sloppyErrorHandling: (error) ->
    console.error "Caught Error: #{error}"
    throw error
