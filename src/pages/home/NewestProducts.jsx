import styles from './styles/NewestProducts.module.css'
import { FeaturedProductsCard, LoadingProductsCard } from './templates/featuredProducts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


const NewProducts = () => {
    const [data,setData] = useState([])
    const [fetched,setFetched] = useState(false)
    async function getProducts() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/products/');
          return response
        } catch (error) {
          console.error(error);
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
                }
            })
        }, 2000);
      },[]);

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
                    <div className="btn btn-info">Gaming</div>
                    <div className="btn btn-info">Gaming Cards</div>
                    <div className="btn btn-info">Electronics</div>
                    <div className="btn btn-info">Electronics</div>
                    <div className="btn btn-info">Electronics</div>
                    <div className="btn btn-info">Gaming</div>
                    <div className="btn btn-info">Gaming Cards</div>
                    <div className="btn btn-info">Electronics</div>
                    <div className="btn btn-info">Electronics</div>
                    <div className="btn btn-info">Electronics</div>
                </div>
                
                <div className={styles.newProductsArea}>
                    {fetched?(
                        data.map(product=>{
                            console.log(product);
                            return <FeaturedProductsCard 
                            title = {product.title}
                            price = {product.price}
                            key={product.id}/>
                        })
                    ):(
                       Array.from({ length: 8 }, (_, index) => <LoadingProductsCard key={index} />)
                    )}
                </div>
                <div className="btnArea flex justify-center w-full mt-5">
                    <Link className='btn btn-info text-white'>More New Products</Link>
                </div>
            </section>
            <hr />
        </>
    )
};

export default NewProducts;