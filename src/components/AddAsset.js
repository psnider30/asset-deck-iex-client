import React, { Component } from 'react'

export default class AddAsset extends Component {
  constructor(props) {
    super(props)

    this.state = {
      symbol: '',
      companyName: '',
    }
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const asset = this.state;
    this.props.addAsset(asset)
    this.setState({
      symbol: '',
      companyName: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <label htmlFor="asset_symbol">Symbol</label>
        <input
          type="text"
          name="symbol"
          value={this.state.symbol}
          onChange={this.handleOnChange}
          placeholder="Asset Symbol"
        />

        <label htmlFor="asset_company_name">Symbol</label>
        <input
          type="text"
          name="companyName"
          value={this.state.companyName}
          onChange={this.handleOnChange}
          placeholder="Asset Company Name"
        />

        <button>Add Asset</button>
      </form>
    );
  }

}
