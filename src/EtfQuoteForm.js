import React, { Component } from 'react';
// import uuid from 'uuid';

export default class EtfQuoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState
  }

  initialState = {
      ticker: '',
      assetClass: '',
      region: '',
    };


  handleSubmit = (event) => {
      event.preventDefault();
      this.props.addOnSubmit(this.state);
      this.setState(this.initialState);
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
          <input type='text' name='ticker'
            onChange={(event) => this.handleChange(event)}
            value={this.state.ticker} />
          <br />

          <label htmlFor='assetClass'>Asset Class </label>
          <input type='text' name='assetClass'
            onChange={(event) => this.handleChange(event)}
            value={this.state.assetClass} />
          <br />

          <label htmlFor='region'>Region </label>
          <input type='region' name='region'
            onChange={(event) => this.handleChange(event)}
            value={this.state.region} />
          <br />

          <input type='submit'/>
        </form>
      </div>
    );
  }
}
