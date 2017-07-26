import '../css/App.css'
import Report from './report'
import search from '../search'
import React, { Component } from 'react'
// import TextInputForm from './textInputForm'
// import DeviceReadingTable from './deviceReadingTable'
// import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deviceReadings: [],
      numRecords: 10,
      inputPlaceholder: '# of records displayed'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
  }

  handleSubmit (event) {
    // this.setState({numRecords: event.target.numRecords.value})
    this.setState({numRecords: event.target.numRecords.value}, () => {
      console.log('Should have set the state to new val: ' + this.state.numRecords)
    })

    // console.log('numrecords from state:' + this.state.numRecords)
  }

  handleTextInput (event) {
    // this.setState({numRecords: event.target.numRecords.value})
    this.setState({numRecords: event.target.value}, () => {
      console.log('Should have set the state to new val: ' + this.state.numRecords)
    })
  }

  componentDidMount () {
    console.log('component did mount num records: ' + this.state.numRecords)

    search(this.state.numRecords, (response) => {
      this.setState({deviceReadings: response})
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>IoT Plant Watering</h2>
        </div>
        <div className='App-intro'>
          <h3>Recent Device Readings</h3>

          <Report />

          {/* <TextInputForm onClick={this.handleFormClick} placeholder={this.state.inputPlaceholder} />
          <Form inline onSubmit={this.handleSubmit.bind(this)} >
            <FormGroup>
              <FormControl id='numRecords' type='text' placeholder={this.props.placeholder} onChange={this.handleTextInput.bind(this)} />
            </FormGroup>
            {' '}
            <FormGroup>
              <Button onClick={this.props.onClick} type='submit' bsSize='small' >Submit</Button>
            </FormGroup>
          </Form>
          <br />

          <DeviceReadingTable deviceReadings={this.state.deviceReadings} /> */}
        </div>
      </div>
    )
  }
}

export default App
