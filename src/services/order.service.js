import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/order';

class OrderService {
  createOrder(order) {

    return axios
      .post(API_URL, {
        customer: order.customer,
        shirt: order.shirt,
        pant: order.pant
      },{ headers: authHeader() })
      .then(response => {
        console.log("response = " + response);
        return response.data;

      })
      .catch((error) => console.log(error));
  }

  fetchAllOrder() {
    return axios
      .get(API_URL, { headers: authHeader() })
      .then(response => {
        return response.data;

      })
      .catch((error) => console.log(error));
  }

  assignOrder(orderId){
    return axios
      .put(API_URL+"?orderid="+orderId, {
        
      },{ headers: authHeader() })
      .then(response => {
        console.log("response = " + response);
        return response.data;

      })
      .catch((error) => console.log(error));
  }


}

export default new OrderService();
