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

  componentDidMount() {
    fetch(`${APIURL}`)
      .then(response => response.json())
      .then(etfData => this.setState({
        fetchingData: false,
        etfData,
      }))
  }

  render() {
    const { fetchingData, etfData } = this.state;
    const data = etfData["Meta Data"]
    const { etfs, etfToUpdate, actions } = this.props;
    console.log(fetchingData)
    console.log("The etf data is:", etfData)
    console.log(data)
    return (
      <div className='etf-deck'>
        <EtfQuoteForm
          etfs={etfs}
          data={data}
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
