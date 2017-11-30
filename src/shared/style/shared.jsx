import { Link } from 'found';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants';

export const Image = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  background-position-x: ${ p => p.positionX || 'center'};
  background-size: ${ p => p.size || 'contain'};
  background-repeat: no-repeat;
  background-image: url('${ p => p.src }');
`;

const SmallStyle = styled.div`
  font-size: 0.8em;
  font-family: 'GT-America-Mono';
  text-transform: uppercase;
`;
export const Small = props => (
  <SmallStyle className={`small ${ props.className }`}>
    { props.children }
  </SmallStyle>
);

const ButtonStyle = styled.button`
  border: none;
  border-radius: 0;
  padding: 0.5em 1em;
  color: ${ p => p.textColor };
  background: ${ p => p.bgColor };
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
  outline: none;
  letter-spacing: 0.2em;
  transition: transform 100ms;
  border-radius: 0;
  span {
    font-size: 0.7em;
  }
  &:hover {
    transform: scale(1.04, 1.04);
  }
  &:active {
    transform: none;
  }
`;
export const Button = props => {
  const ConditionalLink = props.linkTo
    ? p => <Link to={ props.linkTo }> { p.children } </Link>
    : p => p.children;

  return (
    <ConditionalLink to={ props.linkTo }>
      <ButtonStyle onClick={ props.onClick } {...props} >
        { props.children }
      </ButtonStyle>
    </ConditionalLink>
  )
};

export const Input = styled.input`
  border: none;
  background: ${ p => p.bgColor };
  color: ${ p => p.textColor };
  padding: 0.5em 1em;
  flex: 1;
  margin-right: 1em;
  &::placeholder {
    color: ${ p => p.textColor };
  }
  &:active, &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 0.7em;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
`;
