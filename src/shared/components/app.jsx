import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localContextType } from '../util';

const Style = styled.div`
  a {
    display: block;
  }
  .content {
    background: papayawhip;
    text-align: center;
    padding: 1em;
  }
`;

const App = (props, {localContext}) => {
  return (
    <Style>
      <h2>Demo App</h2>
      <Link to={ localContext.resourceUrl("/") }>Home</Link>
      <Link to={ localContext.resourceUrl("/page-1") }>Page1</Link>
      <Link to={ localContext.resourceUrl("/page-2") }>Page2</Link>
      <div className="content">
        { props.params.string }
      </div>
    </Style>
  );
}

App.contextTypes = localContextType;

export default App;
