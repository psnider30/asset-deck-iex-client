import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions';
import { changeLayout } from '../actions/layoutActions';
import AssetsQuote from '../components/AssetsQuote';
import AssetsFundamentals from '../components/AssetsFundamentals';
import ChangeSummary from '../components/ChangeSummary';
import AssetsFinancials from '../components/AssetsFinancials';
import TimeSeries from '../components/TimeSeries';
import '../table.css';
import close from '../close.svg'

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

    if (updating) {
      exitUpdateButton =
      <button className='exit-update-button' onClick={this.handleExitUpdate}>
        Don't Update
      </button>
    }
    const quoteForm =
        <div className='quote-form'>
        <form onSubmit={(event) => this.handleSubmit(event) }>
          <label id='asset-lookup-label' htmlFor='symbol'>Asset Lookup </label>
          <input type='text' id='asset-lookup-input' name='symbol'
            placeholder='ticker symbol'
            onChange={(event) => this.handleChange(event)}
            value={this.state.symbol} />
          <br />
          <input className='submit-update-button' type='submit' value={this.submitOrUpdate()}/>
          {exitUpdateButton}
        </form>
        <br />
      </div>

    return (
      <div>
        {this.props.layout !== 'timeSeries' ? quoteForm : null}
        {
            fetchingData ?
            <div>
              <br />
              <img src={close} className="App-logo" alt="logo" />
            </div>
            :
            <div className="asset-layout">
              {layout === 'main' &&
              <AssetsQuote
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset}
                changeLayout={this.props.changeLayout}
                layout={this.props.layout} />
              }
              {layout === 'fundamentals' &&
              <AssetsFundamentals
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset}
                changeLayout={this.props.changeLayout}
                layout={this.props.layout}  />
              }
              {layout === 'changeSummary' &&
              <ChangeSummary
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset}
                changeLayout={this.props.changeLayout}
                layout={this.props.layout}  />
              }
              {layout === 'financials' &&
              <AssetsFinancials
                assets={assets}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset}
                changeLayout={this.props.changeLayout}
                layout={this.props.layout}  />
              }
              {layout === 'timeSeries' &&
              <TimeSeries
                assets={assets}
                assetSelected={this.props.assetSelected}
                onUpdateAsset={this.onUpdateAsset.bind(this)}
                removeAsset={this.props.actions.removeAsset}
                changeLayout={this.props.changeLayout}
                layout={this.props.layout}  />
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
    layout: state.changeLayout.layout,
    assetSelected: state.changeLayout.asset,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    changeLayout: bindActionCreators(changeLayout, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetQuoteForm)
