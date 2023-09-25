import {apiUrl} from './Urls.js'
import axios from 'axios';

    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NzUxMDcxLCJpYXQiOjE2OTU2NjQ2NzEsImp0aSI6ImY1N2EwNTZhMzgyNDQ1MzY4MTJjZTVmZThkYzA5ODZjIiwidXNlcl9pZCI6Mn0.jl_OhIkEJgRKoifsMV6wbbA4IiTFaGQc5LWFrpZjtQ8"
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
    
  export function convertToFourDigits(number) {
    if (number < 1000) {
        return ("000" + number).slice(-4);
    } else {
        return number.toString();
    }
}

export function convertDatetimeToDate(datetimeString) {
  const dateObject = new Date(datetimeString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${day}-${month}-${year}`;
}