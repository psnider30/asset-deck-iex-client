import React, { Component } from 'react';
// import uuidV4 from 'uuid/v4';
import { connect } from 'react-redux';
import AssetQuoteForm from './AssetQuoteForm.js';
// import { bindActionCreators } from 'redux';
// import * as actions from '../actions/assetActions.js'

const APIURL =`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSFT&apikey=${process.env.ALPHA_VANTAGE_KEY}`

// Symbol, Name, Asset Class, Region
class AssetDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      financeData: {},
      assetToUpdate: null,
    };
  }

  componentDidMount() {
    fetch(`${APIURL}`)
      .then(response => response.json())
      .then(financeData => this.setState({
        fetchingData: false,
        financeData,
      }))
  }

  render() {
    const { fetchingData, financeData } = this.state;
    const data = financeData["Meta Data"]
    const { assets, assetToUpdate, actions } = this.props;
    console.log(fetchingData)
    console.log("The asset data is:", financeData)
    console.log(data)
    return (
      <div className='asset-deck'>
        <AssetQuoteForm
          assets={assets}
          data={data}
          assetToUpdate={assetToUpdate} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.assetDeck.assets,
    assetToUpdate: state.assetDeck.assetToUpdate,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return { actions: bindActionCreators(actions, dispatch)};
// }

export default connect(mapStateToProps, null)(AssetDeck);
