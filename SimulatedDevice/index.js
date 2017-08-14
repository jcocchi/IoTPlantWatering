require('dotenv').config()
const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString
const Message = require('azure-iot-device').Message

const client = clientFromConnectionString(process.env.EVENT_HUB_CONN_STRING)

function printResultFor (op) {
  return function printResult (err, res) {
    if (err) console.log(op + ' error: ' + err.toString())
    if (res) console.log(op + ' status: ' + res.constructor.name)
  }
}

const connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err)
  } else {
    console.log('Client connected')

    // Create a message and send it to the IoT Hub every second
    setInterval(function () {
      const light = 20 + (Math.random() * 15)
      const humidity = 60 + (Math.random() * 20)
      const data = JSON.stringify({ deviceId: 'myFirstNodeDevice', light: light, hum: humidity })
      const message = new Message(data)
      console.log('Sending message: ' + message.getData())
      client.sendEvent(message, printResultFor('send'))
    }, 2000)
  }
}

client.open(connectCallback)
