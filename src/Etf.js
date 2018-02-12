import React, { Component } from 'react';
import EtfQuoteForm from './EtfQuoteForm.js';
import Etfs from './Etfs.js';
import uuidv4 from 'uuid/v4';
import { Route, Switch } from 'react-router-dom';

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
        {id: uuidv4(), symbol: 'SPX', name: 'S&P 500'}
      ]
    })
  }

  componentDidMount = () => {

  }

  addEtf = (etf) => {
    this.setState({
      etfs: [...this.state.etfs, {id: uuidv4(), ...etf}],
    })
  }

  render() {
    return (
      <div>
        <h1>ETF App</h1>

          <Route
            path='/etfs/new'
            component={ () => <EtfQuoteForm addOnSubmit={this.addEtf.bind(this)} /> }
          />
          <Route
            exaxct path='/etfs'
            component={ () => <Etfs etfs={this.state.etfs} /> }
           />
      
      </div>
    );
  }
}
