import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Navbar from '../components/Navbar'
import AssetQuoteForm from './AssetQuoteForm';
import * as actions from '../actions/assetActions';
import { changeLayout } from '../actions/layoutActions';
import LoginPage from '../components/LoginPage';

class AssetDeck extends Component {

  constructor(props) {
    super(props)
    const currentPath = this.props.location.pathname

    if (currentPath !== '/login') { this.props.history.push('/assets/quote') }
  }

  handleLayoutChange = (newLayout) => {
    const currentLayout = this.props.layout
    if (currentLayout !== newLayout) {
      this.props.changeLayout(newLayout, currentLayout)
    }
  }

  render() {
    return (
      <div>
          <Route path='/assets' component={() =>
            <Navbar
              changeLayout={this.handleLayoutChange.bind(this)}
              currentLayout={this.props.layout}
            />}
          />
           <Route path="/login" component={LoginPage} />
           <Route path='/assets' component={AssetQuoteForm} />
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
    loggedIn: state.users.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assetActions: bindActionCreators(actions, dispatch),
    changeLayout: bindActionCreators(changeLayout, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetDeck));
