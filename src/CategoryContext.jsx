import { createContext, useContext, useEffect, useState } from "react";
import { AuthProvider } from "./AuthContext";
import { axiosInstance } from "./pages/AxiosHeaders";
import { Axios } from "axios";

const CategoryContext = createContext()

export const CategoryProvider = ({children})=>{
    const [category,setCategory] = useState([])

    useEffect(()=>{
        async function getCategory() {
            try {
              const response = await axiosInstance.get('/api/category/');
              setCategory([response.data])
            } catch (error) {
              
              if(error.request.status === 0){
                setCategory(error)
                // alert(error.message)
              }
            }
          }
          getCategory()
    },[])
    
    return (
        <CategoryContext.Provider value = {{category}}>
            {children}
        </CategoryContext.Provider>
    )
}

export const CategoryData = ()=>{
    return useContext(CategoryContext)
}


