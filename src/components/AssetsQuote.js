import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { removeSeconds, decimalToPercentage, addPlus } from '../lib/formatNumber';
import OptionsButton from './OptionsButton';
import refreshLogo from "../refresh-icon.png";


class AssetsQuote extends Component {

  refreshData = (event) => {
    window.location.reload()
  }

  render() {
    const { assets, onUpdateAsset } = this.props;
    const assetsList = assets.map((asset, index) => {
      return (
        <tr key={asset.id} className='table-row-data'>
          <td>{asset.quote.symbol}</td>
          <td>{asset.quote.companyName}</td>
          <td>$ {asset.quote.open}</td>
          <td>$ {asset.quote.close}</td>
          <td>$ {asset.quote.latestPrice}</td>
          <td>{addPlus(asset.quote.change)}</td>
          <td>{decimalToPercentage(asset.quote.changePercent)}</td>
          <td>{asset.quote.sector ? asset.quote.sector : ' - '}</td>
          <td>{removeSeconds(asset.quote.latestTime)}</td>
          <td className='no-background'>
            <OptionsButton
              className = 'options-button'
              asset={asset}
              onUpdateAsset={onUpdateAsset}
            />
          </td>
        </tr>
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
              <th className='refresh'>
                <button className='refresh-data' onClick={(event) => this.refreshData(event)}>
                  <img src={refreshLogo} />
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
  }
}

export default withRouter(connect(mapStateToProps)(AssetsQuote))
