import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyAsset, sellAsset, setUpdatingShares, startFetchingData } from '../actions/assetActions';

class BuySellAsset extends Component {

  handleBuyClick(asset) {
    this.props.setUpdatingShares();
    this.props.buyAsset(asset, this.props.currentUser);
  }

  handleSellClick(asset) {
    if (asset.shares > 0) {
      this.props.setUpdatingShares();
      this.props.sellAsset(asset, this.props.currentUser);
    }
  }

  render() {
    const { asset, updatingShares } = this.props;
    asset.shares = asset.shares || 0;
    return (
      <td className='buy-sell-td'>
        <button
          className='sell-asset-button'
          disabled={updatingShares}
          onClick ={() => this.handleSellClick(asset)}>
          -
        </button>

        <span className='asset-shares-count'>{asset.shares} </span>

        <button
          className='buy-asset-button'
          disabled={updatingShares}
          onClick ={() => this.handleBuyClick(asset)}>
          +
        </button>
      </td>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    updatingShares: state.manageAssets.updatingShares
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyAsset: bindActionCreators(buyAsset, dispatch),
    sellAsset: bindActionCreators(sellAsset, dispatch),
    setUpdatingShares: bindActionCreators(setUpdatingShares, dispatch),
    startFetchingData: bindActionCreators(startFetchingData, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuySellAsset);
