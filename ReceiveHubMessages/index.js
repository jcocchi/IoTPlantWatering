require('dotenv').config()
const moment = require('moment')
const EventHubClient = require('azure-event-hubs').Client
const DocumentDBClient = require('documentdb').DocumentClient

console.log('IM STARTING UP')

// Set up event hub connection
const eventHubConnString = process.env.EVENT_HUB_CONN_STRING
const client = EventHubClient.fromConnectionString(eventHubConnString)

console.log('I CREATED THE EVENT HUB: ' + client)

// Set up CosmosDB DocDB connection
const docDbClient = new DocumentDBClient(process.env.COSMOS_HOST, {
  masterKey: process.env.COSMOS_AUTH_KEY
})
const databaseUrl = `dbs/${process.env.COSMOS_DATABASE_ID}`
const collectionUrl = `${databaseUrl}/colls/${process.env.COSMOS_COLLECTION_ID}`

console.log('I CREATED THE DOC DB CLIENT' + docDbClient)

function insertDocument (msg, cb) {
  var docToCreate = {
    timestamp: moment().format('MMMM D YYYY h:mm:ss a'),
    deviceId: msg.deviceId,
    light: msg.light,
    hum: msg.hum
  }

  console.log('PREPARING TO INSERT: ' + docToCreate)

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
  console.log('Message Received')
  console.log(message.body)

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
      console.log('GOT PARTITION IDS: ' + partitionIds)
      return partitionIds.map((partitionId) => {
        console.log('ON PARTITION: ' + partitionId)
        return client.createReceiver('$Default', partitionId, { startAfterTime: Date.now() }).then((receiver) => {
          console.log('CREATEDA RECEIVER FOR PARTITION: ' + partitionId)
          receiver.on('errorReceived', printError)
          receiver.on('message', printMessage)
        })
      })
    })
    .catch(printError)
