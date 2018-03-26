import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import refreshLogo from "../refresh-icon.png";
import AssetQuoteRow from './AssetQuoteRow';
import { updateAssetsInMemory, resetUpdatingShares } from '../actions/assetActions';

class AssetsQuote extends Component {

  refreshData = (event) => {
    window.location.reload()
  }

  render() {
    const { assetsInMemory, onUpdateAsset } = this.props;
    const sortedAssets = assetsInMemory.sort((a,b) => b.shares - a.shares)
    const assetsList = sortedAssets.map((asset, index) => {
      return (
        <AssetQuoteRow
          key={index}
          asset={asset}
          onUpdateAsset={onUpdateAsset}
        />
      );
    })

    return (
      <div className="assets-list">
        <table>
          <thead>
            <tr>
              <th><strong>Symbol</strong></th>
              <th><strong>Name</strong></th>
              <th><strong>Open</strong></th>
              <th><strong>Close</strong></th>
              <th><strong>Latest</strong></th>
              <th><strong>Change</strong></th>
              <th><strong>Change %</strong></th>
              <th><strong>Sector</strong></th>
              <th><strong>Time or Date</strong></th>
              <th>Shares Owned</th>
              <th className='refresh'>
                <button className='refresh-data' onClick={(event) => this.refreshData(event)}>
                  <img src={refreshLogo} alt='refresh' />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {assetsList}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    assets: state.manageAssets.assets,
    assetsInMemory: state.manageAssets.assetsInMemory,
    updatingShares: state.manageAssets.updatingShares,
    layout: state.changeLayout.layout,
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAssetsInMemory: bindActionCreators(updateAssetsInMemory, dispatch),
    resetUpdatingShares: bindActionCreators(resetUpdatingShares, dispatch),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetsQuote))
