import '../css/report.css'
import * as pbi from 'powerbi-client'
import * as pbiAPI from 'powerbi-api'
import React, {Component} from 'react'
require('dotenv').config()
const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory)
const embedURL = 'https://embedded.powerbi.com/appTokenReportEmbed'

class Report extends Component {
  constructor (props) {
    super(props)

    this.component = null
  }

  componentDidMount () {
    const token = this.generateToken()

    const options = {
      type: 'report',
      accessToken: token,
      embedUrl: embedURL,
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

  generateToken () {
    var token = pbiAPI.PowerBIToken.createReportEmbedToken(process.env.REACT_APP_PBI_WRKSPACE_COLL_NAME,
                                                            process.env.REACT_APP_PBI_WRKSPACE_ID,
                                                            process.env.REACT_APP_PBI_REPORT_ID)
    return token.generate(process.env.REACT_APP_PBI_WRKSPACE_KEY)
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
      <div id='powerbiFrame' ref={(ref) => { this.rootElement = ref }} />
    )
  }
}

export default Report
