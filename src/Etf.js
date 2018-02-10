import React, { Component } from 'react'
import EtfQuoteForm from './EtfQuoteForm.js'

// Ticker, Asset Class, Region
export default class Etf extends Component {
  constructor(props) {
    super(props);


    this.state = {
      etfs: [],
    };
  }

  render() {
    return (
      <div>
        <h1>ETF App</h1>
        <EtfQuoteForm />
      </div>
    );
  }
}
