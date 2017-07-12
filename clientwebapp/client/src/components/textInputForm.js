import React, {Component} from 'react'
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'

class TextInputForm extends Component {
  render () {
    return (
      <Form inline>
        <FormGroup>
          <FormControl type='text' placeholder={this.props.placeholder} />
        </FormGroup>
        {' '}
        <FormGroup>
          <Button onClick={this.props.onClick} type='submit' bsSize='small' >Submit</Button>
        </FormGroup>
      </Form>
    )
  }
}

export default TextInputForm
