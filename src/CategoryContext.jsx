import { createContext, useContext, useEffect, useState } from "react";
import { AuthProvider } from "./AuthContext";
import { axiosInstance } from "./pages/AxiosHeaders";
import { Axios } from "axios";

const CategoryContext = createContext()

export const CategoryProvider = ({children})=>{
    const [category,setCategory] = useState([])
    const [categoryError, setCategoryError] = useState(null);

    useEffect(()=>{
        async function getCategory() {
            try {
              const response = await axiosInstance.get('/api/category/');
              if(response.status === 200){
                setCategory([response.data])
              }else{
                console.log(response);
              }
              
            } catch (error) {

                setCategoryError(error)
            }
          }
          getCategory()
    },[])
    
    return (
        <CategoryContext.Provider value = {{category,categoryError}}>
            {children}
        </CategoryContext.Provider>
    )
}

export const CategoryData = ()=>{
    return useContext(CategoryContext)
}


