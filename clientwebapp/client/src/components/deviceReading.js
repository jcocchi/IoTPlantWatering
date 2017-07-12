import React, {Component} from 'react'

class DeviceReading extends Component {
  render () {
    const reading = this.props.reading
    const index = this.props.index

    return (
      <tr>
        <td>{index}</td>
        <td>{reading.temp}</td>
        <td>{reading.hum}</td>
      </tr>
    )
  }
}

export default DeviceReading
