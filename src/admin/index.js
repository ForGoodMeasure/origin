import dotty from 'dotty';
import { render } from 'react-dom';
import React from 'react';
import Form from 'react-jsonschema-form';
import styled from 'styled-components';
import request from 'superagent';
import PropTypes from 'prop-types';

import getLocalContext from '../../lib/get-local-context';
import withLocalContext from '../../lib/with-local-context';
import { tryParse } from '../../lib/admin-page-bridge';

import contentSchema from '../assets/content/content-schema.json';

const EditorContainer = styled.div`
  width: 40%;
  height: 100%;
  overflow: scroll;
  position: absolute;
  left: 0;
  background: #303030;
  padding: 40px 40px 200px;
  textarea {
    resize: vertical;
  }
`;
const PreviewContainer = styled.div`
  width: 60%;
  height: 100%;
  position: absolute;
  right: 0;
  iframe {
    width: 100%;
    height: 100%;
  }
`;

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      path: 'home'
    }
  }

  componentDidMount() {
    window.onmessage = this.onIframeRouteChange;
  }

  getSchema() {
    const properties = dotty.get(
      contentSchema,
      `properties.${ this.state.path }.properties`
    ) || [];
    return {
      ...contentSchema,
      properties
    };
  }

  getValues() {
    const content = window.__locals__.content;
    return content[this.state.path];
  }

  onIframeRouteChange(e) {
    const data = tryParse(e.data);
    if (data.topic === '__viewer_route_change') {
      const newPath = data.path === '' ? 'home' : data.path;
      this.setState({
        path: newPath
      });
    }
  }

  onFormChange(e) {
    const content = window.__locals__.content;
    // Merge in modified content
    const modifiedContent = {
      ...content,
      [this.state.path]: e.formData
    };
    const data = JSON.stringify({
      topic: '__refresh_content',
      content: modifiedContent
    });
    this.refs.viewerIframe.contentWindow.postMessage(data, '*');
  }

  onFormSubmit(e) {
    if (!window.confirm("Are you sure? This will save changes to the staging server.")) {
      return;
    }
    request
      .post(this.context.localContext.resourceUrl('/admin/content'))
      .send({
        data: e.formData,
        path: this.state.path
      })
      .end((err, res) => {
        if (err) {
          return window.alert('There was an error saving the content.');
        }
        window.alert('Content successfully saved');
        console.log(err, res);
      });
  }

  onPublishClick() {
    if (!window.confirm("Are you sure? This will publish your changes to the production website.")) {
      return;
    }
    request
      .post(this.context.localContext.resourceUrl('/admin/publish'))
      .end((err, res) => {
        if (err) {
          return window.alert('There was an error publishing the content.');
        }
        window.alert('Content successfully published!');
        console.log(err, res);
      });
  }

  render() {
    return (
      <div>
        <EditorContainer>
          <Form
            schema={this.getSchema()}
            formData={this.getValues()}
            onSubmit={this.onFormSubmit}
            onChange={this.onFormChange}
            acceptcharset="ISO-8859-1"
          />
          <button
            onClick={this.onPublishClick}
            className="btn"
          >
            Publish
          </button>
        </EditorContainer>
        <PreviewContainer>
          <iframe
            src={this.context.localContext.resourceUrl("/")}
            ref="viewerIframe"
          />
        </PreviewContainer>
      </div>
    );
  }

}

Index.contextTypes = {
  localContext: PropTypes.object
};

function renderPage() {
  const localContext = getLocalContext({
    stageContext: window.__locals__.stageContext,
    content: window.__locals__.content
  });

  const IndexWithLocalContext = withLocalContext(
    Index,
    localContext
  );

  render(
    React.createElement(IndexWithLocalContext),
    document.getElementById('app-content')
  );
}

renderPage();
