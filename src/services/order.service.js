import axios from 'axios';

const API_URL = 'http://localhost:8080/api/order';

class OrderService {
  createOrder(order) {
    return axios
      .post(API_URL, {
        customer: order.customer,
        shirt: order.shirt,
        pant: order.pant
      })
      .then(response => {
        console.log("response = " + response);
        return response.data;
        
      })
      .catch((error) => console.log(error));
  }

  fetchAllOrder(){
    return axios
      .get(API_URL)
      .then(response => {
        return response.data;
        
      })
      .catch((error) => console.log(error));
  }


}

export default new OrderService();
