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

  requestHeaders() {
    return {
      'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`,
      'Content-Type': 'application/json'
    }
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (!nextProps.assets ) { return }

   // Check if a share is being bought or sold and if so update assets in memory
    if (this.props.updatingShares) {
      debugger;
      sessionStorage.setItem('assets', JSON.stringify(nextProps.assets))
      this.props.updateAssetsInMemory()
      this.props.resetUpdatingShares()
    }
  }

  callApi = () => {
    const headers = this.requestHeaders();
    const request = new Request('http://localhost:3001/api/assets/user-assets', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({asset: { username: this.props.currentUser } }),
    });
    fetch(request).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
    })
  }

  render() {
    const { assets, onUpdateAsset } = this.props;
    const assetsList = assets.map((asset, index) => {
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
        <button onClick ={(event) => this.callApi()}>
          Call Api
        </button>
        <br /><br />
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
