import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import AssetsQuote from '../components/AssetsQuote';
import AssetsFundamentals from '../components/AssetsFundamentals';
import ChangeSummary from '../components/ChangeSummary';
import AssetsFinancials from '../components/AssetsFinancials';
import TimeSeries from '../components/TimeSeries';
import closeLogo from '../assets/media/close.svg';
import uuidv4 from 'uuid/v4';

class AssetDeck extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
        id: null,
        symbol: '',
        updating: false,
      };

    this.state = this.initialState;
    // if sessionStorage.assets is undefined, then make fetch requests to api to set assets and assetsInMemory
    // Otherwise don't fetch or set sessionStorage and have it set below in componentWillReceiveProps from nextProps
    const { actions, currentUser } = this.props;
    if (sessionStorage.assets === undefined) { actions.loadUserAssets(currentUser) }
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    // if page is refreshed re-fetch the assets if assets in state are removed but assetsinMemory remain
    const { assets, assetsInMemory, actions, currentUser, layout } = this.props;
    if (sessionStorage.assets && (assetsInMemory.length !== assets.length)) {
      sessionStorage.removeItem('assets')
      actions.loadUserAssets(currentUser)
    }
    if (layout === 'quote') { this.props.history.push('/assets/quote'); }
  }

  newTransaction(assets, nextPropsAssets) {
    return assets.reduce((total, asset) => total + asset.shares, 0) !==
    nextPropsAssets.reduce((total, asset) => total + asset.shares, 0)
  }

  componentDidMount() {
    window.addEventListener("load", this.onLoad)
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.onLoad)
  }

  componentWillReceiveProps(nextProps) {
    const { assets, actions } = this.props;
    if (!nextProps.assets) { return }
    if (nextProps.assets.length !== assets.length) {
      sessionStorage.setItem('assets', JSON.stringify(nextProps.assets))
    }

    // Check if an asset is being removed and if so update assets in memory
    // When an asset is added the fetchAssets action in '/actions/assetActions' will run updateAssetsInMemory()
    if (nextProps.assets.length < assets.length) {
      actions.updateAssetsInMemory()
    }
   // Check if an asset is being replaced and if so update assets in memory
    if (this.props.replacingAsset) {
      sessionStorage.setItem('assets', JSON.stringify(nextProps.assets))
      actions.updateAssetsInMemory()
      actions.resetReplacingAsset()
    }
    // Check if any asset shares are being changed and if so update assets in memory
    if (this.props.updatingShares && this.newTransaction(assets, nextProps.assets)) {
      sessionStorage.setItem('assets', JSON.stringify(nextProps.assets))
      actions.updateAssetsInMemory()
      actions.resetUpdatingShares()
    }
  }

  handleSubmit(event) {
    const { actions, currentUser, userAssets } = this.props;
    event.preventDefault();
    const asset = this.state.updating ? {...this.state, newId: uuidv4()} : {...this.state, id: uuidv4()};

    if (!asset.updating && userAssets.includes(asset.symbol.toUpperCase())) {
      alert(`You already added "${asset.symbol.toUpperCase()}"`)
    } else {
      actions.startFetchingData();
      actions.addUserAsset(asset, currentUser, userAssets);
    }
    this.setState(this.initialState);
  }

  handleChange(event) {
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
    // get the symbol if asset is selected to see returns in TimeSeries layout for TimeSeries path below
    const symbol = assetSelected ? assetSelected.quote.symbol : ''
    const updating = this.state.updating;
    let exitUpdateButton;

    if (updating) {
      exitUpdateButton =
      <button className='exit-update-button' onClick={this.handleExitUpdate}>
        Exit Update
      </button>
    }
    const quoteForm =
        <div className='quote-form'>
        <form onSubmit={(event) => this.handleSubmit(event)}>
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
      // First line checks the layout and if it is timeSeries then the quoteForm is not rendered
      <div>
        {this.props.layout !== 'timeSeries' ? quoteForm : null}
        {
          fetchingData ?
          <div>
            <br />
            <img src={closeLogo} className="App-logo" alt="logo" />
          </div>
          :
          <div className="assets-layout">
            <Switch>
              <Route exact path="/assets/quote"
                component={() =>
                  <AssetsQuote
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                    handleExitUpdate={this.handleExitUpdate.bind(this)}
                  />}
              />
              <Route exact path="/assets/fundamentals"
                component={() =>
                  <AssetsFundamentals
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                    handleExitUpdate={this.handleExitUpdate.bind(this)}
                  />}
              />
              <Route exact path="/assets/change-summary"
                component={() =>
                  <ChangeSummary
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                    handleExitUpdate={this.handleExitUpdate.bind(this)}
                  />}
              />
              <Route exact path="/assets/financials"
                component={() =>
                  <AssetsFinancials
                    onUpdateAsset={this.onUpdateAsset.bind(this)}
                    handleExitUpdate={this.handleExitUpdate.bind(this)}
                  />}
              />
              <Route
                exact path={"/assets/" + symbol + "/returns"}
                component={TimeSeries}
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
    userAssets: state.manageAssets.userAssets,
    replacingAsset: state.manageAssets.replacingAsset,
    updatingShares: state.manageAssets.updatingShares,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetDeck))
