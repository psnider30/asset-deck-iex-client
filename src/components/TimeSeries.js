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
    return (
      <div className="time-series">
        <form>
          <label htmlFor='timeSeries' id='time-series-label'>Time Series </label>
          <select name='timeSeries' onChange={(event) => this.handleChange(event)}>
            <option value='daily'>Daily</option>
            <option value='monthly'>Monthly</option>
          </select>
          <br /> <br />
        </form>
        <table>
          <thead>
            <tr><th>Time Series</th></tr>
          </thead>

          <tbody>
            <tr><td>{asset.quote.symbol}</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}
