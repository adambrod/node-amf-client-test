Amf = require('amflib/node-amf/amf.js');

try {

    var packet = Amf.packet();
    packet.addMessage([289764372], 'testMethod', '/1');
    
    s = packet.serialize()

    body = s

    convertPacket = Amf.packet(body.toString());
    
    value = convertPacket.messages[0].value;
    
    console.log("Value: " + value);

} catch (e) {
  console.error("Caught error:" + e)
  if (e.stack) {
    console.error(e.stack)
  }
}