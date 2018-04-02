import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import Navbar from '../components/Navbar'
import AssetDeck from './AssetDeck';
import * as actions from '../actions/assetActions';
import { changeLayout } from '../actions/layoutActions';
import PropTypes from 'prop-types';

class AssetDeckEntrance extends Component {

  componentDidMount() {
    const currentLayout = this.props.layout
    const pathArr = this.props.location.pathname.split('/')
    const layoutPath = pathArr[pathArr.length - 1]
    if (layoutPath !== currentLayout) {
      this.props.changeLayout(layoutPath, currentLayout)
    }
  }

  handleLayoutChange(newLayout) {
    const currentLayout = this.props.layout
    if (currentLayout !== newLayout) {
      this.props.changeLayout(newLayout, currentLayout)
    }
  }

  render() {
    const { loggedIn, currentUser, location } = this.props;
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
          location.pathname === '/' || location.pathname === '/assets'  || location.pathname === '/assets/' ||
          location.pathname === '/login' || location.pathname === '/signup' ?
           <Redirect to='/assets/quote' /> : null
        }/>
        <Route path='/assets' render={() =>
          <div>
            <h2 className='large-green'>Welcome, {currentUser}</h2>
            <AssetDeck />
          </div>
        }/>
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
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetDeckEntrance));
