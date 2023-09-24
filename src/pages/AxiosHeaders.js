import {apiUrl} from './Urls.js'
import axios from 'axios';

    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NjUxNzAxLCJpYXQiOjE2OTU1NjUzMDEsImp0aSI6ImRlZDRlNDRiMDRlZjQ4YmRiODJhYjM1NzYyNGQzZDQxIiwidXNlcl9pZCI6Mn0._OvrjqZW-ZRu63SDd3L3vqb3YNXTidjvyJ_zjCCs3BA"
    export const axiosInstanceJWT = axios.create({
        baseURL: apiUrl, 
        headers: {
            'Authorization': `JWT ${jwtToken}`,
            'Content-Type': 'application/json'
          }
    });


   export const axiosInstance = axios.create({
        baseURL: apiUrl, 
        headers: {
            'Content-Type': 'application/json'
          }
    });
    

