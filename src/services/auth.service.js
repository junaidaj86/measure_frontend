import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'authenticate', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    let role;
    if (user.role === 1) {
      role = "ROLE_ADMIN";
    } else {
      role = "ROLE_USER";
    }

    return axios.post(API_URL + 'admin/register', {
      name: user.username,
      email: user.email,
      password: user.password,
      roles: role,
      shopId: user.shop
    }, { headers: authHeader() });
  }
}

export default new AuthService();
