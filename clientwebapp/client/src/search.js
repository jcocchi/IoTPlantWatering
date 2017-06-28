function search (numRecords, cb) {
  return fetch(`/api/deviceReadings?numRecords=${numRecords}`, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function checkStatus (response) {
  if (response.status !== 200) {
    throw response.statusText
  }

  return response
}

function parseJSON (response) {
  return response.json()
}

export default search
