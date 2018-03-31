class AssetApi {
  static requestHeaders() {
   return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`};
 }

 static getAllAssets() {
   const headers = this.requestHeaders();
   const request = new Request(`${process.env.API_HOST}/assets`, {
     method: 'GET',
     headers: headers
   });

   return fetch(request).then(response => {

     return response.json();
   }).catch(error => {
     return error;
   });
 }
}
