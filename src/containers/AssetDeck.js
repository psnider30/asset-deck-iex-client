import React, { Component } from 'react';
// import uuidV4 from 'uuid/v4';
import { connect } from 'react-redux';
import AssetQuoteForm from './AssetQuoteForm';
import Navbar from '../Navbar'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions'
import { changeTimeSeries } from '../actions/timeSeriesActions'


const APIURL =`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSFT&apikey=${process.env.ALPHA_VANTAGE_KEY}`

// Symbol, Name, Asset Class, Region
class AssetDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      assetData: {},
    };
  }

  componentDidMount() {
    fetch(`${APIURL}`)
      .then(response => response.json())
      .then(assetData => this.setState({
        fetchingData: false,
        assetData,
      }))
  }

  handleTimeSeriesChange = (timeSeries) => {
    this.props.changeTimeSeries(timeSeries)
  }

  render() {
    const { fetchingData, assetData } = this.state;
    const data = assetData["Meta Data"]
    const { assets, assetToUpdate } = this.props;
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assetActions: bindActionCreators(actions, dispatch),
    changeTimeSeries: bindActionCreators(changeTimeSeries, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDeck);
