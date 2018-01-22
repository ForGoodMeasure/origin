import { BrowserProtocol } from 'farce';
import { createConnectedRouter, createBrowserRouter } from 'found';
import { Provider } from 'react-redux';
import { ScrollManager } from 'found-scroll';
import getStoreRenderArgs from 'found/lib/getStoreRenderArgs';
import React from 'react';
import ReactDOM from 'react-dom';
import resolver from 'found/lib/resolver';

import { preload } from './image-preloader';
import getLocalContext from './get-local-context';
import render from './found-render';
import withLocalContext from './with-local-context';

function deserialize(serializedJavascript){
  return eval('(' + serializedJavascript + ')');
}

export default function browserRenderer(genStore, mountPoint) {

  const localContext = getLocalContext({
    stageContext: window.__locals__.stageContext,
    content: window.__locals__.content
  });

  const store = genStore(
    new BrowserProtocol(),
    deserialize(window.__locals__.storeState)
  );
  const matchContext = { store };

  getStoreRenderArgs({
    store,
    matchContext,
    resolver,
  }).then(args => {

    const ConnectedRouter = createConnectedRouter({
      render: renderArgs => (
        <ScrollManager renderArgs={ renderArgs }>
          { render(renderArgs) }
        </ScrollManager>
      )
    });

    const Router = props => (
      <Provider store={store}>
        <ConnectedRouter
          matchContext={ matchContext }
          resolver={ resolver }
          initialRenderArgs={args}
        />
      </Provider>
    );

    const RouterWithLocalContext = withLocalContext(
      Router,
      localContext
    );

    ReactDOM.hydrate(
      <RouterWithLocalContext />,
      mountPoint
    );

  });

}
