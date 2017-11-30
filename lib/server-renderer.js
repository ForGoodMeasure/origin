import React from 'react';
import scaffold from './scaffold.js';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'
import { Provider } from 'react-redux';
import { RouterProvider } from 'found/lib/server';
import { Actions as FarceActions, ServerProtocol } from 'farce';
import { getStoreRenderArgs, resolver, RedirectException } from 'found';
import ReduxGhost from 'redux-ghost';
import serialize from 'serialize-javascript';

import getLocalContext from './get-local-context';
import withLocalContext from './with-local-context';
import getImageUrls from './get-image-urls';
import getStageContext from './get-stage-context';
import { fetchSiteContent } from './rw-site-content';
import getMetaContentFromStore from './get-meta-content';
import render from './found-render';

function renderPage({
  imageUrls,
  locals,
  scaffolder=scaffold,
  store,
  renderArgs,
  globalStyles
}) {
  const localContext = getLocalContext(locals);
  globalStyles(localContext);

  /*
    Render React application root
  */
  const RouterContext = props => (
    <Provider store={store}>
      <RouterProvider router={renderArgs.router}>
        { render(renderArgs) }
      </RouterProvider>
    </Provider>
  );

  const RouterContextWithLocalContext = withLocalContext(
    RouterContext,
    localContext
  );

  const styleSheet = new ServerStyleSheet();
  const appContent = renderToString(
    styleSheet.collectStyles(<RouterContextWithLocalContext />)
  );

  const metaContent = getMetaContentFromStore(store, localContext);

  /*
    Inject app content into the HTML scaffold
  */
  return scaffolder(
    {localContext, styleSheet, imageUrls, metaContent},
    appContent
  );
}

const serverRenderer = (genStore, config, globalStyles) => (req, res) => {

  const stageContext = getStageContext(config, req);
  ReduxGhost.config({
    host: stageContext.ghostBaseInternal,
    clientId: stageContext.ghostClientId,
    clientSecret: stageContext.ghostClientSecret
  });

  const store = genStore(new ServerProtocol(req.url));
  store.dispatch(FarceActions.init());
  const matchContext = { store };

  getStoreRenderArgs({
    store,
    matchContext,
    resolver
  }).then(renderArgs => {

    if (renderArgs.error) {
      return res.status(renderArgs.error.status).end();
    }

    fetchSiteContent(config, (err, content) => {
      const html = renderPage({
        imageUrls: getImageUrls(),
        locals: {
          stageContext,
          content,
          storeState: serialize(store.getState())
        },
        store,
        renderArgs,
        globalStyles
      });

      res.status(200).send(html);
    });

  })
    .catch(e => {
      console.log(e);
    });

};

export default serverRenderer;
