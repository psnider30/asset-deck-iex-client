class AssetApi {
  static requestHeaders() {
   return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
 }

 static getAllAssets() {
   const headers = this.requestHeaders();
   const request = new Request('http://localhost:3001/api/assets', {
     method: 'GET',
     headers: headers
   });

   return fetch(request).then(response => {

     response.json();
   }).catch(error => {
     return error;
   });
 }
}
