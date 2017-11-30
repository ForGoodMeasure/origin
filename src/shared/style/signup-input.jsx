import React from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg'
import emailValidator from 'email-validator';
import axios from 'axios';

import { Input, Button, Small } from '../style/shared';
import { COLORS } from '../constants';

const SIGNUP_URL = 'https://vw6h205hj5.execute-api.us-east-1.amazonaws.com/dev/signup';

const SignupInputStyle = styled.span`
  display: flex;
  width: 100%;
  position: relative;
  .info {
    position: absolute;
    bottom: -2em;
    font-size: 0.7em;
    padding-left: 1.4em;
    font-family: 'GT-America-Mono';
  }
`;

class SignupInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loadingState: 'ready'
    };
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleKeydown = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    if (!emailValidator.validate( this.state.value )) {
      this.setState({
        loadingState: 'invalid'
      });
      return;
    }

    this.setState({
      loadingState: 'loading'
    });

    axios
      .post(SIGNUP_URL, {
        emailToAdd: this.state.value,
        projectId: this.props.projectId
      })
      .then(res => {
        this.setState({
          loadingState: 'success'
        });
      })
      .catch(err => {
        return this.setState({
          loadingState: 'error'
        });
      });
  }

  render() {

    let textResponse;
    switch(this.state.loadingState) {
      case 'loading':
        textResponse = 'Waiting ...';
        break;
      case 'error':
        textResponse = 'An error occured. Please try again.';
        break;
      case 'invalid':
        textResponse = 'Please enter a valid email address.';
        break;
      case 'success':
        textResponse = 'Thank you for subscribing!';
        break;
      default:
        break;
    }

    const props = this.props;

    return (
      <SignupInputStyle>
        <Input
          placeholder={ props.placeholder }
          value={ this.state.value }
          onChange={ this.handleInputChange }
          onKeyDown={ this.handleKeydown }
          bgColor={ props.colorA }
          textColor={ props.colorB }
        />
        <Button
          bgColor={ props.colorB }
          textColor={ props.colorA }
          onClick={ this.handleSubmit }
        >
          <span>{ props.buttonText }</span>
        </Button>
        { textResponse && (
          <div className="info">
            { textResponse }
          </div>
        )}
      </SignupInputStyle>
    );
  }
}

export default SignupInput;
