import React, { Component } from 'react';
// import uuidV4 from 'uuid/v4';
import { connect } from 'react-redux';
import AssetQuoteForm from './AssetQuoteForm';
import Navbar from '../Navbar'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions'
import { changeTimeSeries } from '../actions/timeSeriesActions'
import { startFetchingData, stopFetchingData } from '../actions/fetchingDataActions'
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
    // const data = assetData["Meta Data"]
    const { fetchingData, assetData, assets, assetToUpdate } = this.props;
    // console.log(fetchingData)
    // console.log("The asset data is:", assetData)
    // console.log(data)
    return (
      <div>
        <Navbar changeTimeSeries={this.handleTimeSeriesChange.bind(this)} />
        <div className='asset-deck'>
          <AssetQuoteForm
            assets={assets}
            assetData={assetData}
            assetToUpdate={assetToUpdate} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.manageAssets.assets,
    assetToUpdate: state.manageAssets.assetToUpdate,
    timeSeries: state.timeSeriesChange.timeSeries,
    fetchingData: state.fetchingData,
    assetData: state.assetData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assetActions: bindActionCreators(actions, dispatch),
    changeTimeSeries: bindActionCreators(changeTimeSeries, dispatch),
    startFetchingData: bindActionCreators(startFetchingData, dispatch),
    stopFetchingData: bindActionCreators(stopFetchingData, dispatch),
    // fetchAssetData: bindActionCreators(fetchAssetData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDeck);
