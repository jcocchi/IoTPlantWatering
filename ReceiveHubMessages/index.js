require('dotenv').config()
const EventHubClient = require('azure-event-hubs').Client

const connString = process.env.EVENT_HUB_CONN_STRING
const client = EventHubClient.fromConnectionString(connString)

function printError (err) {
  console.log(err.message)
}

function printMessage (message) {
  console.log('Message received: ')
  console.log(JSON.stringify(message.body))
  console.log('')
}

client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
      return partitionIds.map(function (partitionId) {
        return client.createReceiver('$Default', partitionId, {'startAfterTime': Date.now()}).then(function (receiver) {
          console.log('Created partition receiver: ' + partitionId)
          receiver.on('errorReceived', printError)
          receiver.on('message', printMessage)
        })
      })
    })
    .catch(printError)
