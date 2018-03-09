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
import closeLogo from '../close.svg';

class AssetDeck extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
        id: null,
        symbol: '',
        updating: false,
      };
    this.state = this.initialState;

    const assets = this.props.assets;
    if (assets ) { sessionStorage.setItem('assets', JSON.stringify(assets)) }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.assets === this.props.assets) { return }
    const assets = nextProps.assets;
    if (assets ) { sessionStorage.setItem('assets', JSON.stringify(assets))}
    if (nextProps.assets.length !== this.props.assetsInMemory.length) {
      this.props.actions.updateAssetsInMemory()
    }
  }

  handleSubmit = (event) => {
    const { actions, currentUser } = this.props;
    event.preventDefault();
    actions.startFetchingData();
    actions.addUserAsset(this.state, currentUser);
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
    const { assetSelected, fetchingData } = this.props;
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
    currentUser: state.users.currentUser,
    assetsInMemory: state.manageAssets.assetsInMemory,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDeck)
