import React, { Component } from 'react'
import DeviceReadingList from './deviceReadingList'
import search from '../search'
import '../css/App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deviceReadings: [],
      numRecords: 10
    }
  }

  componentDidMount () {
    search(this.state.numRecords, (response) => {
      console.log(`Component mounted ${response.length} responses`)

      this.setState({deviceReadings: response})
    })
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
