import React, {Component} from 'react'
import { removeSeconds, decimalToPercentage, addPlus } from '../lib/formatNumber';
import OptionsButton from './OptionsButton';
import BuySellAsset from './BuySellAsset';

export default class AssetQuoteRow extends Component {

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
          <BuySellAsset
            className='buy-sell'
            asset={asset}
          />
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
