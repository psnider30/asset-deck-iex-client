import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decimalToPercentage } from '../lib/formatNumber'
import OptionsButton from './OptionsButton';
import refreshLogo from "../assets/media/refresh-icon.png";

class ChangeSummary extends Component {

  refreshData = () => {
    window.location.reload()
  }

  render() {
    const { assets, onUpdateAsset, handleExitUpdate } = this.props;
    const assetsList = assets.map((asset) => {
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
              <th><strong>5 Day</strong></th>
              <th><strong>1 Month</strong></th>
              <th><strong>3 Month</strong></th>
              <th><strong>6 Month</strong></th>
              <th><strong>YTD</strong></th>
              <th><strong>1 Year</strong></th>
              <th><strong>2 Year</strong></th>
              <th><strong>5 year</strong></th>
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

export default connect(mapStateToProps)(ChangeSummary)
