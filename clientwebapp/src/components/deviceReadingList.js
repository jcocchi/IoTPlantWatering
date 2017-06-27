import React, {Component} from 'react'
import DeviceReading from './deviceReading.js'

class DeviceReadingList extends Component {
  render () {
    const readings = this.props.deviceReadings.map((r) => {
      return <DeviceReading reading={r} />
    })

    return (
      <div>
        <ul>
          {readings}
        </ul>
      </div>
    )
  }
}

export default DeviceReadingList
