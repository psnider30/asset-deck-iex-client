import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    const { changeLayout, currentLayout } = this.props;
    const timeSeriesButton = currentLayout === 'timeSeries' ? <button className="navbar-button-active">Returns</button> : null;
    return (
      <div className="navbar">
        <Link to="/assets/quote">
          <button
            className={this.props.currentLayout === "main" ? "navbar-button-active" : "navbar-button"}
            onClick={() => changeLayout('main', currentLayout)}>
            Quote
          </button>
        </Link>
        <Link to="/assets/change-summary">
          <button
            className={this.props.currentLayout === "changeSummary" ? "navbar-button-active" : "navbar-button"}
            onClick={() => changeLayout('changeSummary', currentLayout)}>
            Change Summary
          </button>
        </Link>
        <Link to="/assets/fundamentals">
          <button
            className={this.props.currentLayout === "fundamentals" ? "navbar-button-active" : "navbar-button"}
            onClick={() => changeLayout('fundamentals', currentLayout)}>
            Fundamentals
          </button>
        </Link>
        <Link to="/assets/financials">
          <button
            className={this.props.currentLayout === "financials" ? "navbar-button-active" : "navbar-button"}
            onClick={() => changeLayout('financials', currentLayout)}>
            Financials
          </button>
        </Link>
        {timeSeriesButton}
      </div>
    );
  }
}
