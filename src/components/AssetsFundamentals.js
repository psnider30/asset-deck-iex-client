import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatNumber } from '../lib/formatNumber';
import OptionsButton from './OptionsButton';
import refreshLogo from "../assets/media/refresh-icon.png";

class AssetsFundamentals extends Component {

  refreshData = () => {
    window.location.reload()
  }

  render() {
    const { assets, onUpdateAsset, handleExitUpdate } = this.props;
    const assetsList = assets.map((asset) => {
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
              <th><strong>Last Price</strong></th>
              <th><strong>Market Cap</strong></th>
              <th><strong>Avg Vol</strong></th>
              <th><strong>Latest EPS</strong></th>
              <th><strong>P/E</strong></th>
              <th><strong>Div Yield</strong></th>
              <th><strong>Price/Book</strong></th>
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

export default connect(mapStateToProps)(AssetsFundamentals)
