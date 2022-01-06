import axios from "axios";
import router from "@/router";
import { message } from 'ant-design-vue';
console.log(process.env.NODE_ENV)
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.interceptors.request.use(config => {//请求拦截,当有token的时候请求头带上token
   
    if (localStorage.token) {
        // Authorization 
        config.headers.Authorization =  localStorage.token;
    }
    return config;
},
    err => {
        return Promise.reject(err)
    }
)
axios.interceptors.response.use(function (response) {//响应拦截   对请求到的数据进行处理  根据你们接口调整
    if (response.data.code == 0 || response.data instanceof Array) {
        return response.data;
    } else if (response.data.code == 401) {
        message.error('登录已失效，请重新登录');
        localStorage.token = '';
        router.push("/")
    } else {
        message.error(response.data.msg)
        return response.data;
        
    }
    
}, function (error) {
    message.error("服务器错误,请重试")
    return Promise.reject(error);//里面的值会被catch捕捉
});
var postData = function (url, data, method) { //封装axios 第一个是接口地址  第二个是参数   第三个是请求方法
    return axios({
            method,
            url: url,
            data,//用parmas参数就会拼接到路径后面,要json数据就用json请求头(默认),用formdata就用application/x-www-form-urlencoded,还要用qs转一下
            })
}
var getData = function(url, params) {
    return axios.get(url, {
        params,
    })
}

export const get = (url, data) => getData(url, data);
export const post = (url, data) => postData(url, data, 'POST');
export const put = (url, data) => postData(url, data, 'PUT');
export const del = (url, data) => postData(url, data, 'DELETE');