import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import EtfQuoteForm from './EtfQuoteForm.js';
import Etfs from './Etfs.js';

// Symbol, Name, Asset Class, Region
class EtfDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: null,
    };
  }

  // componentWillMount = () => {
  //   this.setState({
  //     etfs: [
  //       ...this.state.etfs,
  //       {id: uuidV4(), symbol: 'SPY', name: 'S&P 500',
  //       assetClass: 'Equity', region: 'North America'}
  //     ]
  //   })
  // }

  // addEtf = (etf) => {
  //   this.setState({
  //     etfs: [...this.state.etfs, {id: uuidV4(), ...etf}],
  //   })
  // }

  editEtf = (id) => {
    this.setState({
      editing: id
    })
  }

  findEtf = (id) => {
    return this.props.etfs.find(etf => etf.id === id)
  }

  render() {
    return (
      <Router>
        <div>
          <h1>ETF App</h1>
          <div>
            <NavLink style={{ marginRight: '10px' }} to="/etfs">Your Portfolio</NavLink>
            <NavLink style={{ marginRight: '10px' }} to="/etfs/new">Add ETF</NavLink>
          </div>
            <Route
              path='/etfs/new'
              render={ () =>
                <EtfQuoteForm
                  editing = {this.state.editing}
                  findEtf = {this.findEtf}/> }
            />
            <Route
              exaxct path='/etfs'
              render={ () =>
                <Etfs
                  etfs={this.props.etfs}
                  editEtf = {this.editEtf.bind(this)} /> }
             />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { etfs: state.etfDeck.etfs };
}

export default connect(mapStateToProps,null)(EtfDeck);
