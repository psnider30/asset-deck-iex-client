import React, {Component} from 'react'
import { removeSeconds, decimalToPercentage, addPlus } from '../lib/formatNumber';
import OptionsButton from './OptionsButton';

export default class AssetQuoteRow extends Component {

  constructor(props) {
    super(props)
    this.state = { counter: 0 }
  }

  buyAsset = (assetId) => {
    this.setState({ counter: this.state.counter + 1 })
  }

  sellAsset = (assetId) => {
    this.setState({ counter: this.state.counter - 1 })
  }

  render() {
    const { asset, onUpdateAsset } = this.props;
    return (
      <tr className='table-row-data'>
        <td>{asset.quote.symbol}</td>
        <td>{asset.quote.companyName}</td>
        <td>$ {asset.quote.open}</td>
        <td>$ {asset.quote.close}</td>
        <td>$ {asset.quote.latestPrice}</td>
        <td>{addPlus(asset.quote.change)}</td>
        <td>{decimalToPercentage(asset.quote.changePercent)}</td>
        <td>{asset.quote.sector ? asset.quote.sector : ' - '}</td>
        <td>{removeSeconds(asset.quote.latestTime)}</td>
        <td>
          <button
            className='buy-asset-button'
            onClick ={() => this.buyAsset(asset.id)}>
            +
          </button>
          {this.state.counter}
          <button
            className='sell-asset-button'
            onClick ={() => this.sellAsset(asset.id)}>
            -
          </button>
        </td>
        <td className='no-background'>
          <OptionsButton
            className = 'options-button'
            asset={asset}
            onUpdateAsset={onUpdateAsset}
          />
        </td>
      </tr>
    );
  }
}
