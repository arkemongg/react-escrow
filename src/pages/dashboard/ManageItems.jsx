import { useEffect, useState } from 'react';
import { LoadingProductsCard, Product } from './MyProducts/MyProductCards'
import styles from './styles/ManageItems.module.css'
import { AxiosInstanceImageJWT, AxiosInstanceJWT, getJWT } from '../AxiosHeaders';
import { CategoryData } from '../../CategoryContext';
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom';
import { apiUrl } from '../Urls';
import { useAuth } from '../../AuthContext';

const ManageItems = (props)=>{
    const [fetched,setFetched] = useState(false)
    const [url,setUrl] = useState('/api/myproducts/?ordering=-id')
    const [editData,setEditData] = useState(null)
    const [edit,setEdit] = useState(false)
    useEffect(()=>{
        if(editData!==null){
            setEdit(true)
            setTimeout(() => {
                const editItemsSection = document.getElementById('edit');
                if (editItemsSection) {
                    editItemsSection.scrollIntoView({ behavior: 'smooth' });
                  }
            }, 1000);
        }else{
            setEdit(false)
        }
    },[editData])
    return (
        <>
            <div className={styles.ManageItemsSection}>
                <MyProducts fetched = {fetched} setFetched={setFetched} url = {url} setUrl = {setUrl} setEditData = {setEditData} setHead ={props.setHead} setTail={props.setTail} setIndex={props.setIndex} setActive={props.setActive}/>
                {edit?<Edititems setFetched={setFetched} editData = {editData}  url = {url} setUrl = {setUrl} setEditData = {setEditData}/>:""}
            </div>
        </>
    )
}


const MyProducts = (props)=>{
    const {logout} = useAuth()
    const handleListProduct = ()=>{
        props.setIndex(5)
        props.setActive("Sell Items")
        props.setHead("Sell Items")
        props.setTail(`Sell Items`)
    }

    const [search,setSearch] = useState("")
    const [nextUrl,setNextUrl] = useState(null)
    const [prevUrl,setPrevUrl] = useState(null)
    const [data,setData] = useState([])
    
    const [err,setErr] = useState(false)
    const [message, setMessage] = useState("")
    const [total, setTotal] = useState(-1)
    const handleClear = ()=>{
        if(props.url==='/api/myproducts/?ordering=-id'){
            return;
        }
        props.setUrl('/api/myproducts/?ordering=-id')
        props.setFetched(false)
    }
    const handleRefresh = ()=>{
        const url = props.url;
        
        let random = Math.floor(Math.random() * 1000) + 1;
        let newUrl;
        if (url.includes('random=')) {
            newUrl = url.replace(/(random=)[^\&]+/, `$1${random}`);
        } else {
            newUrl = `${url}${url.includes('?') ? '&&' : '?'}random=${random}`;
        }
        props.setUrl(newUrl)
    }

    useEffect(()=>{
        props.setFetched(false)
        const timeout = setTimeout(() => {
            const getData = getJWT(props.url)
            getData.then(data=>{
                if(data.status===200){
                    setTotal(data.data.count)
                    setData(data.data.results)
                    setPrevUrl(data.data.previous)
                    setNextUrl(data.data.next)
                    props.setFetched(true)
                }
            }).catch(err=>{
                setErr(true)
                if (err.response) {
                    
                    if (err.response.status === 401) {
                        logout();
                    }else if (err.response.status === 429) {
                        alert("Too many requests.");
                        
                    } else {
                        setMessage("Unexpected error with status code: ", err.response.status);
                        
                    }
                } else {
                    alert("No response from server.")
                    setMessage("No response received from the server.");
                }
            })
        }, 2000);

        return () => clearTimeout(timeout);
    },[props.url])
    const handlePrevious = (event)=>{
        if (prevUrl===null){
            return;
        }
        props.setUrl(prevUrl)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    }
    const handleNext = ()=>{
        if (nextUrl===null){
            return;
        }
        props.setUrl(nextUrl)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    }
    const handleSearch = ()=>{
        if (search.trim()===""){
            return;
        }
        props.setUrl('/api/myproducts/'+`?search=${search}`)
    }
    return (
        <div className={styles.MyProductsArea}>
            <div className='text-2xl p-5 flex items-center justify-between'>
                <h1>My Products</h1>
                <div className="btnArea flex flex-wrap justify-end">
                    <div onClick={handleRefresh} className="btn btn-success m-1 min-w-[150px]">Refresh</div>
                    <div onClick={handleClear} className="btn btn-error m-1 min-w-[150px]">Clear Filter</div>
                </div>
            </div>
            <hr />
            <div className={`${styles.searchArea} p-5`}>
                    <input onChange={e=>setSearch(e.target.value)} type="text" placeholder="Type here" className={`max-w-[550px] ${styles.searchInput} input rounded-none input-bordered`} />
                    <button onClick={handleSearch} className={`max-w-[150px] ml-5 ${styles.homeSearchBtn} btn btn-primary`}>Search</button>
            </div>
            <div className={styles.MyProducts}>
                {props.fetched?data.length>0?data.map(product=>{
                    return <Product
                     key={product.id} 
                     data = {product}
                     setEditData = {props.setEditData}
                     />
                }):<>
                    <button onClick={handleListProduct} className='btn btn-primary min-w-[350px]'>List A Product</button>
                </>
                    :Array.from({ length: 6 }, (_, index) => <LoadingProductsCard  key={index}/>)}
            </div>
           
            <div className={`myProductBtns flex justify-center pt-5 ${total>6?"":"hidden"}`}>
                    <div onClick={handlePrevious} className="btn  w-[160px] btn-primary mr-5">
                        Previous
                    </div>
                    <div onClick={handleNext} className="btn w-[160px] btn-primary ">
                        Next
                    </div>
            </div>
            
        </div>

    )
}

