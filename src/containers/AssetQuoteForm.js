import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions';
import AssetsQuote from '../components/AssetsQuote';
import AssetsFundamentals from '../components/AssetsFundamentals';
import ChangeSummary from '../components/ChangeSummary';
import AssetsFinancials from '../components/AssetsFinancials';
import TimeSeries from '../components/TimeSeries';
import '../table.css';

class AssetQuoteForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
        id: null,
        symbol: '',
        timeSeries: '1d',
        updating: false,
      };
    this.state = this.initialState
  }

  handleSubmit = (event) => {
      event.preventDefault();
      this.props.actions.startFetchingData();
      this.props.actions.fetchAsset(this.state);
      this.setState(this.initialState);
    }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value});
  }

  onUpdateAsset = (assetToUpdate) => {
    this.setState({
      id: assetToUpdate.id,
      symbol: assetToUpdate.quote.symbol,
      updating: true,
   });
  }

  handleExitUpdate = () => {
    this.setState(this.initialState)
  }

  submitOrUpdate = () => {
    return this.state.updating ? 'Update Asset' : 'Add Asset'
  }

  render() {
    const {layout, fetchingData, assets } = this.props;
    const updating = this.state.updating;
    let exitUpdateButton;
    let timeSeriesMenu;
    if (updating) {
      exitUpdateButton =
      <button className='exit-update-button' onClick={this.handleExitUpdate}>
        Don't Update
      </button>
    }

    if (layout === 'timeSeries') {
      timeSeriesMenu =
      <div className='time-series-menu'>
        <label htmlFor='timeSeries' id='time-series-label'>Time Series </label>
        <select name='timeSeries' onChange={(event) => this.handleChange(event)}>
          <option value='1d'>Day</option>
          <option value='1m'>Month</option>
          <option value='3m'> 3 Month</option>
          <option value='6m'> 6 Month</option>
          <option value='ytd'>Year-to-date</option>
        </select>
        <br />
      </div>
    }

    return (
      <div>
        <div className='quote-form'>
          <form onSubmit={(event) => this.handleSubmit(event) }>
            <label id='asset-lookup-label' htmlFor='symbol'>Asset Lookup </label>
            <input type='text' id='asset-lookup-input' name='symbol'
              placeholder='ticker symbol'
              onChange={(event) => this.handleChange(event)}
              value={this.state.symbol} />
            <br />
            {timeSeriesMenu}
            <input className='submit-update-button' type='submit' value={this.submitOrUpdate()}/>
            {exitUpdateButton}
          </form>
          <br />
        </div>
        {
            fetchingData ?
            <div>Fetching</div>
            :
            <div className="asset-layout">
              {layout === 'main' &&
              <AssetsQuote
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset} />
              }
              {layout === 'fundamentals' &&
              <AssetsFundamentals
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset} />
              }
              {layout === 'changeSummary' &&
              <ChangeSummary
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset} />
              }
              {layout === 'financials' &&
              <AssetsFinancials
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset} />
              }
              {layout === 'timeSeries' &&
              <TimeSeries
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset} />
              }
            </div>
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.manageAssets.assets,
    fetchingData: state.manageAssets.fetchingData,
    layout: state.layout,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetQuoteForm)
