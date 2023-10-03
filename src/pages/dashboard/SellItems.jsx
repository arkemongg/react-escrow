import { memo, useState } from 'react';
import styles from './styles/Sellitems.module.css'
import { CategoryData } from '../../CategoryContext';
import { AxiosInstanceImageJWT } from '../AxiosHeaders';
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom';
import { useAuth } from '../../AuthContext';

const Sellitems = (props) => {
    const {logout} = useAuth()
    const axiosInstanceImageJWT = AxiosInstanceImageJWT()

    const categorydata = CategoryData()
    const data = categorydata.category

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

    const handleClick = (event)=>{
        
        const postData = {
            "title": title,
            "description": description,
            "price": price,
            "category": category,
            "inventory": inventory,
            "condition": condition,
        }
        
        if(title.trim()===""||category===0 || description.trim()==="" || price<=0 || price>50000 || inventory<0 || inventory>32000 || img ===null || img.size/1024 >2048 || condition === ""){
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
            }else if (img===null || img.size/1024 > 2048){
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
        setTimeout(() => {
            const postProductData = async () => {
                try {
                    const response = await axiosInstanceImageJWT.post('/api/myproducts/',formData)
                    return response
                } catch (error) {
                    throw error
                }
            }
            const data = postProductData()
            data.then(data=>{
                if(data.status===201){
                    setSuccess(true)
                    props.setIndex(6)
                    setTimeout(() => {
                        props.setActive("Manage Items")
                        props.setHead("Manage Items")
                        props.setTail(`Manage Items`)
                    }, 3000);
                }else{
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
                        setMessage("Unexpected error with status code: ", err.response.status);
                        setClicked(false)
                    }
                } else {
                    setMessage("No response received from the server.");
                    setClicked(false)
                }
            })
        }, 2000);
        
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

            <section className={`${styles.SellItemsSection} `}>

                    <div className={styles.formArea}>
                        <h1 className="text-2xl p-3">
                            List A Product
                        </h1>
                        <hr />


                        <div className={`${styles.TitleCategory} p-5`}>
                            <div className="ListTitle">
                                <div className='text-2xl'>
                                    Title 
                                </div>
                                <input onChange={e=>setTitle(e.target.value)} id='ListProductTitle' type="text" placeholder="Product Title" className="input input-bordered rounded-none w-full max-w-xl" />
                            </div>

                            <div className="ListCategory">
                                <div className='text-2xl'>
                                    Category
                                </div>
                                <select onChange={e=>setCategory(e.target.value)} defaultValue={"disabled"} className="select select-bordered rounded-none  w-full max-w-xl">
                                    <option value="disabled" disabled>Category</option>
                                    {data.length > 0 &&data[0].map(category=>{
                                        return (<option key={category.id} value={category.id}>{category.title}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        <label className='text-2xl p-5'>
                            Product Description
                        </label>
                        <div className="ListProductsDescription p-5 flex grow">
                            <textarea onChange={e=>setDescription(e.target.value)}  placeholder="Product Description" className="textarea textarea-bordered textarea-lg w-full h-[180px]" ></textarea>
                        </div>
                        <div className={`${styles.InventoryCondition} p-5`}>
                            <div className="ListInventory">
                                <div className='text-2xl'>
                                    Inventory
                                </div>
                                <input onChange={e=>setInventory(parseFloat(e.target.value).toFixed(0))} id='ListProductInventory' type="number" placeholder="How many products you want to list?" className="input input-bordered rounded-none w-full max-w-xl"/>
                                
                            </div>

                            <div className="ListCondition">
                                <div className='text-2xl'>
                                    Condition
                                </div>
                                <select onChange={e=>setCondition(e.target.value)} defaultValue={"none"} className="select select-bordered rounded-none  w-full max-w-xl">
                                    <option value={"none"} disabled>Choose Products Condition</option>
                                    <option value={"BRAND NEW"}>Brand New</option>
                                    <option value={"USED"}>Used</option>
                                    <option value={"DEFECT"}>Defect</option>
                                    <option value={"CHECK DESCRIPTION"}>Check Description</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.ListProductsImageArea}`}>
                        <h1 className="text-2xl p-5">
                            Product Image
                        </h1>
                        <hr />
                        <div className={`${styles.ListProductImage} p-5`}>
                            <div className={styles.ImgWrapper}>
                                <img src={productImg} alt="product-image" />
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
                                <input onChange={e=>setPrice(parseFloat(e.target.value).toFixed(2))} id='price' type="number" placeholder="Product Price" className="input input-bordered rounded-none w-full"/>
                                <div onClick={handleClick} className="btn btn-success ml-5 min-w-[200px]">{clicked?<span className="loading loading-dots loading-md"></span>:"List Product"}</div>
                            </div>
                        </div>
                    </div>
                     {success?<ProductSuccess success ={success} /> :"" }
            </section>
        </>
    )
};

export default Sellitems


const ProductSuccess = (props)=>{
    
    return(
        <>
            <div className={` ${styles.blurryBackgroundSection} ${styles.blurryBackground} ${props.success?'':"hidden"}` }>
                <div className={`${styles.ModalArea}`}>
                    <div className='text-center text-2xl font-bold'>
                        Product listed successfully.
                    </div>
                    <br />
                    <div className='text-sm font-light text-primary p-5 text-center'>
                            You will be redirected to the product section.
                    </div>
                </div>
            </div>
        </>
    )
}