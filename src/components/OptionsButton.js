import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MenuButton from 'react-menu-button';
import { changeLayout } from '../actions/layoutActions';
import { updateAssetsInMemory, removeAsset } from '../actions/assetActions';

class OptionsButton extends Component {

  handleEditClick = (asset) => {
    this.props.onUpdateAsset(asset);
  }

  handleRemoveClick = (asset) => {
    const assetToDelete = {
      symbol: asset.quote.symbol,
      id: asset.id
    }
    this.props.handleExitUpdate()
    this.props.removeAsset(assetToDelete, this.props.currentUser);
  }

  handleReturnsClick = (asset) => {
    this.props.changeLayout('timeSeries',this.props.layout, asset);
  }

  render() {
    const { asset } = this.props;
    return (
      <MenuButton
        className='options-button'
        id={asset.id || '0'}
        label=''>
        <Link
          to={"/assets/" + asset.quote.symbol + "/returns"}
          className='returns-link'>
          <button
            className='returns-button'
            data-id={asset.id}
            onClick={() => this.handleReturnsClick(asset)}>
            Returns
          </button>
        </Link>
        <button
          className='update-button'
          data-id={asset.id}
          onClick={() => this.handleEditClick(asset)}>
          Update
        </button>
        <button
          className='remove-button'
          data-id={asset.id}
          onClick={(event) => this.handleRemoveClick(asset, event)}>
          Remove
        </button>
      </MenuButton>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.manageAssets.assets,
    layout: state.changeLayout.layout,
    assetsInMemorys: state.manageAssets.assetsInMemory,
    currentUser: state.users.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLayout: bindActionCreators(changeLayout, dispatch),
    removeAsset: bindActionCreators(removeAsset, dispatch),
    updateAssetsInMemory: bindActionCreators(updateAssetsInMemory, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsButton)
