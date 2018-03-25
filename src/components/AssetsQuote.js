import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import refreshLogo from "../refresh-icon.png";
import AssetQuoteRow from './AssetQuoteRow'

class AssetsQuote extends Component {

  constructor(props) {
    super(props)
    this.state = { counter: 0 }
  }

  refreshData = (event) => {
    window.location.reload()
  }

  requestHeaders() {
    return {
      'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`,
      'Content-Type': 'application/json'
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
          key={asset.id}
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
    assets: state.manageAssets.assetsInMemory,
    layout: state.changeLayout.layout,
    currentUser: state.users.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(AssetsQuote))
