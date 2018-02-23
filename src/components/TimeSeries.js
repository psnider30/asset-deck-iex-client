import React, { Component } from 'react';
import { removeSeconds, decimalToPercentage, addPlus } from '../lib/formatNumber'

export default class TimeSeries extends Component {

  handleEditClick = (asset, event) => {
    this.props.onUpdateAsset(asset);
  }

  handleRemoveClick = (asset, event) => {
    this.props.removeAsset(asset.id);
  }

  render() {
    const asset = this.props.assets.find(asset => asset.id === this.props.assetSelected.id);
    const logo = !asset.logo.url || asset.quote.symbol === "SPY" ? 'dollar_logo.jpg' : asset.logo.url
    return (
      <div className="time-series">
        <div className="company-container">
          <div className="logo-container">
            <img
              className='company-logo'
              src={logo}
              alt={asset.quote.symbol} />
          </div>
          <div className='company-info'>
            <div className="company-details">
              <h3 className='company-detail'>{asset.quote.companyName}</h3>
              <h5 className='company-detail'>{asset.companyInfo.exchange}</h5>
              <h5 className='company-detail'><a href={asset.companyInfo.website}>{asset.companyInfo.website}</a></h5>
            </div>
            <div className="company-description">
              <p className='company-detail'>{asset.companyInfo.description}</p>
            </div>
          </div>
        </div>

        <form>
          <label htmlFor='timeSeries' id='time-series-label'>Time Series </label>
          <select name='timeSeries' onChange={(event) => this.handleChange(event)}>
            <option value='daily'>Daily</option>
            <option value='monthly'>Monthly</option>
          </select>
          <br/> <br/>
        </form>

        <div className='returns'>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Close</th>
                <th>Open</th>
                <th>Change</th>
                <th>Change %</th>
                <th>Volume</th>
                <th>VWAP</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{asset.timeSeries.daily[0].date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
