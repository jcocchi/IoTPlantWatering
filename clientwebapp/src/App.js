import React, { Component } from 'react'
import DeviceReadingList from './components/deviceReadingList'
import './css/App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceReadings: [{temp: 75, hum: 23}, {temp: 76, hum: 28}, {temp: 74, hum: 20}]
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>IoT Plant Watering</h2>
        </div>
        <p className='App-intro'>
          <h3>Recent Device Readings</h3>
          <DeviceReadingList deviceReadings={this.state.deviceReadings} />
        </p>
      </div>
    )
  }
}

export default App
