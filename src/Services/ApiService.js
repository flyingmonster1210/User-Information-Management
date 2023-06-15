import axios from 'axios'
import { API_BASE_URL } from './constants.js'

class ApiService {
  get (url, data) {
    return axios({
      method: 'get',
      baseURL: API_BASE_URL, url,
      timeout: 5000,
      params: data,
      headers: {

      }
    })
  }

  post (url, data) {
    return axios({
      method: 'post',
      baseURL: API_BASE_URL, url,
      timeout: 5000,
      params: data,
      headers: {

      }
    })
  }

  put (url, data) {
    return axios({
      method: 'put',
      baseURL: API_BASE_URL, url,
      timeout: 5000,
      data: data,
      headers: {

      }
    })
  }
}

export default new ApiService()