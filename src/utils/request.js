import axios from 'axios'
import { BaseUrl } from '@/config'

const service = axios.create({
  baseURL: BaseUrl, // api base_url
})

const err = (error) => {
  if (error.response) {
    let data = error.response.data
    switch (error.response.status) {
      default:
        console.log(data)
        break
    }
  } else if (error.message) {
    console.log(error.message);
  }
  return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
   return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  return  res
}, err)

export default service