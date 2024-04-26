/* 
  axios的二次封装
*/

let instance = axios.create(); //创建axios实例, 避免配置冲突
instance.defaults.baseURL = "http://localhost:8888";
instance.defaults.headers["Content-Type"] = "multipart/form-data";
instance.defaults.transformRequest = (data, headers) => {
  if (headers["Content-Type"] != "multipart/form-data") return Qs.stringfy(data)
  return data;
}
instance.interceptors.response.use((response) => {
  return response.data;
}, (err) => {
  return Promise.reject(err);
})