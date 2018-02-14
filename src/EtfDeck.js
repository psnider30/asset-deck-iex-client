import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EtfQuoteForm from './EtfQuoteForm.js';
import * as actions from './actions/etfActions.js'

// Symbol, Name, Asset Class, Region
class EtfDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingId: null,
      etfToUpdate: null,
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

  addEtf = (etf) => {
    this.setState({
      etfs: [...this.state.etfs, {id: uuidV4(), ...etf}],
    })
  }

  // editEtf = (id) => {
  //   this.setState({
  //     editingId: id
  //   })
  // }

  render() {
    const { etfs, etfToUpdate, actions } = this.props;
    return (
      <Router>
        <div>
          <h1>ETF App</h1>
          <div>
            <NavLink style={{ marginRight: '10px' }} to="/etfs">Your Portfolio</NavLink>
            <NavLink style={{ marginRight: '10px' }} to="/etfs/new">Add ETF</NavLink>
          </div>
          <EtfQuoteForm
            etfs={etfs}
            etfToUpdate={etfToUpdate}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    etfs: state.etfDeck.etfs,
    etfToUpdate: state.etfDeck.etfToUpdate,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps,mapDispatchToProps)(EtfDeck);
