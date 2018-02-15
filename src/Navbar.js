import React, { Component } from 'react';
import './App.css';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <button className="navbar-button">1 Min</button>
        <button className="navbar-button">Daily</button>
        <button className="navbar-button">Weekly</button>
        <button className="navbar-button">Monthly</button>
      </div>
    );
  }
}
