import React from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getEventManagerInstance } from '../style/event-manager';

const eventMangerInstance = getEventManagerInstance();

const Style = styled.div`
  opacity: 1;
  visibility: inherit;
  transition:
    opacity ${ props => props.duration } ${ props => props.ease } ${ props => props.delay },
    visibility ${ props => props.duration } ${ props => props.ease } ${ props => props.delay };
  &.visible {
    transition-delay: ${ props => props.delay || '0s'};
  }
  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
`;
Style.defaultProps = {
  duration: '0.6s',
  ease: 'ease',
  delay: '0s'
};

const propTypes = {
  listen: PropTypes.bool,
  isVisible: PropTypes.any,
  forceVisibility: PropTypes.bool,
  showInitially: PropTypes.bool,
  hideInitially: PropTypes.bool
};
const defaultProps = {
  listen: false,
  showInitially: true,
  hideInitially: false
};

class Hideable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: (
        this.props.showInitially === true &&
        this.props.hideInitially === false
      )
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: this.evaluateVisibility(nextProps)
    });
  }

  componentDidMount() {
    if (this.props.listen || this.props.autoHide) {
      this.eventId = eventMangerInstance.addEvent(() => {
        this.setState({
          isVisible: this.evaluateVisibility(this.props)
        });
      });
    }
    this.setState({
      isVisible: this.evaluateVisibility(this.props)
    });
  }

  componentWillUnmount() {
    if (this.eventId) {
      eventMangerInstance.removeEvent(this.eventId);
    }

  }

  evaluateVisibility(props) {
    const computeVisibility = () => {
      switch(typeof props.isVisible) {
        case 'function':
          return props.isVisible();
        case 'boolean':
          return props.isVisible;
        case 'undefined':
          return true;
        default:
          return false;
      }
    };

    if (props.autoHide) {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerHeight = 3/4;
      const element = ReactDOM.findDOMNode(this.refs.wrapper);
      const elementPosition = element && element.offsetTop;
      return scrollPosition + windowHeight * triggerHeight > elementPosition;
    }

    // No need to update here
    if (props.forceVisibility) {
      return true;
    }
    return computeVisibility();
  }

  render() {
    return (
      <Style
        { ...this.props }
        ref="wrapper"
        className={classNames(
          (this.props.forceVisibility || this.state.isVisible) ? 'visible' : 'hidden',
          {autohide: this.props.autoHide}
        )}
      >
        { this.props.children }
      </Style>
    );
  }

};

Hideable.propTypes = propTypes;
Hideable.defaultProps = defaultProps;

export default Hideable;
