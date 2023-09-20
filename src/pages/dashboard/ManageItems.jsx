import { memo, useState } from 'react';
import { LoadingProductsCard, Product } from './MyProducts/MyProductCards'
import styles from './styles/ManageItems.module.css'


const ManageItems = ()=>{
    const [data,setData] = useState(null)
    return (
        <>
            <div className={styles.ManageItemsSection}>
                <MyProducts setData = {setData}/>
                {data!==null?<Edititems data = {data} />:""}
            </div>
        </>
    )
}


const MyProducts = (props)=>{
    return (
        <div className={styles.MyProductsArea}>
            <h1 className='text-2xl p-5'>My Products</h1>
            <hr />
            <div className={`${styles.searchArea} p-5`}>
                    <input type="text" placeholder="Type here" className={`max-w-[550px] ${styles.searchInput} input rounded-none input-bordered`} />
                    <button className={`max-w-[150px] ml-5 ${styles.homeSearchBtn} btn btn-primary`}>Search</button>
            </div>
            <div className={styles.MyProducts}>
                {Array.from({ length: 6 }, (_, index) => <Product key={index} setData = {props.setData} index= {index} />)}
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
    const data = props.data[0]
    const [productImg,setProductImg] = useState("/dashboardassets/d.jpg")
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
    
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
            <section id="editItemsSection" className={`${styles.EditItemsSection} `}>

                    <div className={styles.formArea}>
                        <h1 className="text-2xl p-3">
                           Edit Product  
                        </h1>
                        <hr />


                        <div className={`${styles.TitleCategory} p-5`}>
                            <div className="ListTitle">
                                <div className='text-2xl'>
                                    Title 
                                </div>
                                <input value={data.title} id='ListProductTitle' type="text" placeholder="Product Title" className="input input-bordered rounded-none w-full max-w-xl" />
                            </div>

                            <div className="ListCategory">
                                <div className='text-2xl'>
                                    Category
                                </div>
                                <select className="select select-bordered rounded-none  w-full max-w-xl">
                                    <option disabled selected>Who shot first?</option>
                                    <option>Han Solo</option>
                                    <option>Greedo</option>
                                </select>
                            </div>
                        </div>
                        <label className='text-2xl p-5'>
                        Product Description
                        </label>
                        <div className="ListProductsDescription p-5 flex grow">
                            <textarea placeholder="Product Description" className="textarea textarea-bordered textarea-lg w-full h-[180px]" ></textarea>
                        </div>
                        <div className={`${styles.InventoryCondition} p-5`}>
                            <div className="ListInventory">
                                <div className='text-2xl'>
                                    Inventory <span className='text-sm font-light'>(Set 0 to Unpublish)</span>
                                </div>
                                <input id='ListProductInventory' type="text" placeholder="How many products you want to list?" className="input input-bordered rounded-none w-full max-w-xl"/>
                                
                            </div>

                            <div className="ListCondition">
                                <div className='text-2xl'>
                                    Condition
                                </div>
                                <select className="select select-bordered rounded-none  w-full max-w-xl">
                                    <option disabled selected>Choose Products Condition</option>
                                    <option>Brand New</option>
                                    <option>Used</option>
                                    <option>Deffect</option>
                                    <option>Check Description</option>
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
                                <input id='price' type="text" placeholder="Procut Price" className="input input-bordered rounded-none w-full"/>
                                <div className="btn btn-success ml-5">Save Product</div>
                            </div>
                        </div>
                    </div>
                        
            </section>
        </>
    )
};

