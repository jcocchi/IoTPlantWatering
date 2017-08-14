import '../css/App.css'
import Report from './report'
import React, { Component } from 'react'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Plant Sensor Readings</h2>
        </div>
        <div className='App-intro'>

          <Report />

        </div>
      </div>
    )
  }
}

export default App
