import { memo, useState } from 'react';
import styles from './styles/Sellitems.module.css'

const Sellitems = (props) => {
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
                                <input id='ListProductTitle' type="text" placeholder="Product Title" className="input input-bordered rounded-none w-full max-w-xl" />
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
                                    Inventory
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
                                <input id='price' type="text" placeholder="Product Price" className="input input-bordered rounded-none w-full"/>
                                <div className="btn btn-success ml-5">Save Product</div>
                            </div>
                        </div>
                    </div>
                        
            </section>
        </>
    )
};

export default Sellitems