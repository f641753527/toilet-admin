import axios from 'axios';
import { Message } from 'element-ui';
import ERROR_CODE from './error_code';

const Axios = new Object();

Axios.Type = {
  JSON: 'application/json; charset=utf-8',
  FORM: 'application/x-www-form-urlencoded; charset=utf-8',
  FORMDATA: 'multipart/form-data; charset=utf-8',
};

Axios.request = (url, method = 'POST', options = {}) => {
  return new Promise((resolve, reject) => {
    const { data, params, headers = { ContentType: Axios.Type.JSON, } } = options;
    axios(url, { method, headers, data, params }).then((response) => {
      const res = response.data;
      if (res.errcode === ERROR_CODE.ErrSuccess) {
        resolve(res.data);
        return;
      }
      Message.error({ message: res.errmsg, duration: 1500, showClose: true });
      reject(res.errmsg);
    }).catch((e) => {
      reject(e);
    });
  });
};

Axios.post = (url, options = {}) => Axios.request(url, 'POST', options);
Axios.get = (url, options = {}) => Axios.request(url, 'GET', options);

export default Axios;