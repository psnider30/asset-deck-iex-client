import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatNumber } from '../lib/formatNumber';
import defaultLogo from "../assets/media/dollar_logo.jpg";

class TimeSeries extends Component {
  constructor(props) {
    super(props)
    this.state = { frequency: 'daily' }
  }

  handleChange = (event) =>{
    this.setState({
      frequency: event.target.value
    })
  }

  render() {
    const asset = this.props.assets.find(asset => asset.id === this.props.assetSelected.id);
    const frequency = this.state.frequency;
    const assetReturns = asset.timeSeries[`${frequency}`].map((period, index) => {
      return (
      <tr key={index}>
        <td className='time-series-td'>{period.date}</td>
        <td className='time-series-td'>$ {period.close}</td>
        <td className='time-series-td'>$ {period.open}</td>
        <td className='time-series-td'>{formatNumber(period.change)}</td>
        <td className='time-series-td'>{formatNumber(period.changePercent)} %</td>
        <td className='time-series-td'>{formatNumber(period.volume)}</td>
        <td className='time-series-td'>$ {formatNumber(period.vwap)}</td>
      </tr>
      );
    }).reverse();
    const logo = !asset.logo.url || asset.quote.symbol === "SPY" ||
    asset.quote.symbol === "IBM" ? defaultLogo : asset.logo.url;
    return (
      <div className="time-series">
        <div className="company-container">
          <div className="logo-container">
            <img
              className='company-logo'
              src={logo}
              alt={asset.quote.symbol} />
          </div>
          <div className='company-info'>
            <div className="company-details">
              <h3 className='company-detail'>{asset.quote.companyName}</h3>
              <h5 className='company-detail'>{asset.companyInfo.exchange}</h5>
              <h5 className='company-detail'>
                <a target='_blank' href={asset.companyInfo.website}>{asset.companyInfo.website}</a>
            </h5>
            </div>
            <div className="company-description">
              <p className='company-detail'>{asset.companyInfo.description}</p>
            </div>
          </div>
        </div>

        <form>
          <label htmlFor='timeSeries' id='time-series-label'>Time Series </label>
          <select name='timeSeries' onChange={(event) => this.handleChange(event)}>
            <option value='daily'>Daily</option>
            <option value='monthly'>Monthly</option>
          </select>
          <br/> <br/>
        </form>

        <div className='returns'>
          <table>
            <thead>
              <tr>
                <th className='time-series-th'>Date</th>
                <th className='time-series-th'>Close</th>
                <th className='time-series-th'>Open</th>
                <th className='time-series-th'>Change</th>
                <th className='time-series-th'>Change %</th>
                <th className='time-series-th'>Volume</th>
                <th className='time-series-th'>Vol Weighted Avg Price</th>
              </tr>
            </thead>

            <tbody>
              {assetReturns}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.manageAssets.assetsInMemory,
    layout: state.changeLayout.layout,
    assetSelected: state.changeLayout.asset,
  }
}

export default connect(mapStateToProps)(TimeSeries)
