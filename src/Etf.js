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

  addEtf = (etf) => {
    this.setState({
      etfs: [...this.state.etfs, etf],
    })
  }

  render() {
    return (
      <div>
        <h1>ETF App</h1>
        <EtfQuoteForm addOnSubmit={this.addEtf.bind(this)} />
      </div>
    );
  }
}
