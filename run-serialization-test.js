Amf = require('amflib/node-amf/amf.js');
Util = require('util');

try {

    var packet = Amf.packet();
    packet.addMessage([{'bad-number':289764372, 'string-number':'289764372'}], 'testMethod', '/1');
    
    ser = packet.serialize();
    console.log("Serialized packet:"+ser);

    convertPacket = Amf.packet(ser.toString());
    
    value = convertPacket.messages[0].value;
    
    console.log("Value: " + Util.inspect(value));

} catch (e) {
  console.error("Caught error:" + e)
  if (e.stack) {
    console.error(e.stack)
  }
}