import styles from './styles/AllProducts.module.css'
import { FeaturedProductsCard, LoadingProductsCard, Product } from '../home/templates/ProductCards';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Error } from '../home/templates/Error';


const AllProducts = () => {
    const [data,setData] = useState([])
    const [err,setErr] = useState(false)
    const [errMessage,setErrMessage] = useState("404")
    const [fetched,setFetched] = useState(false)
    async function getProducts() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/products/');
          return response
        } catch (error) {
          return error
        }
      }


    useEffect(() => {
        setTimeout(() => {
            const response =  getProducts()
            response.then(data=>{
                if(data.status===200){
                    data = data.data.results
                    setData([...data])
                    setFetched(true)  
                }else if(data.request.status===0){
                    // setErr(true)
                    // setErrMessage(data.message)
                }
            })
        }, 2000);
      },[]);


    return (
        <>
            <section className={`${styles.AllProductsSection}`}>
                
                <div className={styles.AllProductsArea}>
                    {fetched?(
                        data.map(product=>{
                            console.log(product);
                            return <Product 
                            title = {product.title}
                            price = {product.price}
                            img = {product.image}
                            verified = {product.is_verified}
                            super = {product.super_seller}
                            category = {product.category.title}
                            key={product.id}/>
                        })
                    ):(
                       err?<Error error={errMessage} />:Array.from({ length: 9 }, (_, index) => <LoadingProductsCard key={index} />)
                    )}
                </div>

            </section>
            
        </>
    )
};

export default AllProducts;