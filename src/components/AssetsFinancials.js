import React, { Component } from 'react';
import { formatNumber } from '../lib/formatNumber'
import OptionsButton from './OptionsButton';

export default class AssetsFinancials extends Component {

  render() {
    const { onUpdateAsset, removeAsset, changeLayout } = this.props;
    const assetsList = this.props.assets.map((asset, index) => {
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
              asset={asset}
              onUpdateAsset={onUpdateAsset}
              removeAsset={removeAsset}
              changeLayout={changeLayout} />
          </td>
        </tr>
      );
    })
    const anyAssets = assetsList.length > 0;
    let tableHeader;
    if (anyAssets) {
      tableHeader =
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
        </tr>
    }

    return (
      <div className="assets-list">
        <table>
          <thead>
            {tableHeader}
          </thead>

          <tbody>
            {assetsList}
          </tbody>
        </table>
      </div>
    );
  }
}
