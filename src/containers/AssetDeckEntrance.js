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
import { sessionService } from 'redux-react-session';
import PropTypes from 'prop-types';

// import { fetchAssetData } from '../actions/assetDataActions'

class AssetDeckEntrance extends Component {

  constructor(props) {
    super(props)
    const currentPath = this.props.location.pathname
    const { authenticated, currentUser, history } = this.props;
    this.requireAuth()
    this.state = { userAssets: [] }
  }

  requireAuth = () => {
    sessionService.checkAuth()
    const { authenticated, currentUser, history, checked } = this.props;
    authenticated && currentUser && checked ? history.push('/assets/quote') : history.push('/login')
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
    console.log(this.state.userAssets)
    return (
      <div>
        <Route path='/assets' component={() =>
          <Navbar
            changeLayout={this.handleLayoutChange.bind(this)}
            currentLayout={this.props.layout}
            onEnter={this.requireAuth}
            authenticated={this.props.authenticated}
          />}
        />
        <Route path='/assets'
          component={AssetDeck}
          onEnter={this.requireAuth}
          authenticated={this.props.authenticated}
        />
        <div className="rails">
          {/* <AddAsset addAsset={this.addAsset} /> */}
        </div>
      </div>
    );
  }
}

const { bool } = PropTypes;

AssetDeckEntrance.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    assets: state.assets,
    layout: state.changeLayout.layout,
    fetchingData: state.fetchingData,
    assetData: state.assetData,
    currentUser: state.sessions.user.email,
    checked: state.sessions.checked,
    authenticated: state.sessions.authenticated,
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
