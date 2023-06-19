import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/admin/shop';

class ShopService {
  createShop(shop) {
    console.log("============"+ JSON.stringify(shop, undefined,2));
    return axios
      .post(API_URL,{
        shop: shop
      },{ headers: authHeader() })
      .then(response => {
        console.log("response = " + response);
        return response.data;
        
      })
      .catch((error) => {
        console.log(error)
      });
  }

  fetchAllShop(){
    return axios
      .get(API_URL,{ headers: authHeader() })
      .then(response => {
        console.log("response = " + response);
        return response.data;
        
      })
      .catch((error) => {
        console.log(error)
      });
  }



}

export default new ShopService();
