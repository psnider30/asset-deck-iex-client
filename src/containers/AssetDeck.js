import React, { Component } from 'react';
// import uuidV4 from 'uuid/v4';
import { connect } from 'react-redux';
import AssetQuoteForm from './AssetQuoteForm';
import Navbar from '../Navbar'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions'
import { changeTimeSeries } from '../actions/timeSeriesActions'
import { startFetchingData, stopFetchingData } from '../actions/fetchingDataActions'


const APIURL =`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSFT&apikey=${process.env.ALPHA_VANTAGE_KEY}`

// Symbol, Name, Asset Class, Region
class AssetDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assetData: {},
    };
  }

  componentDidMount() {
    fetch(`${APIURL}`)
      .then(response => response.json())
      .then(assetData => {
        this.setState({
          assetData,
      }), this.props.stopFetchingData();
    })
  }

  handleTimeSeriesChange = (timeSeries) => {
    this.props.changeTimeSeries(timeSeries)
  }

  render() {
    const { assetData } = this.state;
    const data = assetData["Meta Data"]
    const { fetchingData, assets, assetToUpdate } = this.props;
    console.log(fetchingData)
    console.log("The asset data is:", assetData)
    console.log(data)
    return (
      <div>
        <Navbar changeTimeSeries={this.handleTimeSeriesChange.bind(this)} />
        <div className='asset-deck'>
          <AssetQuoteForm
            assets={assets}
            data={data}
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
    fetchingData: state.fetchingData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assetActions: bindActionCreators(actions, dispatch),
    changeTimeSeries: bindActionCreators(changeTimeSeries, dispatch),
    startFetchingData: bindActionCreators(startFetchingData, dispatch),
    stopFetchingData: bindActionCreators(stopFetchingData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDeck);
