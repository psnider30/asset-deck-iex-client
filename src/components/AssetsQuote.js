import React, { Component } from 'react';
import { removeSeconds, decimalToPercentage, addPlus } from '../lib/formatNumber';
import OptionsButton from './OptionsButton';

export default class AssetsQuote extends Component {
  render() {
    const { asset, onUpdateAsset, removeAsset, changeLayout } = this.props;
    const assetsList = this.props.assets.map((asset, index) => {
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
          <th><strong>Name</strong></th>
          <th><strong>Open</strong></th>
          <th><strong>Close</strong></th>
          <th><strong>Latest</strong></th>
          <th><strong>Change</strong></th>
          <th><strong>Change %</strong></th>
          <th><strong>Sector</strong></th>
          <th><strong>Time or Date</strong></th>
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
