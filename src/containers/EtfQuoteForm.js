import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/etfActions.js'

import Etfs from './Etfs.js';


class EtfQuoteForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
        id: null,
        symbol: '',
        name: '',
        assetClass: '',
        region: '',
        updating: false,
      };

    this.state = this.initialState
  }

  handleSubmit = (event) => {
      event.preventDefault();
      if (this.state.updating) {
        const etf = this.state;
        this.props.actions.updateEtf(etf);
      } else {
        this.props.actions.addEtf(this.state);
      }
      this.setState(this.initialState);
    }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value});
  }

  findEtf = (id) => {
    return this.props.etfs.find(etf => etf.id === id)
  }

  onUpdateETF = (etfToUpdate) => {
    const {id, symbol, name, assetClass, region } = etfToUpdate
    this.setState({
      id: id,
      symbol: symbol,
      name: name,
      assetClass: assetClass,
      region: region,
      updating: true,
   });
    // this.props.actions.updateEtf(etfToUpdate)
  }

  handleExitUpdate = () => {
    this.setState(this.initialState)
  }

  submitOrUpdate = () => {
    return this.state.updating ? 'Update Etf' : 'Add Etf'
  }

  render() {
    const { etfs, etfToUpdate, actions, data } = this.props;
    const updating = this.state.updating
    let exitUpdateButton;
    if (updating) {
      exitUpdateButton = <button onClick={this.handleExitUpdate}>Exit Without Updating</button>
    }
    return (
      <div>
        <div className='quote-form'>
          <h2>ETF Quote Form</h2>
          <form onSubmit={(event) => this.handleSubmit(event) }>
            <label htmlFor='symbol'>ETF Ticker Symbol </label>
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
            <br /><br />

            <input type='submit' value={this.submitOrUpdate()}/>
            <span className='col-sm'> {exitUpdateButton} </span>
          </form>
          <br />
        </div>
        <Etfs
          etfs={etfs}
          findEtf ={this.findEtf.bind(this)}
          onUpdateETF={this.onUpdateETF.bind(this)}
          etfToUpdate={this.state}
          data={data} />
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
  return { actions: bindActionCreators(actions, dispatch)};
}

export default connect(null, mapDispatchToProps)(EtfQuoteForm)
