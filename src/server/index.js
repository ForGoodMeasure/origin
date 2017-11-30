import awsServerlessExpress from 'aws-serverless-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import serverRenderer from '../../lib/server-renderer'
import adminApp from '../../lib/admin-app.js'
import redirectApp from './redirect.js'
import globalStyles from '../shared/style.js'
import genStore from '../shared/gen-store'

import config from '../../config.json'

const PORT = config.global.port;
const app = express()

let serverlessExpress = null

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*
  Note: locally, the server runs out of 'dist'
*/
app.use(express.static(`${__dirname}/../assets`));

app.get('/health', (req, res) => res.send('OK'))

app.use('/admin', adminApp(config))

app.use(redirectApp)

app.use(serverRenderer(genStore, config, globalStyles))

module.exports = {

  awsServerlessProxy(event, context) {
    if (!serverlessExpress) {
      serverlessExpress = awsServerlessExpress.createServer(app)
    }
    awsServerlessExpress.proxy(serverlessExpress, event, context)
  },

  startServer(port=PORT) {
    try {
      app.listen(port, () => `Listening on ${ port } ...`)
    } catch (e) {
      console.log(e)
    }
  }
}
