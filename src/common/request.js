import axios from 'axios';

axios.defaults.timeout = 600 * 1000;
// let baseUrl = api.API + 'api/openjaw';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use((config)=> {
  return config;
}, (error) =>{
  return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use((response) => {
return response;
}, (error)=> {
return Promise.reject(error);
});
/**
 *get方法封装
 *
 * @export
 * @param {*} url.
 * @param {*} [params={}]
 * @returns
 */
export function get(url, params = {}) {
	return new Promise(
		(resolve, reject) => {
			axios.get(url, {
					params: params
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					reject(err);
				});
		}
	);
}

/**
 *post封装
 *
 * @export
 * @param {*} url
 * @param {*} [data={}]
 * @returns
 */
export function post(url,params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


/**
 *put封装
 *
 * @export
 * @param {*} url
 * @param {*} [data={}]
 * @returns
 */
export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			});
	});
}
