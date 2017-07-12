import React, {Component} from 'react'
import DeviceReading from './deviceReading.js'
import { Table } from 'react-bootstrap'

class DeviceReadingTable extends Component {
  render () {
    const readings = this.props.deviceReadings.map((r, i) => {
      return <DeviceReading reading={r} key={r._id} index={i + 1} />
    })

    return (
      <div>
        <Table hover bordered striped condensed>
          <thead>
            <tr>
              <th> # </th>
              <th> Temp </th>
              <th> Hum </th>
            </tr>
          </thead>
          <tbody>
            {readings}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default DeviceReadingTable
