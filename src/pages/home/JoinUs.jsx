import { Link } from 'react-router-dom';
import styles from './styles/JoinUs.module.css'


const JoinUs = () => {
    return (
        <>
            <section className={`${styles.JoinUsSection}`}>
                <div className={`${styles.JoinUsArea}`}>

                    <div className={`${styles.BecomeBuyer} flex flex-col justify-center items-center`}>
                        <h1 className="text-3xl p-10">Join Us As A Buyer</h1>
                        <p className="w-[350px] text-center">

                        Are you on the hunt for the best deals,
                        high-quality products, 
                        and a seamless shopping experience? 
                        Look no further! Join our dynamic community of buyers and unlock a world of opportunities.

                        </p>
                        <Link to={"/register"} className='btn btn-success text-white m-10'>Become a Buyer</Link>
                    </div>

                    <div className="BecomeSeller flex flex-col justify-center items-center">
                        <h1 className="text-3xl p-10">Join Us As A Seller</h1>
                        <p className="w-[350px] text-center">
                            Ready to embark on a journey of growth and success? Sign up now and be a part of a community that supports your entrepreneurial spirit. Don't miss out on the incredible opportunities awaiting you!
                         </p>
                        <Link to={"/register"} className='btn btn-primary m-10'>Become a Seller</Link>
                    </div>
                </div>
            </section>
            <hr />
        </>
    )
};

export default JoinUs ;