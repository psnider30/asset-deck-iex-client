import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyAsset, sellAsset, setUpdatingShares, startFetchingData } from '../actions/assetActions';

class BuySellAsset extends Component {

  handleBuyClick(asset) {
    this.props.startFetchingData();
    this.props.setUpdatingShares();
    this.props.buyAsset(asset, this.props.currentUser)
  }

  handleSellClick(asset) {
    if (asset.shares > 0) {
      this.props.startFetchingData();
      this.props.setUpdatingShares();
      this.props.sellAsset(asset, this.props.currentUser)
    }
  }

  render() {
    const { asset } = this.props
    return (
      <td className='buy-sell-td'>
        <button
          className='sell-asset-button'
          onClick ={() => this.handleSellClick(asset)}>
          -
        </button>

        {asset.shares}

          <button
            className='buy-asset-button'
            onClick ={() => this.handleBuyClick(asset)}>
            +
          </button>
      </td>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
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
