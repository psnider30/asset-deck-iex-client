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
    // Otherwise don't fetch or set sessionStorage and have it set below from nextProps
    const { actions, currentUser } = this.props;
    if (sessionStorage.assets === undefined) { actions.loadUserAssets(currentUser) }
    this.onUnload = this.onUnload.bind(this);
  }

  onUnload(event) {
    // if page is refreshed re-fetch the assets if assets in state are removed but assetsinMemory remain
    const { assets, assetsInMemory, actions, currentUser } = this.props;
    if (sessionStorage.assets && (assetsInMemory.length !== assets.length)) {
      sessionStorage.removeItem('assets')
      actions.loadUserAssets(currentUser)
    }
  }

  componentDidMount() {
    window.addEventListener("load", this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.onUnload)
  }

  // Assets in Memory not updated when asset replaced b/c length of nextProps Assets and Assets is not different
  // SO... check if next Props symbols are different or just check if state updating?

  componentWillReceiveProps(nextProps) {
    const { assets, assetsInMemory, actions } = this.props;
    if (! nextProps.assets ) { return }
    if (nextProps.assets.length !== assets.length) {
      sessionStorage.setItem('assets', JSON.stringify(nextProps.assets))
    }
    // Check if an asset is being added, removed, or repalced and if so update assets in memory
    if (nextProps.assets.length < assets.length) {
      actions.updateAssetsInMemory()
    }

    if (this.props.replacingAsset) {
      sessionStorage.setItem('assets', JSON.stringify(nextProps.assets))
      actions.updateAssetsInMemory()
      actions.resetReplacingAsset()
    }

    if (sessionStorage.assets && (assetsInMemory.length !== assets.length)) {
      // sessionStorage.removeItem('assets')
      // actions.loadUserAssets(currentUser)
    }
  }

  handleSubmit = (event) => {
    const { actions, currentUser, userAssets } = this.props;
    event.preventDefault();
    const asset = this.state.updating ? this.state : {...this.state, id: uuidv4()};
    if (userAssets.includes(asset.symbol.toUpperCase())) {
      alert(`You already added "${asset.symbol.toUpperCase()}"`)
    } else {
      actions.startFetchingData();
      actions.addUserAsset(asset, currentUser, userAssets);
    }
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
    userAssets: state.manageAssets.userAssets,
    replacingAsset: state.manageAssets.replacingAsset,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDeck)
