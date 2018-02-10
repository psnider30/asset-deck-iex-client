import React, { Component } from 'react';
// import uuid from 'uuid';

export default class EtfQuoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
      assetClass: '',
      region: '',
    };
  }

  handleSubmit = (event) => {
      event.preventDefault();
      const etf = Object.assign({}, this.state);
      this.setState({
        ticker: '',
        assetClass: '',
        region: '',
      });
    }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <h2>ETF Quote Form</h2>
        <form onSubmit={(event) => this.handleSubmit(event) }>
          <label htmlFor='ticker'>ETF Ticker Symbol </label>
          <input type='text' name='ticker' onChange={(event) => this.handleChange(event)} />
          <br />

          <label htmlFor='assetClass'>Asset Class </label>
          <input type='text' name='assetClass' onChange={(event) => this.handleChange(event)} />
          <br />

          <label htmlFor='region'>Region </label>
          <input type='region' name='region' onChange={(event) => this.handleChange(event)} />
          <br />

          <input type='submit'/>
        </form>
      </div>
    );
  }
}
