import axios from "axios";

export const request=axios.create({
    baseURL:'https://blog-app211.herokuapp.com/api',
    headers:{
        'x-auth-token':typeof window!=='undefined'&& localStorage.getItem('token')
    }
})