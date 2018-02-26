import React, { Component } from 'react';
import { connect } from 'react-redux';
import AssetQuoteForm from './AssetQuoteForm';
import Navbar from '../components/Navbar'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions'
import { changeLayout } from '../actions/layoutActions'
// import { fetchAssetData } from '../actions/assetDataActions'

class AssetDeck extends Component {

  componentDidMount() {
    // this.props.fetchAllSymbols()
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
        <Navbar
          changeLayout={this.handleLayoutChange.bind(this)}
          currentLayout={this.props.layout}
         />
        <div className='asset-deck'>
          <AssetQuoteForm />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assetActions: bindActionCreators(actions, dispatch),
    changeLayout: bindActionCreators(changeLayout, dispatch),
    // fetchAssetData: bindActionCreators(fetchAssetData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDeck);
