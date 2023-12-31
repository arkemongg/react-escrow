import { useState } from 'react';
import {apiUrl} from './Urls.js'
import axios from 'axios';
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NzY5ODAzLCJpYXQiOjE2OTU2ODM0MDMsImp0aSI6IjEyODY4MWUwMWJhNzRiOTQ5MmRlYWNiZDgwNjc2Y2IzIiwidXNlcl9pZCI6NH0.SsrYlmZ29NDMyZJwdCHVXo6zvc9LpmMNyU4oRwaoYvk
    
    export function AxiosInstanceJWT() {
      const jwtToken = getCookie("token");
  
      return axios.create({
          baseURL: apiUrl, 
          headers: {
              'Authorization': `JWT ${jwtToken}`,
              'Content-Type': 'application/json'
            }
      });
    }
    export function AxiosInstanceImageJWT() {
      const jwtToken = getCookie("token");
  
      return axios.create({
          baseURL: apiUrl, 
          headers: {
              'Authorization': `JWT ${jwtToken}`,
              'Content-Type': 'multipart/form-data'
            }
      });
    }
 
    // const jwtToken = getCookie("token")
    
    // export const axiosInstanceJWT = axios.create({
    //     baseURL: apiUrl, 
    //     headers: {
    //         'Authorization': `JWT ${jwtToken}`,
    //         'Content-Type': 'application/json'
    //       }
    // });


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


// Handle Cookies

export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
}

export function validatePassword(password) {
  // Regular expressions to check for uppercase, lowercase, and number
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;

  // Check if the password meets all the requirements
  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasNumber = numberRegex.test(password);
  
  // Check if the password length is between 8 and 20 characters
  const isValidLength = password.length >= 8 && password.length <= 20;

  // Return true if all conditions are met
  return hasUppercase && hasLowercase && hasNumber && isValidLength;
}



export const post = async (url,data)=>{
  const axiosInstanceJWT = AxiosInstanceJWT()
  try{
      const response =  await axiosInstance.post(url,data)
      return response
  }catch(error){
      throw error
  }
}

export const postJWT = async (url,data)=>{
  const axiosInstanceJWT = AxiosInstanceJWT()
  try{
      const response =  await axiosInstanceJWT.post(url,data)
      return response
  }catch(error){
      throw error
  }
}

export const getJWT = async (url)=>{
  const axiosInstanceJWT = AxiosInstanceJWT()
  try{
      const response =  await axiosInstanceJWT.get(url)
      return response
  }catch(error){
      throw error
  }
}