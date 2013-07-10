node-amf-client-test
====================

Simple test app to flush out problems with node and amf

# Steps to run using Java server (with Adobe's blazeds as the U29 deserializer)
```
cd tomcat/bin
./catalina.sh run
# open a new command window
`node run-blaze-test.js`
# manually look at the results in the tomcat window.  You'll see something like:

INFO: Server startup in 1245 ms
Server received: -247106540
```

# Steps to run with Charles proxy as the AMF parser
Download and install Charles from http://www.charlesproxy.com/download/
In Charles, setup a Reverse Proxy
Menu: Proxy->Reverse Proxies->Add
  Local Port: 8081
  Remote Host: localhost
  Remove Port: 8080

```
node http-server/run-server.js
# open a new terminal window
node run-test.js
```
Go to charles and inspect the request and response.  Note that the parameter has AMF3 type Integer with a value of -247106540
