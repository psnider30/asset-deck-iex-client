import React, { Component } from 'react'
import EtfQuoteForm from './EtfQuoteForm.js'
import Etfs from './Etfs.js'
import uuid from 'uuid';

// Symbol, Name, Asset Class, Region
export default class Etf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      etfs: [],
    };
  }

  componentWillMount = () => {
    this.setState({
      etfs: [
        ...this.state.etfs,
        {id: uuid(), symbol: 'SPX', name: 'S&P 500'}
      ]
    })
  }

  componentDidMount = () => {

  }

  addEtf = (etf) => {
    this.setState({
      etfs: [...this.state.etfs, {id: uuid(), ...etf}],
    })
  }

  render() {
    return (
      <div>
        <h1>ETF App</h1>
        <EtfQuoteForm addOnSubmit={this.addEtf.bind(this)} />
        <Etfs etfs={this.state.etfs} />
      </div>
    );
  }
}
