import React from 'react';

const Navbar = ({ changeTimeSeries }) =>
  <div className="navbar">
    <button className="navbar-button" onClick={() => changeTimeSeries('1min')}>1 Min</button>
    <button className="navbar-button" onClick={() => changeTimeSeries('daily')}>Daily</button>
    <button className="navbar-button" onClick={() => changeTimeSeries('weekly')}>Weekly</button>
    <button className="navbar-button" onClick={() => changeTimeSeries('monthly')}>Monthly</button>
  </div>

export default Navbar;
