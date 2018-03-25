import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyAsset, sellAsset } from '../actions/assetActions';

class BuySellAsset extends Component {

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
    const { asset } = this.props
    return (
      <td className='buy-sell-td'>
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
    );
  }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
  return {
    buyAsset: bindActionCreators(buyAsset, dispatch),
    sellAsset: bindActionCreators(sellAsset, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(BuySellAsset);
