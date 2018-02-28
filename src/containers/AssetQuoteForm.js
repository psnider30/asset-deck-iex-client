import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions';
import { Route, Switch } from 'react-router-dom';
import AssetsQuote from '../components/AssetsQuote';
import AssetsFundamentals from '../components/AssetsFundamentals';
import ChangeSummary from '../components/ChangeSummary';
import AssetsFinancials from '../components/AssetsFinancials';
import TimeSeries from '../components/TimeSeries';
import '../table.css';
import closeLogo from '../close.svg'

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
    const {assetSelected, fetchingData} = this.props;
    const symbol = assetSelected ? assetSelected.quote.symbol : ''
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
            <img src={closeLogo} className="App-logo" alt="logo" />
          </div>
          :
          <div className="asset-layout">
            <Switch>
              <Route exact path="/assets/quote"
                component={() =>
                  <AssetsQuote
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                  />}
              />

              <Route exact path="/assets/fundamentals"
                component={() =>
                  <AssetsFundamentals
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                  />}
              />

              <Route exact path="/assets/change-summary"
                component={() =>
                  <ChangeSummary
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                  />}
              />

              <Route exact path="/assets/financials"
                component={() =>
                  <AssetsFinancials
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                  />}
              />

              <Route
                exact path={"/assets/" + symbol + "/returns"}
                component={() =>
                  <TimeSeries
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                  />}
              />
            </Switch>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetQuoteForm)
