import styles from './styles/Subscribe.module.css'


const Subscribe = () => {
    return (
        <>
            <section className={`${styles.SubscribeSection}`}>
                <h1 className="text-6xl text-center text-white pt-20">SUBSCRIBE</h1>
                <p className="text-2xl text-white text-center w-[90%] m-auto p-10">
                    Subscribe to get the latest updates and offer information. Don't worry, we won't send spam!
                </p>
                <div className={`${styles.SubscribeArea}`}>
                    <input type="text" className="input w-[350px]" />
                    <button className='btn btn-primary ml-5'>Subscribe</button>
                </div>
            </section>
            <hr />
        </>
    )
};

export default Subscribe;