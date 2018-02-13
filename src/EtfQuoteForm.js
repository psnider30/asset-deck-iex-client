import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/etfActions.js'


class EtfQuoteForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
        id: null,
        symbol: '',
        name: '',
        assetClass: '',
        region: '',
      };

    this.state = this.initialState
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.editing !== nextProps.editing) {
      const etf = this.props.findEtf(nextProps.editing);
      const {id, symbol, name, assetClass, region } = etf
      this.setState({
        id: id,
        symbol: symbol,
        name: name,
        assetClass: assetClass,
        region: region,
      });
    }
  }

  handleSubmit = (event) => {
      event.preventDefault();
      this.props.actions.addEtf(this.state);
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
          <label htmlFor='symbol'>ETF Ticker Symbol</label>
          <input type='text' name='symbol'
            onChange={(event) => this.handleChange(event)}
            value={this.state.symbol} />
          <br />

          <label htmlFor='name'>ETF Name </label>
          <input type='text' name='name'
            onChange={(event) => this.handleChange(event)}
            value={this.state.name} />
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

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch)};
}

export default connect(null, mapDispatchToProps)(EtfQuoteForm)
