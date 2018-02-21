import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions';
import { startFetchingData, stopFetchingData }from '../actions/fetchingDataActions';
import AssetsQuote from '../components/AssetsQuote';
import AssetsFundamentals from '../components/AssetsFundamentals';
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
      this.props.startFetchingData();
      this.props.actions.fetchAsset(this.state);
      this.setState(this.initialState);
      this.props.stopFetchingData();
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
    if (updating) {
      exitUpdateButton = <button onClick={this.handleExitUpdate}>Exit Without Updating</button>
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

            <label htmlFor='timeSeries'>Time Series </label>
            <select name='timeSeries'
              onChange={(event) => this.handleChange(event)}>
              <option value='1d'>Day</option>
              <option value='1m'>Month</option>
              <option value='3m'> 3 Month</option>
              <option value='6m'> 6 Month</option>
              <option value='ytd'>Year-to-date</option>
            </select>
            <br />
            <div className="submit-form">
              <span> <input className='col-sm' type='submit' value={this.submitOrUpdate()}/></span>
              <span className='col-sm'> {exitUpdateButton} </span>
            </div>
          </form>
          <br />
        </div>
        {
            fetchingData ?
            <p>Fetching</p>
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
            </div>
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    assets: state.assets,
    layout: state.layout,
    fetchingData: state.fetchingData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    startFetchingData: bindActionCreators(startFetchingData, dispatch),
    stopFetchingData: bindActionCreators(stopFetchingData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetQuoteForm)
