require('dotenv').config()
const express = require('express')
const DocumentDBClient = require('documentdb').DocumentClient
const docDbClient = new DocumentDBClient(process.env.COSMOS_HOST, {
  masterKey: process.env.COSMOS_AUTH_KEY
})
const databaseUrl = `dbs/${process.env.COSMOS_DATABASE_ID}`
const collectionUrl = `${databaseUrl}/colls/${process.env.COSMOS_COLLECTION_ID}`

const app = express()

app.set('port', process.env.PORT || 3001)

app.get('/api/deviceReadings', (req, res) => {
  const numRecords = parseInt(req.query.numRecords)
  console.log('Num Records: ' + numRecords)

  if (isNaN(numRecords)) {
    res.sendStatus(400)
  }

  var querySpec = {
    query: 'SELECT TOP @numRecords * FROM root r',
    parameters: [{
      name: '@numRecords',
      value: numRecords
    }]
  }

  docDbClient.queryDocuments(collectionUrl, querySpec).toArray(function (err, results) {
    if (err) {
      console.error(err)
      res.sendStatus(500)
    } else {
      var readings = []

      results.forEach(r => {
        var reading = {
          timestamp: r.timestamp,
          deviceId: r.deviceId,
          temp: r.temp,
          hum: r.hum
        }
        readings.push(reading)
      })

      res.send(readings)
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`server listening on ${process.env.URL}:${app.get('port')}`)
})
