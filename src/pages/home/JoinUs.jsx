import styles from './styles/JoinUs.module.css'


const JoinUs = () => {
    return (
        <>
            <section className={`${styles.JoinUsSection}`}>
                <div className={`${styles.JoinUsArea}`}>

                    <div className={`${styles.BecomeBuyer} flex flex-col justify-center items-center`}>
                        <h1 className="text-3xl p-10">Join Us As A Buyer</h1>
                        <p className="w-[350px] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo eaque deserunt temporibus laborum beatae enim a veniam ab mollitia quae ratione, iure, quisquam quas. Delectus soluta tempore magni quos.</p>
                        <button className='btn btn-success text-white m-10'>Become a Buyer</button>
                    </div>

                    <div className="BecomeSeller flex flex-col justify-center items-center">
                        <h1 className="text-3xl p-10">Join Us As A Seller</h1>
                        <p className="w-[350px] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo eaque deserunt temporibus laborum beatae enim a veniam ab mollitia quae ratione, iure, quisquam quas. Delectus soluta tempore magni quos.</p>
                        <button className='btn btn-primary m-10'>Become a Seller</button>
                    </div>
                </div>
            </section>
            <hr />
        </>
    )
};

export default JoinUs ;