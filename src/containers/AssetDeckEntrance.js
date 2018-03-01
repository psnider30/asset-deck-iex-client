import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Navbar from '../components/Navbar'
import AssetDeck from './AssetDeck';
import * as actions from '../actions/assetActions';
import { changeLayout } from '../actions/layoutActions';
import AssetService from '../services/AssetService';

// import { fetchAssetData } from '../actions/assetDataActions'

class AssetDeckEntrance extends Component {

  constructor(props) {
    super(props)
    const currentPath = this.props.location.pathname
    const { loggedIn, currentUser, history } = this.props;
    this.requireAuth()
    this.state = { userAssets: [] }
  }

  requireAuth = () => {
    const { loggedIn, currentUser, history } = this.props;
    loggedIn && currentUser ? history.push('/assets/quote') : history.push('/login')
  }

  componentDidMount() {
    AssetService.fetchUserAssets()
      .then(userAssets => this.setState({ userAssets }))
  }

  handleLayoutChange = (newLayout) => {
    const currentLayout = this.props.layout
    if (currentLayout !== newLayout) {
      this.props.changeLayout(newLayout, currentLayout)
    }
  }

  addAsset = (asset) => {
    // AssetService.createAsset(asset).then(asset => this.setState({
    //   assets: this.state.userAssets.concat(asset)
    // }))
  }

  render() {
    console.log(this.state.userAssets)
    return (
      <div>
        <Route path='/assets' component={() =>
          <Navbar
            changeLayout={this.handleLayoutChange.bind(this)}
            currentLayout={this.props.layout}
            onEnter={this.requireAuth}
          />}
        />
        <Route path='/assets'
          component={AssetDeck}
          onEnter={this.requireAuth}
        />
        <div className="rails">
          {/* <AddAsset addAsset={this.addAsset} /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.assets,
    layout: state.changeLayout.layout,
    fetchingData: state.fetchingData,
    assetData: state.assetData,
    loggedIn: state.users.loggedIn,
    currentUser: state.users.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assetActions: bindActionCreators(actions, dispatch),
    changeLayout: bindActionCreators(changeLayout, dispatch),
    // fetchAssetData: bindActionCreators(fetchAssetData, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetDeckEntrance));
