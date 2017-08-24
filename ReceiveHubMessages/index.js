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
    light: msg.light,
    hum: msg.hum
  }

  docDbClient.createDocument(collectionUrl, docToCreate, {}, (err, documentCreated) => {
    if (err || documentCreated === undefined) {
      cb(err)
      return
    }
    cb(null, documentCreated.id)
  })
}

function printError (err) {
  console.log(`An error occured: ${err.message}`)
}

function printMessage (message) {
  insertDocument(message.body, (err, id) => {
    if (err) {
      printError(err)
      return
    }
  })
}

client.open()
    .then(client.getPartitionIds.bind(client))
    .then((partitionIds) => {
      return partitionIds.map((partitionId) => {
        return client.createReceiver('$Default', partitionId, { startAfterTime: Date.now() }).then((receiver) => {
          receiver.on('errorReceived', printError)
          receiver.on('message', printMessage)
        })
      })
    })
    .catch(printError)
