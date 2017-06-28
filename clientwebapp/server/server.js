require('dotenv').config()
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const MongoConnString = process.env.COSMOS_CONN_STRING
const CollectionId = process.env.COLLECTION_ID

const app = express()

app.set('port', process.env.PORT || 3001)

app.get('/api/deviceReadings', (req, res) => {
  const numRecords = parseInt(req.query.numRecords)
  if (isNaN(numRecords)) {
    res.sendStatus(400)
  }

  MongoClient.connect(MongoConnString, function (err, db) {
    if (err) {
      res.sendStatus(500)
    }

    getCursor(db, numRecords)
      .then(getReadings)
      .then(res.send.bind(res))
  })
})

app.listen(app.get('port'), () => {
  console.log(`server listening on ${process.env.URL}:${app.get('port')}`)
})

function getCursor (db, numRecords) {
  let getCursorPromise = new Promise((resolve, reject) => {
    resolve(db.collection(CollectionId).find().limit(numRecords))
  })

  return getCursorPromise
}

function getReadings (cursor) {
  let getReadingsPromise = new Promise((resolve, reject) => {
    let readings = []
    cursor.forEach(r => {
      console.log(r)
      readings.push(r)
    }, () => {
      resolve(readings)
    })
  })

  return getReadingsPromise
}
