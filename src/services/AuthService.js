// src/services/AuthService.js

import axios from 'axios';

const url = 'http://127.0.0.1:8000/api/auth/';
const productUrl = 'http://127.0.0.1:8000/api/';

export default {
  login(credentials) {
    return axios
      .post(url + 'login', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'register', credentials)
      .then(response => response.data);
  },
  logout(token) {
    return axios.get(url + 'logout', {headers:{'Authorization': `token ${token}`}}).then(response => response.data);
  },
  deactivate(token) {
    return axios
      .get(url + 'deactivate',  {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data);
  },


  latestProducts(){
    return axios
      .get(productUrl+'latestproduct/')
      .then(response => response.data)

  },
  productsList(){
    return axios
      .get(productUrl+'products/')
      .then(response => response.data)
  },
  categoryList(){
    return axios
      .get(productUrl+'categories/')
      .then(response => response.data)
  },
  productDetail(category_slug, product_slug){
    return axios
      .get(productUrl+`products/${category_slug}/${product_slug}/`)
      .then(response => response.data)
  },
  categoryDetail(category_slug){
    return axios
      .get(productUrl+`category/${category_slug}/`)
      .then(response => response.data)
  },
  searchProduct(query){
    return axios
      .post(productUrl+'products/search/', {'query':query})
      .then(response => response.data)
  },
  checkout(data,token){
    return axios
      .post(productUrl+'cart/checkout',data, {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },
  orderList(token){
    return axios
      .get(productUrl+'cart/myorders',{headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  }
};