import React, {Component} from 'react'

class DeviceReading extends Component {
  render () {
    const reading = this.props.reading
    return (
      <li>Temperature: {reading.temp} Humidity: {reading.hum}</li>
    )
  }
}

export default DeviceReading
