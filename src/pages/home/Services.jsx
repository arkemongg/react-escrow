import styles from './styles/Services.module.css'
import secure from './assets/secure.png'
import quality from './assets/quality.png'
import fees from './assets/fees.png'
import support from './assets/customer-service.png'

const Services = () => {
    return (
        <>
            <section className={`${styles.ServicesSection}`}>
                
                <div className={styles.servicesArea}>
                    <div className={`${styles.SecurePayment}`}>
                        <img src={secure} alt="secure" />
                        <div className="text-2xl">
                            Secure Payment
                        </div>
                        <p className="text-sm text-center w-[250px] p-5">
                            Deposit money securely with crypto payments.
                        </p>
                    </div>
                    <div className={`${styles.SecurePayment}`}>
                        <img src={quality} alt="quality" />
                        <div className="text-2xl">
                            Quality Products
                        </div>
                        <p className="text-sm text-center w-[250px] p-5">
                            Thousands of quality products are listed by our sellers.
                        </p>
                    </div>
                    <div className={`${styles.SecurePayment}`}>
                        <img src={fees} alt="fees" />
                        <div className="text-2xl">
                            Lowest Escrow Fees
                        </div>
                        <p className="text-sm text-center w-[250px] p-5">
                            Lowest Escrow Fees on the market.
                            As low as 4.5%
                        </p>
                    </div>
                    <div className={`${styles.SecurePayment}`}>
                        <img src={support} alt="support" />
                        <div className="text-2xl">
                            Customer Support
                        </div>
                        <p className="text-sm text-center w-[250px] p-5">
                            24/7 Customer Support
                        </p>
                    </div>
                </div>

            </section>
        </>
    )
};

export default Services;