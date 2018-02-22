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
    return (
      <div className="assets-list">
        <table>
          <thead>
            <tr><th>Time Series</th></tr>
          </thead>

          <tbody>
            <tr><td>Data</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}
