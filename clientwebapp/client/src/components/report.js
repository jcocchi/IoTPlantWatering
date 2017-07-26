import '../css/report.css'
import * as pbi from 'powerbi-client'
import React, {Component} from 'react'
require('dotenv').config()
const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory)

class Report extends Component {
  constructor (props) {
    super(props)
    this.component = null
  }

  componentDidUpdate () {
    const options = {
      type: 'report',
      accessToken: process.env.REACT_APP_PBI_TOKEN,
      embedUrl: process.env.REACT_APP_PBI_EMBED_URL,
      id: process.env.REACT_APP_PBI_REPORT_ID,
      tokenType: pbi.models.TokenType.Embed,
      permissions: pbi.models.Permissions.All,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true
      }
    }

    if (this.validateConfig(options)) {
      this.component = powerbi.embed(this.rootElement, options)
    }
  }

  validateConfig (options) {
    const errors = pbi.models.validateReportLoad(options)
    return (errors === undefined)
  }

  componentWillUnmount () {
    this.reset()
  }

  reset () {
    powerbi.reset(this.rootElement)
    this.component = null
  }

  render () {
    return (
      <div>
        <div id='powerbiFrame' ref={(ref) => { this.rootElement = ref }} />
      </div>
    )
  }
}

export default Report
