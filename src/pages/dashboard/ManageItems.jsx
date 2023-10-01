import { memo, useEffect, useState } from 'react';
import { LoadingProductsCard, Product } from './MyProducts/MyProductCards'
import styles from './styles/ManageItems.module.css'
import { AxiosInstanceImageJWT, AxiosInstanceJWT, getJWT } from '../AxiosHeaders';
import { CategoryData } from '../../CategoryContext';
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom';
import { apiUrl } from '../Urls';


const ManageItems = ()=>{
    
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
        }
    },[editData])
    return (
        <>
            <div className={styles.ManageItemsSection}>
                <MyProducts setEditData = {setEditData}/>
                {edit?<Edititems editData = {editData} />:""}
            </div>
        </>
    )
}


const MyProducts = (props)=>{
    
    const [url,setUrl] = useState('/api/myproducts/')
    const [data,setData] = useState([])
    
    const [fetched,setFetched] = useState(false)
    const [err,setErr] = useState(false)

    useEffect(()=>{

        const timeout = setTimeout(() => {
            const getData = getJWT(url)
            getData.then(data=>{
                if(data.status===200){
                    setData(data.data.results)
                    setFetched(true)
                }
            }).catch(err=>{
                console.log(err);
            })
        }, 0);

        return () => clearTimeout(timeout);
    },[url])

    return (
        <div className={styles.MyProductsArea}>
            <h1 className='text-2xl p-5'>My Products</h1>
            <hr />
            <div className={`${styles.searchArea} p-5`}>
                    <input type="text" placeholder="Type here" className={`max-w-[550px] ${styles.searchInput} input rounded-none input-bordered`} />
                    <button className={`max-w-[150px] ml-5 ${styles.homeSearchBtn} btn btn-primary`}>Search</button>
            </div>
            <div className={styles.MyProducts}>
                {fetched?data.map(product=>{
                    return <Product
                     key={product.id} 
                     data = {product}
                     setEditData = {props.setEditData}
                     />
                }):Array.from({ length: 6 }, (_, index) => <LoadingProductsCard  key={index}/>)}
            </div>
           
            <div className="myProductBtns flex justify-center pt-5">
                    <div className="btn  w-[160px] btn-primary mr-5">
                        Previous
                    </div>
                    <div className="btn w-[160px] btn-primary ">
                        Next
                    </div>
            </div>
            
        </div>

    )
}

export default ManageItems;



const Edititems = (props) => {
    

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
        setId(props.editData.id)
        setTitle(props.editData.title)
        setDescription(props.editData.description)
        setPrice(props.editData.price)
        setCategory(props.editData.category.id)
        setInventory(props.editData.inventory)
        setCondition(props.editData.condition)
        setProductImg(props.editData.image!==null?props.editData.image:"dd")
    },[props.editData])
    
    const handleClick = (event)=>{
        
        const postData = {
            "title": title,
            "description": description,
            "price": price,
            "category": category,
            "inventory": inventory,
            "condition": condition,
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
        formData.append('image', img);
        for (const key in postData) {
            formData.append(key, postData[key]);
        }
        setClicked(true)
        
        const patchData = async ()=>{
            const data = await axiosInstanceImageJWT.patch(`/api/myproducts/${id}/`,formData)
            
        }
        

        
    }

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
                            Edit Product ID #{id}
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
                                <input value={inventory} onChange={e=>setInventory(e.target.value)} id='ListProductInventory' type="number" placeholder="How many products you want to list?" className="input input-bordered rounded-none w-full max-w-xl"/>
                                
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
        </>
    )
};

