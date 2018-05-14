import express from 'express'
import basicAuth from 'express-basic-auth';
import bodyParser from 'body-parser'

import { renderPage } from './isomorphic-renderer';
import getStageContext from './get-stage-context';
import {fetchSiteContent, updateSiteContent, publishSite} from './rw-site-content';
import adminScaffold from './admin-scaffold.js';
import getLocalContext from './get-local-context';

const app = express();
const authConfig = {};

app.get('/', (req, res) => {
  const stageContext = getStageContext(req);
  fetchSiteContent(stageContext, (err, content) => {
    const localContext = getLocalContext({stageContext, content});
    const html = adminScaffold({
      localContext
    })
    res.status(200).send(html);
  });
});

app.post('/content', bodyParser.json(), (req, res) => {
  const stageContext = getStageContext(req);
  updateSiteContent(stageContext, req.body, (err, response) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('OK');
  });
});

app.post('/publish', (req, res) => {
  const stageContext = getStageContext(req);
  publishSite(stageContext, (err, response) => {
    if (err) {
      return res.status(500).send(String(err));
    }
    res.status(200).send('OK');
  })
});

export default app;
