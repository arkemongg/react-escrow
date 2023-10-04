import styles from './styles/HowToBuy.module.css'
import down from './assets/down.png'
import happy from './assets/happyface.png'

const HowToBuy = () => {
    return (
        <>
            <section className={`${styles.HowToBuySection}`}>
                <div className="step-area flex justify-center">
                    <div className="bg-info p-2 rounded-full px-10 m-5 text-white">Step 1 </div>
                </div>
                <div className={styles.HowToBuyArea}>
                    <div className={styles.LeftArea}>
                        <h1 className="text-4xl">Choose Your Product</h1>
                        <br /><br />
                        <p className="text-xl">
                            Choose your proucts from the marketplace.
                            Click on the product to go to the products 
                            details page.
                        </p>
                    </div>
                    <div className={styles.RightArea}>
                       
                       <img src={"/homeassets/choose.png"} alt="" />
                        
                    </div>
                </div>

                <div className={`${styles.downArea} flex justify-center mr-2 pb-10`}>
                    <img className='w-[20px]' src={down} alt="down" />
                </div>

                <div className="step-area flex justify-center">
                    <div className="bg-primary p-2 rounded-full px-10 m-5 text-white">Step 2 </div>
                </div>
                <div className={styles.HowToBuyAreaTwo}>
                    <div className={styles.LeftArea}>
                        <h1 className="text-4xl">Select Quantity</h1>
                        <br /><br />
                        <p className="text-xl">
                            Choose your quantity.
                            Click on the buy button to create an order. 
                        </p>

                    </div>
                    <div className={styles.RightArea}>
                       
                       <img src={"/homeassets/quantity.png"} alt="qty" />
                        
                    </div>
                </div>

                <div className={`${styles.downArea} flex justify-center mr-1 pb-10`}>
                    <img className='w-[20px]' src={down} alt="down" />
                </div>

                <div className="step-area flex justify-center">
                    <div className="bg-success p-2 rounded-full px-10 m-5 text-white">Step 3 </div>
                </div>
                <div className={styles.HowToBuyArea}>
                    <div className={styles.LeftArea}>
                        <h1 className="text-4xl">Order Successfully Created</h1>
                        <br /><br />
                        <p className="text-xl">
                            Your order is successfull.
                            You can release your fund via escrow anytime after you 
                            received your product.
                        </p>
                    </div>
                    <div className={styles.RightArea}>
                       
                       <img src={"/homeassets/success.png"} alt="success" />
                        
                    </div>
                </div>
                <div className={`${styles.downArea} flex justify-center mr-1 pb-10`}>
                    <img className='w-[100px]' src={happy} alt="down" />
                </div>
            </section>
            <hr />
        </>
    )
};

export default HowToBuy;