import axios from '@/utils/request'

//post
export function postAction(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter,
  })
}

//get
export function getActtion(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    params: parameter,
  })
}