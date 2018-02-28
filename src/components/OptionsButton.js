import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuButton from 'react-menu-button';

export default class OptionsButton extends Component {

  handleEditClick = (asset, event) => {
    this.props.onUpdateAsset(asset);
  }

  handleRemoveClick = (asset, event) => {
    this.props.removeAsset(asset.id);
  }

  handleReturnsClick = (asset, event) => {
    this.props.changeLayout('timeSeries',this.props.layout, asset);
  }

  render() {
    const { asset } = this.props;
    return (
      <MenuButton
        className='options-button'
        id={asset.id}
        label='Options'>
        <Link to={"/assets" + asset.quote.symbol + "/returns"}>
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
