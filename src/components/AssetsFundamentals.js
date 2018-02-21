import React, { Component } from 'react';
import { formatNumber } from '../lib/formatNumber'

export default class AssetsFundamentals extends Component {

handleEditClick = (asset, event) => {
  this.props.onUpdateAsset(asset);
}

handleRemoveClick = (asset, event) => {
  this.props.removeAsset(asset.id);
}

  render() {
    const assetsList = this.props.assets.map((asset, index) => {
      return (
        <tr key={asset.id} className='table-row-data'>
          <td>{asset.quote.symbol}</td>
          <td>$ {asset.quote.latestPrice}</td>
          <td>{formatNumber(asset.fundamentals.marketcap)}</td>
          <td>{formatNumber(asset.quote.avgTotalVolume)}</td>
          <td>{formatNumber(asset.fundamentals.latestEPS)}</td>
          <td>{formatNumber(asset.quote.peRatio)}</td>
          <td>{formatNumber(asset.fundamentals.dividendYield)}</td>
          <td>{formatNumber(asset.fundamentals.priceToBook)}</td>
          <td className='no-background'>
            <button
              className='update-button'
              data-id={asset.id}
              onClick={(event) => this.handleEditClick(asset, event)}>
              Update
            </button>
          </td>
          <td className='no-background'>
            <button
              className='remove-button'
              data-id={asset.id}
              onClick={(event) => this.handleRemoveClick(asset, event)}>
              Remove
            </button>
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
          <th><strong>Last Price</strong></th>
          <th><strong>Market Cap</strong></th>
          <th><strong>Avg Vol</strong></th>
          <th><strong>Latest EPS</strong></th>
          <th><strong>P/E</strong></th>
          <th><strong>Div Yield</strong></th>
          <th><strong>Price/Book</strong></th>
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