export default ManageItems;


// Edit the product
const Edititems = (props) => {
    const {logout} = useAuth()

    const axiosInstanceImageJWT = AxiosInstanceImageJWT()

    const categorydata = CategoryData()
    const categoryData = categorydata.category

    const [id,setId] = useState("")
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState(0)
    const [category,setCategory] = useState(0)
    const [inventory,setInventory] = useState(0)
    const [condition,setCondition] = useState("")
    const [img,setImg] = useState(null)
    const [productImg,setProductImg] = useState("/dashboardassets/d.jpg")
    
    const [success, setSuccess] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(()=>{
        if(props.editData!==null){
            setId(props.editData.id)
            setTitle(props.editData.title)
            setDescription(props.editData.description)
            setPrice(props.editData.price)
            setCategory(props.editData.category.id)
            setInventory(props.editData.inventory)
            setCondition(props.editData.condition)
            setProductImg(props.editData.image!==null?props.editData.image:"dd")
        }
    },[props.editData])
    
    const handleClick = (event)=>{
        
        const postData = {
            "title": title,
            "description": description,
            "price": parseFloat(price).toFixed(2),
            "category": category,
            "inventory": inventory,
            "condition": condition,
            "expired": false
        }
        
        if(title.trim()===""||category===0 || description.trim()==="" || price<=0 || price>50000 || inventory<0 || inventory>32000 || (img!==null&&img.size/1024 >2048) || condition === ""){
            setErr(true)
            if(title.trim()===""){
                setMessage("Please give the product a title.")
                return
            }else if (category===0){
                setMessage("Please select a category.")
                return
            }else if (description.trim()===""){
                setMessage("Please give your product a description.")
                return
            }else if(inventory<0 || inventory>32000){
                setMessage("Inventory should be  0 or smaller than 32000")
                return
            }else if (condition===""){
                setMessage("Please select a product condition.")
                return
            }else if ((img!==null&&img.size/1024 >2048)){
                setMessage("Please upload an image (max 2mb.).")
                return
            }else if(price<=0 || price>50000.0){
                setMessage("Price should be greater than 0 or smaller than 50000")
                return
            }


            setMessage("Please recheck the form for empty fields.")
            return
        }
        
        const formData = new FormData();
        if(img!==null){
            formData.append('image', img);
        }
        for (const key in postData) {
            formData.append(key, postData[key]);
        }
        setClicked(true)
        
        // Edit product request
        const patchProductData = async () => {
            try {
                const response = await axiosInstanceImageJWT.patch(`/api/myproducts/${id}/`,formData)
                return response
            } catch (error) {
                throw error
            }
        }
        const timeout =  setTimeout(() => {
            const data = patchProductData()
            data.then(data=>{
                if(data.status===200){
                    setSuccess(true)
                    setClicked(false)
                }else{
                    setClicked(false)
                    alert("Unexpected error.")
                }
            }).catch(err=>{
                setErr(true)
                if (err.response) {
                    console.log(err);
                    if (err.response.status === 401) {
                        logout();
                    }else if (err.response.status === 429) {
                        alert("Too many requests.");
                        setClicked(false)
                    } else {
                        setMessage("Unexpected error.");
                        setClicked(false)
                    }
                } else {
                    setMessage("No response received from the server.");
                    setClicked(false)
                    alert("No response from server.")
                }
            })
        }, 2000);

        
    }

    // Image upload handler
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImg(file)
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setProductImg(e.target.result);
          };
    
          reader.readAsDataURL(file);
        }
     };

    return (
        <>
            {err ? <FlaotingErrorCustom err={err} setErr={setErr} message={message} /> : ""}

            <section id = {'edit'}  className={`${styles.EditItemsSection} `}>

                    <div className={styles.formArea}>
                        <h1 className="text-2xl p-3">
                            Edit Product <br />
                            ID #{id}
                        </h1>
                        <hr />


                        <div className={`${styles.TitleCategory} p-5`}>
                            <div className="ListTitle">
                                <div className='text-2xl'>
                                    Title 
                                </div>
                                <input value={title} onChange={e=>setTitle(e.target.value)} id='ListProductTitle' type="text" placeholder="Product Title" className="input input-bordered rounded-none w-full max-w-xl" />
                            </div>

                            <div className="ListCategory">
                                <div className='text-2xl'>
                                    Category
                                </div>
                                <select onChange={e=>setCategory(e.target.value)} value={category} className="select select-bordered rounded-none  w-full max-w-xl">
                                    <option value="disabled" disabled>Category</option>
                                    {categoryData.length > 0 &&categoryData[0].map(category=>{
                                        return (<option key={category.id} value={category.id}>{category.title}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        <label className='text-2xl p-5'>
                            Product Description
                        </label>
                        <div className="ListProductsDescription p-5 flex grow">
                            <textarea value={description} onChange={e=>setDescription(e.target.value)}  placeholder="Product Description" className="textarea textarea-bordered textarea-lg w-full h-[180px]" ></textarea>
                        </div>
                        <div className={`${styles.InventoryCondition} p-5`}>
                            <div className="ListInventory">
                                <div className='text-2xl'>
                                    Inventory
                                </div>
                                <input value={inventory} onChange={e=>setInventory(parseFloat(e.target.value).toFixed(0))} id='ListProductInventory' type="number" placeholder="How many products you want to list?" className="input input-bordered rounded-none w-full max-w-xl"/>
                                
                            </div>

                            <div className="ListCondition">
                                <div className='text-2xl'>
                                    Condition
                                </div>
                                <select onChange={e=>setCondition(e.target.value)} defaultValue={condition} className="select select-bordered rounded-none  w-full max-w-xl">
                                    <option value={"none"} disabled>Choose Products Condition</option>
                                    <option value={"BRAND NEW"}>Brand New</option>
                                    <option value={"USED"}>Used</option>
                                    <option value={"DEFFECT"}>Deffect</option>
                                    <option value={"CHECK DESCRIPTION"}>Check Description</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.EditProductsImageArea}`}>
                        <h1 className="text-2xl p-5">
                            Product Image
                        </h1>
                        <hr />
                        <div className={`${styles.EditProductImage} p-5`}>
                            <div className={styles.ImgWrapper}>
                                <img src={productImg[0]==='/'?apiUrl+productImg:productImg} alt="product-image" />
                            </div>
                        </div>
                        <label className='text-2xl block px-5 pt-5'>
                            Upload Product Image
                        </label>
                        <div className='flex justify-center pt-3'>
                            <input onChange={handleImageUpload} type="file" className="file-input file-input-bordered rounded-none file-input-primary w-[95%]" />
                        </div>

                        <div className="PriceSaveArea p-5">
                            <label className='block text-2xl' htmlFor="price">Price</label>
                            <div className="btnArea flex grow">
                                <input value={price} onChange={e=>setPrice(e.target.value)} id='price' type="number" placeholder="Product Price" className="input input-bordered rounded-none w-full"/>
                                <div onClick={handleClick} className="btn btn-success ml-5 min-w-[200px]">{clicked?<span className="loading loading-dots loading-md"></span>:"List Product"}</div>
                            </div>
                        </div>
                    </div>
                      
            </section>
            {/*Edit Success card */}
            <ProductEditSuccess setFetched={props.setFetched}  id = {id} setUrl = {props.setUrl} setSuccess = {setSuccess} success= {success} setEditData = {props.setEditData} /> 
        </>
    )
};
//Edit Success card 
const ProductEditSuccess = (props)=>{

    const handleClose = ()=>{
        props.setSuccess(false)
        props.setEditData(null)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    }
    const handleCheckProduct = ()=>{
        let random = Math.floor(Math.random() * 1000) + 1;
        props.setUrl(``)
        props.setUrl(`/api/myproducts?id=${props.id}&&${random}`)
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
        props.setSuccess(false)
        props.setEditData(null)
        props.setFetched(false)
    }
    return(
        <>
            <div className={` ${styles.blurryBackgroundSection} ${styles.blurryBackground} ${props.success?'':"hidden"}` }>
                <div className={`${styles.ModalArea}`}>
                    <div className='text-center text-2xl font-bold flex items-center'>
                    <img className='w-[20px] h-[20px]' src="dashboardassets/success.png"  alt="" />Product updated successflly.
                    </div>
                    <br />
                    <div className='btnArea flex flex-wrap justify-center'>
                            <div onClick={handleCheckProduct} className="btn btn-primary m-1 ">
                                Check The Product
                            </div>
                            <div onClick={handleClose} className="btn m-1 min-w-[180px] btn-error ">
                                Close
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

