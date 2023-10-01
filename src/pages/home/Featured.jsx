import { useEffect, useState } from 'react';
import styles from './styles/Featured.module.css'
import {FeaturedProductsCard, LoadingProductsCard} from './templates/ProductCards';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../AxiosHeaders';
import { Error } from './templates/Error';


const Featured = () => {

    const [data,setData] = useState([])
    const [err,setErr] = useState(false)
    const [errMessage,setErrMessage] = useState("404")
    const [fetched,setFetched] = useState(false)


    useEffect(() => {
        const timeout = setTimeout(() => {
            async function getProducts() {
                try {
                  const response = await axiosInstance.get('/api/products/?featured=true')
                  return response
                } catch (error) {
                  throw error
                }
              }
            const response =  getProducts()
            response.then(data=>{
                if(data.status===200){
                    data = data.data.results
                    setData([...data])
                    setFetched(true)
                    
                }else {
                    alert("Unexpected error.")
                }
            }).catch(err=>{
                if(data.request){
                    // setErr(true)
                    // setErrMessage(data.message)
                }
            })
        }, 2000);
        return () => clearTimeout(timeout);
      },[]);

    return (
        <>
            <section className={`${styles.featuredSection}`}>
                <div className="text-center text-5xl pt-10">
                    Featured Products
                </div>
                <div className=" text-center p-10">
                    Buy staff pciked featured products.
                </div>

                <div className={styles.featuredProudctsArea}>
                {fetched?(
                        data.map(product=>{                            
                            return <FeaturedProductsCard 
                                id = {product.id}
                                title = {product.title}
                                slug = {product.slug}
                                price = {product.price}
                                img = {product.image}
                                verified = {product.is_verified}
                                super = {product.super_seller}
                                category = {product.category.title}
                                seller_name = {product.seller_name}
                                seller_review = {product.seller_review.rating}
                                seller_review_count = {product.seller_review.total_feedback}
                                key={product.id}
                            />
                            
                        })
                    ):(
                       err?<Error error={errMessage} />:Array.from({ length: 6 }, (_, index) => <LoadingProductsCard key={index} />)
                    )}
                
                </div>
                <div className="btnArea flex justify-center w-full mt-5">
                    <Link to='/products?featured=true' className='btn btn-info text-white'>More Featured Products</Link>
                </div>
            </section>
        </>
    )
  };
  
  export default Featured;