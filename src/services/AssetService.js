const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

const AssetService = {
  fetchUserAssets() {
    return fetch(`${API_URL}/assets`)
      .then(response => response.json())
  },

  createAsset(asset) {
    const request = {
      method: "POST",
      body: JSON.stringify({
        asset: asset
      }),
      headers: {
        "Content-Type": "application/json",
      }
    };
  }
}

export default AssetService;
