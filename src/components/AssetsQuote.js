import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import refreshLogo from "../assets/media/refresh-icon.png";
import sort from "../assets/media/sort.svg";
import AssetQuoteRow from './AssetQuoteRow';
import { updateAssetsInMemory, resetUpdatingShares } from '../actions/assetActions';

class AssetsQuote extends Component {

  constructor(props) {
    super(props)

    this.state = { sortedByShares: null }
  }

  refreshData = () => {
    window.location.reload()
  }

  handleSortByShares = () => {
    if (this.state.sortedByShares === null || this.state.sortedByShares === 'asc') {
      this.setState({sortedByShares: 'desc'})
      this.sortSharesDesc()
    } else {
      this.setState({sortedByShares: 'asc'})
      this.sortSharesDesc()
    }
  }

    sortSharesDesc = () => {
      return this.props.assetsInMemory.sort((a,b) => {
        if (b.shares- a.shares === 0) { return 0 }
        return b.shares - a.shares
      })
    }

    sortSharesAsc = () => {
      return this.props.assetsInMemory.sort((a,b) => {
        if (a.shares- b.shares === 0) { return 0 }
        return a.shares - b.shares
      })
    }

    sortbyChangePerecent = () => {
      return this.props.assetsInMemory.sort((a,b) => {
        if (b.quote.changePercent - a.quote.changePercent === 0) { return 0 }
        return b.quote.changePercent - a.quote.changePercent
      })
    }

  render() {
    const { onUpdateAsset, handleExitUpdate } = this.props;
    let sortedAssets;

    if (this.state.sortedByShares === 'desc') {
      sortedAssets = this.sortSharesDesc()
    } else if (this.state.sortedByShares === 'asc') {
      sortedAssets = this.sortSharesAsc()
    } else {
      sortedAssets = this.sortbyChangePerecent()
    }

    const assetsList = sortedAssets.map((asset, index) => {
      return (
        <AssetQuoteRow
          key={index}
          asset={asset}
          onUpdateAsset={onUpdateAsset}
          handleExitUpdate={handleExitUpdate}
        />
      );
    })

    return (
      <div className="assets-list">
        <table>
          <thead>
            <tr>
              <th><strong>Symbol</strong></th>
              <th><strong>Name</strong></th>
              <th><strong>Open</strong></th>
              <th><strong>Close</strong></th>
              <th><strong>Latest</strong></th>
              <th><strong>Change</strong></th>
              <th><strong>Change %</strong></th>
              <th><strong>Sector</strong></th>
              <th><strong>Time or Date</strong></th>
              <th className='shares-owned-th'>
                Shares Owned
                <img src={sort} alt='sort' className='sort-by-shares' onClick={() => this.handleSortByShares()} />
              </th>
              <th className='refresh-th'>
                <button className='refresh-data' onClick={() => this.refreshData()}>
                  <img src={refreshLogo} alt='refresh' className='refresh-logo' />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {assetsList}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.manageAssets.assets,
    assetsInMemory: state.manageAssets.assetsInMemory,
    updatingShares: state.manageAssets.updatingShares,
    layout: state.changeLayout.layout,
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAssetsInMemory: bindActionCreators(updateAssetsInMemory, dispatch),
    resetUpdatingShares: bindActionCreators(resetUpdatingShares, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetsQuote)
