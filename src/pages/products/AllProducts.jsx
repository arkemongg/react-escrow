import styles from './styles/AllProducts.module.css'
import { FeaturedProductsCard, LoadingProductsCard, Product } from '../home/templates/ProductCards';
import { Link, useLocation, useParams,useHref,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EmptyMessage, Error } from '../home/templates/Error';
import { CategoryData } from '../../CategoryContext';
import { axiosInstance } from '../AxiosHeaders';

const AllProducts = () => {

    // BASIC API CALLS VARIABLES
    const [data,setData] = useState([])
    const [err,setErr] = useState(false)
    const [errMessage,setErrMessage] = useState("404")
    const [fetched,setFetched] = useState(false)
    
    // GET LOCATION AND NAVIGATE
    const location = useLocation();
    const navigate = useNavigate()
    
    // URLS AND NEXT URLS
    const [url,setUrl] =  useState(`/api/products/${location.search}`)
    const [nextUrl,setNextUrl] =  useState(null)
    const [prevUrl,setPrevUrl] =  useState(null)
    
    // UPDATE THE URL VIA LOCATION
    const [productsCount,setProudctsCount] = useState(-1)
    const [pageCount,setPageCount] = useState(0)
    const [page,setPage] = useState(1)
    useEffect(()=>{
        setUrl(`/api/products/${location.search}`)
    },[location])

    useEffect(() => {
        setFetched(false)
        const timeout = setTimeout(() => {
            async function getProducts() {
                try {
                  const response = await axiosInstance.get(url);
                  return response
                } catch (error) {
                  throw error
                }
              }
            const response =  getProducts()
            response.then(data=>{
                if(data.status===200){
                    setProudctsCount(data.data.count)
                    
                    // SET NEXT PREV URL
                    setPrevUrl(data.data.previous)
                    setNextUrl(data.data.next)
                    
                    // COUNT TOAL PAGE TO SET IT FOR GO BTN
                    const total = Math.ceil(data.data.count / 6);
                    setPageCount(total)

                    // SET THE DATA
                    data = data.data.results
                    setData([...data])
                    setFetched(true)
                    
                    // CALCULATE CURRENT PAGE LOCATION
                    const searchParams = new URLSearchParams(url);
                    const pageNumber = (searchParams.get("offset")/6)+1
                    setPage(pageNumber)
                    
                }else {
                    alert("Unexpected error.")
                }
            }).catch(err=>{
                if(err.request){
                    // setErr(true)
                    // setErrMessage(data.message)
                }
            })
        }, 2000);
        return () => clearTimeout(timeout);
      },[url]);
      
    // HANDLE NEXT AND PREV BTN
    const handlePrev = ()=>{
        if(prevUrl===null){
            return
        }
        setUrl(prevUrl)
        const element = document.getElementById('allproductsection');

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const handleNext = ()=>{
        if(nextUrl===null){
            return
        }
        setUrl(nextUrl)
        const element = document.getElementById('allproductsection');

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    //HANDLE GO BTN
    const handleGo = ()=>{
        if(page<=0||page>pageCount){
            return;
        }
        const searchParams = new URLSearchParams(location.search);

        searchParams.set("limit",6)
        searchParams.set("offset",(page-1)*6)
        navigate(`/products?${searchParams.toString()}`)
        
    }
    return (
        <>  
        {/* SEARCHPRODUCTS COMPONENT / SEARCH FORM */}
            <SearchPrdoucts setUrl = {setUrl} />
            <section id='allproductsection' className={`${styles.AllProductsSection}`}>
                
                <div className={styles.AllProductsArea}>
                    {/* ADD THE PRODUCTS CARD  */}
                    {fetched?data.length>0?(
                        data.map(product=>{                            
                            return product.featured?(
                            <FeaturedProductsCard 
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
                            ):(
                            <Product 
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
                            )
                        })
                    ):<EmptyMessage message = {"No Products found."}/>:(
                       err?<Error error={errMessage} />:Array.from({ length: 6 }, (_, index) => <LoadingProductsCard key={index} />)
                    )}
                </div>

                {/* NEXT PREVIOUS AND GO BTN */}
                <div className={`nextPrev flex justify-center ${productsCount>6?"":"hidden"}`}>
                    <div onClick={handlePrev} className="btn btn-primary min-w-[150px]">Prev</div>
                    <div onClick={handleNext} className="btn btn-primary min-w-[150px] ml-5 ">Next</div>
                </div>
                <div className={`flex justify-center items-center p-5 ${productsCount>6?"":"hidden"}`}>
                    <input onChange={e=>setPage(e.target.value)} value={page} type="text" placeholder="Page" className={` text-sm p-1 w-[80px] h-[32px] input rounded-none input-bordered`} /> 
                    <div className="text-2xl pr-5">
                        /{pageCount}
                    </div>
                    <div onClick={handleGo} className="btn btn-sm btn-primary">Go</div>
                </div>
            </section>
            
        </>
    )
};

export default AllProducts;


// SEARCH PRODUCTS FORMS
const SearchPrdoucts = (props)=>{
    // CURRENT LOCATION AND GET THE DATA FOR SEARCH FROM THE LOCATION
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoryUrl = searchParams.get('category');
    const sortUrl = searchParams.get('ordering');
    const featuredUrl = searchParams.get('featured');
    const searchUrl = searchParams.get('search');
    const price__gtUrl = searchParams.get('price__gt');
    const price__ltUrl = searchParams.get('price__lt');

    // NAVIGATE TO URL
    const navigate = useNavigate()

    const [selectedCategory,setSelectedCategory] = useState(categoryUrl!=null?categoryUrl:"")
    const [selectedSort,setSelectedSort] = useState(sortUrl!=null?sortUrl:"")
    const [selectedFeatured,setSelectedFeatured] = useState(featuredUrl!=null?featuredUrl:"")
    const [searchValue,setSearchValue] = useState(searchUrl!=null?searchUrl:"")
    const [price__gt,setPrice__gt] = useState(price__gtUrl!=null?price__gtUrl:"")
    const [price__lt,setPrice__lt] = useState(price__ltUrl!=null?price__ltUrl:"")

    // EFFECT TO UPDATE THE CATEGORIES FROM THE ROOT CATEGORY CONTEXT
    const category = CategoryData()
    const [categoryData,setCategoryData] = useState([])
    
    useEffect(()=>{
        if(category.category.length>0){
            setCategoryData(category.category[0])
        }
    },[category])
    
    // SELECT HANDLERS
    const handleCategory = (event)=>{
        setSelectedCategory(event.target.value)
        //navigate(`/products?category=${event.target.value}`)
    }
    const handleFeatured = (event)=>{
        setSelectedFeatured(event.target.value)
    }
    const handleSorting = (event)=>{
        setSelectedSort(event.target.value)
    }

    //SEARCH AND CLEAR BTN
    const handleSearch = ()=>{
        props.setUrl(`/api/products/?category=${selectedCategory}&&featured=${selectedFeatured}&&ordering=${selectedSort}&&price__gt={}&&price__lt={}&search={}`)
        navigate(`/products?category=${selectedCategory}&&featured=${selectedFeatured}&&ordering=${selectedSort}&&price__gt=${price__gt}&&price__lt=${price__lt}&search=${searchValue}`)
    }
    const handleClear = ()=>{
        navigate('/products')
        setPrice__gt("")
        setSearchValue("")
        setPrice__lt("")

        setSelectedCategory("")
        setSelectedFeatured("")
        setSelectedSort("")
    }

    return (
        <>
            <section id='searchresults' className={`${styles.SearchProductsSection} `}>
                <h1 className='text-4xl p-5 text-center'>Search Products</h1>
                <hr />
                <div className={`${styles.searchProducts} flex flex-col justify-center items-center`} >
                    <div className={`${styles.searchArea} p-5 pb-0`}>
                        <input onChange={e=>setSearchValue(e.target.value)} type="text" placeholder="Product Name" className={`${styles.searchInput} input rounded-none input-bordered`} />
                        <select onChange={handleCategory} value={selectedCategory} className={`select rounded-none select-bordered ${styles.select} lg:max-w-[360px]`} >
                            <option value={""} disabled>Category</option>
                            {categoryData.length>0&&categoryData.map(category=>{
                            return <option key = {category.id} value={category.id}>{category.title}</option>
                            })}
                        </select>
                    </div>
                    <div className={`${styles.FilterArea}  px-5 items-center`}>
                        <input onChange={e=>setPrice__gt(e.target.value)} type="text" placeholder="Price greater than" className={`${styles.searchInput} input rounded-none input-bordered`} />
                        <input onChange={e=>setPrice__lt(e.target.value)} type="text" placeholder="Price less than" className={`${styles.searchInput} input rounded-none input-bordered `} />
                    </div>
                    
                    <div className={`${styles.FilterArea}  p-5 pt-0 items-center`}>
                        <select onChange={handleFeatured} value={selectedFeatured} className={`select rounded-none select-bordered ${styles.select}`} >
                            <option value={""} disabled>Featured</option>
                            <option value={true}>YES</option>
                            <option value={false}>NO</option>
                        </select>
                        <select onChange={handleSorting} value={selectedSort} className={`select rounded-none select-bordered ${styles.select}`} >
                            <option value={""} disabled>Sort</option>
                            <option value="price">Price - Ascending</option>
                            <option value="-price">Price - Descending</option>
                            <option value="created_at">Created At - Ascending</option>
                            <option value="-created_at">Created At - Descending</option>
                            <option value="view_count">View Count - Ascending</option>
                            <option value="-view_count">View Count - Descending</option>
                        </select>
                    </div>
                    
                    <div className="btnArea pb-5 flex  flex-wrap justify-center">
                        <button onClick={handleSearch} className="btn btn-primary min-w-[300px] max-w-[80%] rounded-none m-1 grow">Search</button>
                        <button onClick={handleClear} className="btn btn-error min-w-[300px] max-w-[80%] rounded-none m-1 grow">Clear Filter</button>
                    </div>

                </div>

            </section>
        </>
    )
}