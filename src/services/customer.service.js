import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user';

class UserService {
  createCustomer(customer) {
    return axios
      .post(API_URL, {
        name: customer.name,
        phone: customer.phone,
        address: customer.phone,
        email: customer.email
      },{ headers: authHeader() })
      .then(response => {
        console.log("response = " + response);
        return response.data;
        
      })
      .catch((error) => console.log(error));
  }

  getUserBoard() {
    var url = API_URL + 'user';
    console.log(url + "==" + JSON.stringify(authHeader()));
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
