require('dotenv').config()
const moment = require('moment')
const EventHubClient = require('azure-event-hubs').Client
const DocumentDBClient = require('documentdb').DocumentClient

// Set up event hub connection
const eventHubConnString = process.env.EVENT_HUB_CONN_STRING
const client = EventHubClient.fromConnectionString(eventHubConnString)

// Set up CosmosDB DocDB connection
const docDbClient = new DocumentDBClient(process.env.COSMOS_HOST, {
  masterKey: process.env.COSMOS_AUTH_KEY
})
const databaseUrl = `dbs/${process.env.COSMOS_DATABASE_ID}`
const collectionUrl = `${databaseUrl}/colls/${process.env.COSMOS_COLLECTION_ID}`

function insertDocument (msg, cb) {
  var docToCreate = {
    timestamp: moment().format('MMMM D YYYY h:mm:ss a'),
    deviceId: msg.deviceId,
    temp: msg.temperature,
    hum: msg.humidity
  }

  docDbClient.createDocument(collectionUrl, docToCreate, {}, (err, documentCreated) => {
    if (err || !documentCreated) {
      cb(err)
    }
    cb(null, documentCreated.id)
  })
}

function printError (err) {
  // console.log(err.message)
}

function printMessage (message) {
  // console.log('Message received: ')
  // console.log(JSON.stringify(message.body))

  insertDocument(message.body, (err, id) => {
    if (err) {
      printError(err)
      return
    }

    // console.log(`Wrote message to cosmos with id: ${id}`)
  })
}

client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
      return partitionIds.map(function (partitionId) {
        return client.createReceiver('$Default', partitionId).then(function (receiver) {
          // console.log('Created partition receiver: ' + partitionId)
          receiver.on('errorReceived', printError)
          receiver.on('message', printMessage)
        })
      })
    })
    .catch(printError)
