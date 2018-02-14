import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeEtf } from '../actions/etfActions.js'

class Etfs extends Component {

// componentWillReceiveProps(nextProps) {
//   if (this.props.etfToUpdate.id !== nextProps.etfToUpdate.id) {
//     const etf = this.props.findEtf(nextProps.etfToUpdate.id);
//     const {id, symbol, name, assetClass, region } = etf
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

handleEditClick = (etf, event) => {
  this.props.onUpdateETF(etf);
}

handleRemoveClick = (etf, event) => {
  this.props.removeEtf(etf.id);
}

  render() {
    const etfsList = this.props.etfs.map((etf, index) => {
      return (
        <tr key={index} align='left'>
          <td>{etf.symbol}</td>
          <td>{etf.name}</td>
          <td>{etf.assetClass}</td>
          <td>{etf.region}</td>
          <td>
            <button data-id={etf.id} onClick={(event) => this.handleEditClick(etf, event)}>
              Edit
            </button>
          </td>
          <td>
            <button data-id={etf.id} onClick={(event) => this.handleRemoveClick(etf, event)}>
              Remove
            </button>
          </td>
        </tr>
      );
    })
    const anyEtfs = etfsList.length > 0;
    let tableHeader;
    if (anyEtfs) {
      tableHeader =
        <tr>
          <th><strong>Symbol</strong></th>
          <th><strong>Name</strong></th>
          <th><strong>Asset Class</strong></th>
          <th><strong>Region</strong></th>
        </tr>
    }

    return (
      <div className="etfs-list">
        <table>
          <thead>
            {tableHeader}
          </thead>

          <tbody>
            {etfsList}
          </tbody>
        </table>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     etfs: state.etfs,
//     etfToUpdate: state.etfToUpdate,
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    removeEtf: removeEtf,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Etfs);
