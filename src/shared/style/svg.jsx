import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '../constants';

const SVG = (props, { localContext }) => {
  const Style = styled.div`
    svg g {
      stroke: ${ props.stroke };
    }
    svg rect {
      fill: ${ props.fill };
    }
  `;
  const svgData = {
    __html: require(`../../svg/${ props.path }`)
  };
  return (
    <Style
      className={ props.className || ''}
      dangerouslySetInnerHTML={ svgData }
    />
  );
};

SVG.contextTypes = {
  localContext: PropTypes.object
};

export default SVG;
