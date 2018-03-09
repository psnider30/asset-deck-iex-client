import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MenuButton from 'react-menu-button';
import { changeLayout } from '../actions/layoutActions';
import { removeAsset } from '../actions/assetActions';
import { updateAssetsInMemory } from '../actions/assetActions';

class OptionsButton extends Component {

  handleEditClick = (asset, event) => {
    this.props.onUpdateAsset(asset);
  }

  handleRemoveClick = (asset, event) => {
    this.props.removeAsset(asset.id);
  }

  handleReturnsClick = (asset, event) => {
    this.props.changeLayout('timeSeries',this.props.layout, asset);
  }

  // componentWillReceiveProps(nextProps) {
  //   debugger;
  //   const assets = nextProps.assets;
  //   if (assets ) { sessionStorage.setItem('assets', JSON.stringify(assets))}
  //
  // }

  render() {
    const { asset } = this.props;
    return (
      <MenuButton
        className='options-button'
        id={asset.id}
        label='Options'>
        <Link to={"/assets/" + asset.quote.symbol + "/returns"}>
          <button
            className='returns-button'
            data-id={asset.id}
            onClick={(event) => this.handleReturnsClick(asset, event)}>
            Returns
          </button>
        </Link>
        <button
          className='update-button'
          data-id={asset.id}
          onClick={(event) => this.handleEditClick(asset, event)}>
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

const mapStateToProps = (state, ownProps) => {
  return {
    assets: state.manageAssets.assets,
    layout: state.changeLayout.layout,
    assetsInMemorys: state.manageAssets.assetsInMemory,
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
