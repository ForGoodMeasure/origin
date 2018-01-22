import { onMessage } from '../../lib/admin-page-bridge';
import browserRenderer from '../../lib/browser-renderer';
import genStore from '../shared/gen-store';

function renderPage() {
  browserRenderer(
    genStore,
    document.getElementById('app-content')
  );
}

/*
  Admin bridge setup
*/
window.addEventListener('message', onMessage(message => {
  window.__locals__.content = message.content;
  renderPage();
}));

window.onload = renderPage;
