import React, { Component } from 'react';
import { connect } from 'react-redux';
import AssetQuoteForm from './AssetQuoteForm';
import Navbar from '../Navbar'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions'
import { changeTimeSeries } from '../actions/timeSeriesActions'
import { fetchAssetData } from '../actions/assetDataActions'

// Symbol, Name, Asset Class, Region
class AssetDeck extends Component {

  componentDidMount() {
    // this.props.fetchAllSymbols()
  }

  handleTimeSeriesChange = (timeSeries) => {
    this.props.changeTimeSeries(timeSeries)
  }

  render() {
    const { fetchingData, assetData, assets } = this.props;

    return (
      <div>
        <Navbar changeTimeSeries={this.handleTimeSeriesChange.bind(this)} />
        <div className='asset-deck'>
          <AssetQuoteForm
            assets={assets}
            assetData={assetData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.assets,
    timeSeries: state.timeSeriesChange.timeSeries,
    fetchingData: state.fetchingData,
    assetData: state.assetData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assetActions: bindActionCreators(actions, dispatch),
    changeTimeSeries: bindActionCreators(changeTimeSeries, dispatch),
    // fetchAssetData: bindActionCreators(fetchAssetData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDeck);
