import styles from './styles/NewestProducts.module.css'
import { FeaturedProductsCard, LoadingProductsCard, Product } from './templates/ProductCards';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Error,EmptyMessage } from './templates/Error';
import { CategoryData } from '../../CategoryContext';
import LoadingArea from '../GlobalTemplates/LoadingArea';

import { axiosInstance } from '../AxiosHeaders';

const NewProducts = () => {
    const category = CategoryData()

    const [data,setData] = useState([])
    const [err,setErr] = useState(false)
    const [errMessage,setErrMessage] = useState("404")
    const [fetched,setFetched] = useState(false)

    const [categoryData,setCategoryData] = useState([])
    const [selectedCategory,setSelectedCategory] = useState(0)
    
    useEffect(()=>{
        if(category.category.length>0){
            setCategoryData(category.category[0])
            setSelectedCategory(category.category[0][0].id)
        }
    },[category])

    useEffect(() => {
        if(categoryData.length > 0){
            
            async function getProducts() {
                try {
                  const response = await axiosInstance.get(`/api/products?category=${selectedCategory}`);
                  return response
                } catch (error) {
                  return error
                }
            }
    
            setTimeout(() => {
                const response =  getProducts()
                
                response.then(data=>{
                    console.log(data);
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
        }
      },[selectedCategory]);

      const handleCategory = (event)=>{
        if(event.target.getAttribute("value")===selectedCategory){
            return;
        }
        setSelectedCategory(event.target.getAttribute("value"))
        setFetched(false)  
      }

    return (
        <>
            <section className={`${styles.NewProductsSection}`}>
                <div className="text-center text-5xl pt-10">
                    New Products
                </div>
                <div className=" text-center p-10">
                    Check out our newest listed products
                </div>
                <div className={styles.categoryArea}>
                    {categoryData.length > 0?(
                        categoryData.map(category=>{
                           return <div onClick={handleCategory} key={category.id} value = {category.id} className="btn btn-info text-white">{category.title}</div>
                        })
                    ):<LoadingArea />}
                </div>
                
                <div className={styles.newProductsArea}>
                    {fetched?(
                        data.map(product=>{
                            return <Product 
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
                            key={product.id}/>
                        })
                    ):(
                       err?<Error error={errMessage} />:Array.from({ length: 6 }, (_, index) => <LoadingProductsCard key={index} />)
                    )}
                    {fetched&&data.length === 0 ? <EmptyMessage message={"No products found."} /> :console.log("no") }
                </div>
                <div className="btnArea flex justify-center w-full mt-5">
                    <Link to='/products' className='btn btn-info text-white'>More New Products</Link>
                </div>
            </section>
            <hr />
        </>
    )
};

export default NewProducts;