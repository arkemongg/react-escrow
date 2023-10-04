import styles from './styles/Counts.module.css'

import products from './assets/products.png'
import sales from './assets/sales.png'
import happy from './assets/happy.png'
import users from './assets/users.png'
import { memo, useEffect, useState } from 'react'
import { axiosInstance } from '../AxiosHeaders'

const Counts = () => {
    const [fetched,setFetched] = useState(false)
    const [data,setData] = useState([])


    useEffect(() => {
        const handleScroll = () => {
          const targetSection = document.getElementById('counts');
    
          if (targetSection) {
            const rect = targetSection.getBoundingClientRect();
    
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                setTimeout(() => {
                    const getCounts = async () => {
                        try{
                            const result = await axiosInstance.get('/api/home-dashboard/')
                            return result
                        }catch(error){
                            throw error
                        }
                    } 
                    const data = getCounts()
                    data.then(data=>{
                        if(data.status===200){
                            setFetched(true)
                            setData(data.data)
                        }
                    }).catch(err=>{
                        alert("Error loading data.")
                    })
                }, 2000);
              window.removeEventListener('scroll', handleScroll);
            }
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
   
    return (
        <>
            <section id='counts' className={`${styles.CountsSection}`}>
                
                <div className={styles.CountArea}>
                    
                    <div className={`${styles.Count}`}>
                            <img src={products} alt="products" />
                            <div className="text-4xl text-warning pt-2">
                                {fetched?data.total_items:<span className="loading loading-bars loading-md"></span>}
                            
                            </div>
                            <p className="text-xl text-center w-[250px] p-5">
                                ITEMS for Sale
                            </p>
                    </div>
                    <div className={`${styles.Count}`}>
                            <img src={sales} alt="sales" />
                            <div className="text-4xl text-success pt-2">
                                {fetched?data.items_sold:<span className="loading loading-bars loading-md"></span>}
                            </div>
                            <p className="text-xl text-center w-[250px] p-5">
                                ITEMS Sold
                            </p>
                    </div>
                    <div className={`${styles.Count}`}>
                            <img src={happy} alt="happy" />
                            <div className="text-4xl text-primary pt-2">
                                {fetched?data.total_customer:<span className="loading loading-bars loading-md"></span>}
                            </div>
                            <p className="text-xl text-center w-[250px] p-5">
                                Happy Customers
                            </p>
                    </div>
                    <div className={`${styles.Count}`}>
                            <img src={users} alt="users" />
                            <div className="text-4xl text-accent pt-2">
                                {fetched?data.total_sellers:<span className="loading loading-bars loading-md"></span>}
                            </div>
                            <p className="text-xl text-center w-[250px] p-5">
                                Sellers
                            </p>
                    </div>

                </div>

            </section>
        </>
    )
};

export default memo(Counts);