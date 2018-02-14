import React, { Component } from 'react';
// import uuidV4 from 'uuid/v4';
import { connect } from 'react-redux';
import EtfQuoteForm from './EtfQuoteForm.js';
// import { bindActionCreators } from 'redux';
// import * as actions from '../actions/etfActions.js'

const APIURL =`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSFT&apikey=${process.env.ALPHA_VANTAGE_KEY}`

// Symbol, Name, Asset Class, Region
class EtfDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      etfData: {},
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

  render() {
    const { fetchingData } = this.state;
    const { etfs, etfToUpdate, actions } = this.props;
    console.log(fetchingData)
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

// const mapDispatchToProps = (dispatch) => {
//   return { actions: bindActionCreators(actions, dispatch)};
// }

export default connect(mapStateToProps, null)(EtfDeck);
