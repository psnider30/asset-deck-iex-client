import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import Navbar from '../components/Navbar'
import AssetDeck from './AssetDeck';
import * as actions from '../actions/assetActions';
import { changeLayout } from '../actions/layoutActions';
import AssetService from '../services/AssetService';
import PropTypes from 'prop-types';

// import { fetchAssetData } from '../actions/assetDataActions'

class AssetDeckEntrance extends Component {

  constructor(props) {
    super(props)
    const currentPath = this.props.location.pathname
    const { authenticated, currentUser, history } = this.props;
    // this.requireAuth()
    this.state = { userAssets: [] }
  }

  componentDidMount() {
    // AssetService.fetchUserAssets()
    //   .then(userAssets => this.setState({ userAssets }))
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
    // console.log(this.state.userAssets)
    const { loggedIn, currentUser, history, location } = this.props;
    return (
      <div>
        <Route path='/assets' component={() =>
          <Navbar
            changeLayout={this.handleLayoutChange.bind(this)}
            currentLayout={this.props.layout}
          />}
        />
        <Route path='/' render={() =>
          !loggedIn ?
          location.pathname === '/login' ? null : location.pathname === '/signup' ? null : <Redirect to='/login' />
          :
          location.pathname === '/' || location.pathname === '/assets'  || location.pathname === '/assets/' ?
           <Redirect to='/assets/quote' /> : null
        }/>
        <Route path='/assets' render={() =>
          <div>
            <h2>Welcome, {currentUser}</h2>
            <AssetDeck />
          </div>
        }/>
        <div className="rails">
          {/* <AddAsset addAsset={this.addAsset} /> */}
        </div>
      </div>
    );
  }
}

const { bool } = PropTypes;

AssetDeckEntrance.propTypes = {
  loggedIn: bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    assets: state.manageAssets.assets,
    layout: state.changeLayout.layout,
    fetchingData: state.manageAssets.fetchingData,
    currentUser: state.users.currentUser,
    loggedIn: state.users.loggedIn,
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
