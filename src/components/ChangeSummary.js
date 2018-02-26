import React, { Component } from 'react';
import { decimalToPercentage } from '../lib/formatNumber'
import OptionsButton from './OptionsButton';

export default class ChangeSummary extends Component {

  render() {
    const { onUpdateAsset, removeAsset, changeLayout } = this.props;
    const assetsList = this.props.assets.map((asset, index) => {
      return (
        <tr key={asset.id} className='table-row-data'>
          <td>{asset.quote.symbol}</td>
          <td>{decimalToPercentage(asset.fundamentals.day5ChangePercent)}</td>
          <td>{decimalToPercentage(asset.fundamentals.month1ChangePercent)}</td>
          <td>{decimalToPercentage(asset.fundamentals.month3ChangePercent)}</td>
          <td>{decimalToPercentage(asset.fundamentals.month6ChangePercent)}</td>
          <td>{decimalToPercentage(asset.fundamentals.ytdChangePercent)}</td>
          <td>{decimalToPercentage(asset.fundamentals.year1ChangePercent)}</td>
          <td>{decimalToPercentage(asset.fundamentals.year2ChangePercent)}</td>
          <td>{decimalToPercentage(asset.fundamentals.year5ChangePercent)}</td>
          <td className='no-background'>
            <OptionsButton
              className = 'options-button'
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
          <th><strong>5 Day</strong></th>
          <th><strong>1 Month</strong></th>
          <th><strong>3 Month</strong></th>
          <th><strong>6 Month</strong></th>
          <th><strong>YTD</strong></th>
          <th><strong>1 Year</strong></th>
          <th><strong>2 Year</strong></th>
          <th><strong>5 year</strong></th>
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
