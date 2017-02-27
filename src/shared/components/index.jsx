import {Link} from 'react-router';
import React from 'react';

export const App = (props) => (
  <div>
    <h1>Hello!</h1>
    {props.children}
  </div>
);

export const Welcome = () => (
  <div>
    Welcome!!
    <Link to="/dashboard">Dash</Link>
  </div>
);

export const Dashboard = () => (
  <div>
    Cool Dashboard
    <Link to="/">Home</Link>
  </div>
);