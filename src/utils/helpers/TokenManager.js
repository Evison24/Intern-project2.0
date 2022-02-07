export default class TokenManager {
  static setToken(token) {
    let localStorage = window.localStorage;
    localStorage.setItem('access_token', token);
  }
  static getToken() {
    let localStorage = window.localStorage;
    return localStorage.getItem('access_token');
  }
  static clearToken() {
    let localStorage = window.localStorage;
    localStorage.removeItem('access_token');
  }
}
