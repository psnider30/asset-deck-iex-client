import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/assetActions.js'

import Assets from './Assets.js';


class AssetQuoteForm extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.initialState = {
  //       id: null,
  //       symbol: '',
  //       timeSeries: '1m',
  //       updating: false,
  //     };
  //
  //   this.state = this.initialState
  // }

  handleSubmit = (event) => {
      event.preventDefault();
      if (this.state.updating) {
        const asset = this.state;
        this.props.actions.updateAsset(asset);
      } else {
        this.props.actions.addAsset(this.state);
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
    const {id, symbol, name, assetClass, region } = assetToUpdate
    this.setState({
      id: id,
      symbol: symbol,
      // name: name,
      // assetClass: assetClass,
      // region: region,
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
            {/* <br /> */}

            {/* <label htmlFor='name'>Asset Name </label>
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
            <br /><br /> */}

            <span> <input className='col-sm' type='submit' value={this.submitOrUpdate()}/></span>
            <span className='col-sm'> {exitUpdateButton} </span>
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
