require('dotenv').config()
const assert = require('assert')
const EventHubClient = require('azure-event-hubs').Client
const MongoClient = require('mongodb').MongoClient

// Set up event hub connection
const eventHubConnString = process.env.EVENT_HUB_CONN_STRING
const client = EventHubClient.fromConnectionString(eventHubConnString)

// Set up CosmosDB MongoDB connection
const mongoConnString = process.env.COSMOS_CONN_STRING

function insertDocument (db, msg, cb) {
  db.collection(process.env.COLLECTION_ID).insertOne({
    deviceId: msg.deviceId,
    temp: msg.temperature,
    hum: msg.humidity
  }, function (err, res) {
    assert.equal(err, null)
    cb()
  })
}

function printError (err) {
  console.log(err.message)
}

function printMessage (message) {
  console.log('Message received: ')
  console.log(JSON.stringify(message.body))

  // Write message to CosmosDB
  MongoClient.connect(mongoConnString, function (err, db) {
    assert.equal(null, err)
    insertDocument(db, message.body, function () {
      console.log('Successfully inserted the message to CosmosDB.')
      console.log('')
      db.close()
    })
  })
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
