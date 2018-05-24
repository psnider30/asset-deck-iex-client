import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatNumber } from '../lib/formatNumber';
import OptionsButton from './OptionsButton';
import refreshLogo from "../assets/media/refresh-icon.png";

class AssetsFinancials extends Component {

  refreshData = () => {
    window.location.reload()
  }

  render() {
    const { assets, onUpdateAsset, handleExitUpdate } = this.props;
    const assetsList = assets.map((asset) => {
      return (
        <tr key={asset.id} className='table-row-data'>
          <td>{asset.quote.symbol}</td>
          <td>{formatNumber(asset.financials ? asset.financials.grossProfit : 0)}</td>
          <td>{formatNumber(asset.financials ? asset.financials.totalRevenue : 0)}</td>
          <td>{formatNumber(asset.financials ? asset.financials.operatingIncome : 0)}</td>
          <td>{formatNumber(asset.financials ? asset.financials.totalAssets : 0)}</td>
          <td>{formatNumber(asset.financials ? asset.financials.totalLiabilities : 0)}</td>
          <td>{formatNumber(asset.financials ? asset.financials.cashFlow : 0)}</td>
          <td>{formatNumber(asset.financials ? asset.financials.shareholderEquity : 0)}</td>
          <td>{asset.financials ? asset.financials.reportDate : '-'}</td>
          <td className='no-background'>
            <OptionsButton
              className = 'options-button'
              asset={asset}
              onUpdateAsset={onUpdateAsset}
              handleExitUpdate={handleExitUpdate}
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
                <button className='refresh-data' onClick={() => this.refreshData()}>
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
