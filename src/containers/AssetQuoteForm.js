import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions.js'

import Assets from './Assets.js';

class AssetQuoteForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
        id: null,
        symbol: '',
        timeSeries: '1d',
        updating: false,
      };

    this.state = this.initialState
  }

  handleSubmit = (event) => {
      event.preventDefault();
      if (this.state.updating) {
        const asset = this.state;
        this.props.actions.updateAsset(asset);
      } else {
        this.props.actions.fetchAsset(this.state);
      }
      this.setState(this.initialState);
    }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value});
  }

  findAsset = (id) => {
    return this.props.assets.find(asset => asset.id === id)
  }

  onUpdateAsset = (assetToUpdate) => {
    const { id, symbol, timeSeries } = assetToUpdate
    this.setState({
      id: id,
      symbol: symbol,
      timeSeries: timeSeries,
      updating: true,
   });
    // this.props.actions.updateAsset(assetToUpdate)
  }

  handleExitUpdate = () => {
    this.setState(this.initialState)
  }

  submitOrUpdate = () => {
    return this.state.updating ? 'Update Asset' : 'Add Asset'
  }

  render() {
    const { assets, assetToUpdate, actions, data } = this.props;
    const updating = this.state.updating
    let exitUpdateButton;
    if (updating) {
      exitUpdateButton = <button onClick={this.handleExitUpdate}>Exit Without Updating</button>
    }
    return (
      <div>
        <div className='quote-form'>
          <h2>Find Asset</h2>
          <form onSubmit={(event) => this.handleSubmit(event) }>
            <label htmlFor='symbol'>Asset Ticker Symbol </label>
            <input type='text' name='symbol'
              onChange={(event) => this.handleChange(event)}
              value={this.state.symbol} />
            <br />

            <label htmlFor='timeSeries'>Time Series </label>
            <select name='timeSeries'
              onChange={(event) => this.handleChange(event)}>
              <option value='1d'>Day</option>
              <option value='1m'>Month</option>
              <option value='3m'> 3 Month</option>
              <option value='6m'> 6 Month</option>
              <option value='ytd'>Year-to-date</option>
            </select>
            <br />
            <div className="submit-form">
              <span> <input className='col-sm' type='submit' value={this.submitOrUpdate()}/></span>
              <span className='col-sm'> {exitUpdateButton} </span>
            </div>
          </form>
          <br />
        </div>
        <Assets
          assets={assets}
          findAsset ={this.findAsset.bind(this)}
          onUpdateAsset={this.onUpdateAsset.bind(this)}
          asssetToUpdate={this.state}
          data={data} />
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
  return { actions: bindActionCreators(actions, dispatch)};
}

export default connect(null, mapDispatchToProps)(AssetQuoteForm)
