import React, { Component } from 'react';

export default class Etfs extends Component {

handleEditClick = (etfId, event) => {
    this.props.editEtf(etfId);
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
            <button onClick={(event) => this.handleEditClick(etf.id, event)}>
              Edit
            </button>
          </td>
        </tr>
      );
    })

    return (
      <table>
        <thead>
          <tr>
            <th><strong>Symbol</strong></th>
            <th><strong>Name</strong></th>
            <th><strong>Asset Class</strong></th>
            <th><strong>Region</strong></th>
          </tr>
        </thead>

        <tbody>
          {etfsList}
        </tbody>
      </table>
    );
  }
}
