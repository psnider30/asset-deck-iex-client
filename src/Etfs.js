import React, { Component } from 'react';

export default class Etfs extends Component {

  render() {
    const etfsList = this.props.etfs.map((etf, index) => {
      return (
        <tr key={index} align='left'>
          <td>{etf.symbol}</td>
          <td>{etf.name}</td>
          <td>{etf.assetClass}</td>
          <td>{etf.region}</td>
        </tr>
      );
    })

    return (
      <table>
        <theader>
          <tr>
            <th><strong>Symbol</strong></th>
            <th><strong>Name</strong></th>
            <th><strong>Asset Class</strong></th>
            <th><strong>Region</strong></th>
          </tr>
        </theader>

        <tbody>
          {etfsList}
        </tbody>
      </table>
    );
  }
}
