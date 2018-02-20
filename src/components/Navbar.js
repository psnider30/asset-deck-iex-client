import React from 'react';

const Navbar = ({ changeLayout }) =>
  <div className="navbar">
    <button className="navbar-button" onClick={() => changeLayout('main')}>Quote</button>
    <button className="navbar-button" onClick={() => changeLayout('fundamentals')}>Fundamentals</button>
    <button className="navbar-button" onClick={() => changeLayout('timeSeries')}>Time Series</button>
    {/* <button className="navbar-button" onClick={() => changeLayout('monthly')}>Monthly</button> */}
  </div>

export default Navbar;
