import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeAsset } from '../actions/assetActions.js'

class Assets extends Component {

// componentWillReceiveProps(nextProps) {
//   if (this.props.assetToUpdate.id !== nextProps.assetToUpdate.id) {
//     const asset = this.props.findAsset(nextProps.assetToUpdate.id);
//     const {id, symbol, name, assetClass, region } = asset
//     debugger;
//     this.setState({
//       id: id,
//       symbol: symbol,
//       name: name,
//       assetClass: assetClass,
//       region: region,
//     });
//   }
// }

handleEditClick = (asset, event) => {
  this.props.onUpdateETF(asset);
}

handleRemoveClick = (asset, event) => {
  this.props.removeAsset(asset.id);
}

  render() {
    const assetsList = this.props.assets.map((asset, index) => {
      return (
        <tr key={index} align='left'>
          <td>{asset.symbol}</td>
          <td>{asset.name}</td>
          <td>{asset.assetClass}</td>
          <td>{asset.region}</td>
          <td>
            <button data-id={asset.id} onClick={(event) => this.handleEditClick(asset, event)}>
              Edit
            </button>
          </td>
          <td>
            <button data-id={asset.id} onClick={(event) => this.handleRemoveClick(asset, event)}>
              Remove
            </button>
          </td>
        </tr>
      );
    })
    const anyAssets = assetsList.length > 0;
    let tableHeader;
    if (anyAssets) {
      tableHeader =
        <tr>
          <th><strong>Symbol</strong></th>
          <th><strong>Name</strong></th>
          <th><strong>Asset Class</strong></th>
          <th><strong>Region</strong></th>
        </tr>
    }
    let sym;
    if (this.props.data) { sym = this.props.data["2. Symbol"]};
    return (
      <div className="assets-list">
        <p>{sym}</p>
        <table>
          <thead>
            {tableHeader}
          </thead>

          <tbody>
            {assetsList}
          </tbody>
        </table>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     assets: state.assets,
//     assetToUpdate: state.assetToUpdate,
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    removeAsset: removeAsset,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Assets);
