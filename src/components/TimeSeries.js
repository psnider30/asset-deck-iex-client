import React, { Component } from 'react';
import { removeSeconds, decimalToPercentage, addPlus } from '../lib/formatNumber'

export default class TimeSeries extends Component {

  handleEditClick = (asset, event) => {
    this.props.onUpdateAsset(asset);
  }

  handleRemoveClick = (asset, event) => {
    this.props.removeAsset(asset.id);
  }
}
