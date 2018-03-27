import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formatNumber } from '../lib/formatNumber';
import OptionsButton from './OptionsButton';
import refreshLogo from "../refresh-icon.png";

class AssetsFinancials extends Component {

  refreshData = (event) => {
    window.location.reload()
  }

  render() {
    const { assets, onUpdateAsset } = this.props;
    const assetsList = assets.map((asset, index) => {
      return (
        <tr key={asset.id} className='table-row-data'>
          <td>{asset.quote.symbol}</td>
          <td>{formatNumber(asset.financials.grossProfit)}</td>
          <td>{formatNumber(asset.financials.totalRevenue)}</td>
          <td>{formatNumber(asset.financials.operatingIncome)}</td>
          <td>{formatNumber(asset.financials.totalAssets)}</td>
          <td>{formatNumber(asset.financials.totalLiabilities)}</td>
          <td>{formatNumber(asset.financials.cashFlow)}</td>
          <td>{formatNumber(asset.financials.shareholderEquity)}</td>
          <td>{asset.financials.reportDate}</td>
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
              <th><strong>Gross Profit</strong></th>
              <th><strong>Total Rev</strong></th>
              <th><strong>Operating Income</strong></th>
              <th><strong>Tot Assets</strong></th>
              <th><strong>Tot Liab</strong></th>
              <th><strong>Cash FLow</strong></th>
              <th><strong>SH Equity</strong></th>
              <th><strong>Date</strong></th>
              <th>
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

const mapStateToProps = (state) => {
  return {
    assets: state.manageAssets.assetsInMemory,
    layout: state.changeLayout.layout,
  }
}

export default connect(mapStateToProps)(AssetsFinancials)
