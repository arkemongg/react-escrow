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
            <SearchPrdoucts />
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
                       err?<Error error={errMessage} />:Array.from({ length: 6 }, (_, index) => <LoadingProductsCard key={index} />)
                    )}
                </div>

                <div className='nextPrev flex justify-center'>
                    <div className="btn btn-primary min-w-[150px]">Prev</div>
                    <div className="btn btn-primary min-w-[150px] ml-5 ">Next</div>
                </div>
                <div className='flex justify-center items-center p-5'>
                    <input type="text" placeholder="Page" className={` text-sm p-1 w-[80px] h-[32px] input rounded-none input-bordered`} /> 
                    <div className="text-2xl pr-5">
                        /0
                    </div>
                    <div className="btn btn-sm btn-primary">Go</div>
                </div>
            </section>
            
        </>
    )
};

export default AllProducts;


const SearchPrdoucts = ()=>{
    return (
        <>
            <section className={`${styles.SearchProductsSection} `}>
                <h1 className='text-4xl p-5 text-center'>Search Products</h1>
                <hr />
                <div className={`${styles.searchProducts} flex flex-col justify-center items-center`} >
                    <div className={`${styles.searchArea} p-5 pb-0`}>
                        <input type="text" placeholder="Product Name" className={`${styles.searchInput} input rounded-none input-bordered`} />
                        <select className={`select rounded-none select-bordered ${styles.select} lg:max-w-[360px]`} defaultValue="disabled" >
                            <option value="disabled" disabled>Category</option>
                            <option value="largeApple">Large Apple</option>
                            <option value="largeOrange">Large Orange</option>
                            <option value="largeTomato">Large Tomato</option>
                        </select>
                    </div>
                    <div className={`${styles.FilterArea}  p-5 pt-0 items-center`}>
                        <input type="text" placeholder="Price greater than" className={`${styles.searchInput} input rounded-none input-bordered`} />
                        <input type="text" placeholder="Price less than" className={`${styles.searchInput} input rounded-none input-bordered `} />
                    </div>
                    
                    <div className="btnArea pb-5 flex grow">
                    <button className="btn btn-primary min-w-[300px] rounded-none">Search</button>
                    </div>

                </div>

            </section>
        </>
    )
}