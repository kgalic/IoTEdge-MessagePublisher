
var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;

async function connectToModuleClient(output, message)
{
    var client = await Client.fromEnvironment(Transport);
    await client.open();
    console.log('IoT Hub module client initialized');
    var outputMsg = new Message(message);
    await client.sendOutputEvent(output, outputMsg);
    printResultFor('Sending received message');
}
  
  // Helper function to print results in the console
  function printResultFor(op) {
    return function printResult(err, res) {
      if (err) {
        console.log(op + ' error: ' + err.toString());
      }
      if (res) {
        console.log(op + ' status: ' + res.constructor.name);
      }
    };
  }

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.output) {

        await connectToModuleClient(req.query.output, req.body.toString());
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Finished"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a correct parameter on the query string!"
        };
    }
};