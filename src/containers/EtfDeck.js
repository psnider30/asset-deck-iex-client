import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EtfQuoteForm from './EtfQuoteForm.js';
import * as actions from '../actions/etfActions.js'

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

  // addEtf = (etf) => {
  //   this.setState({
  //     etfs: [...this.state.etfs, {id: uuidV4(), ...etf}],
  //   })
  // }

  // editEtf = (id) => {
  //   this.setState({
  //     editingId: id
  //   })
  // }

  render() {
    const { etfs, etfToUpdate, actions } = this.props;
    return (
      <div className='etf-deck'>
        <EtfQuoteForm
          etfs={etfs}
          etfToUpdate={etfToUpdate} />
      </div>
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
