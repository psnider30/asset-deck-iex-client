import React from 'react';

const Navbar = ({ changeLayout, currentLayout }) =>
  <div className="navbar">
    <button className="navbar-button" onClick={() => changeLayout('main', currentLayout)}>Quote</button>
    <button className="navbar-button" onClick={() => changeLayout('fundamentals', currentLayout)}>Fundamentals</button>
    {/* <button className="navbar-button" onClick={() => changeLayout('timeSeries', currentLayout)}>Time Series</button> */}
    <button className="navbar-button" onClick={() => changeLayout('changeSummary', currentLayout)}>Change Summary</button>
  </div>

export default Navbar;
