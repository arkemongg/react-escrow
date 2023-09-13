import styles from './styles/HomeSearch.module.css'

const HomeSearch = () => {
    return (
        <>
            <section className={`${styles.homeSearchSection} flex flex-col justify-center items-center`}>
                <div className="text-4xl lg:text-6xl mb-10 xl:mt-20 text-center text-white  mx-auto max-w-[960px]">
                    Buy your desired product through ESCROW
                </div>
                <div className="text-white text-center text-2xl pb-5">
                    Escrow solution in palm of your hands.
                </div>
                <div className={`${styles.searchArea}`}>
                    <input type="text" placeholder="Type here" className={`${styles.searchInput} input rounded-none input-bordered`} />
                    <select className={`select rounded-none select-bordered ${styles.select}`} defaultValue="disabled" >
                        <option value="disabled" disabled>Large</option>
                        <option value="largeApple">Large Apple</option>
                        <option value="largeOrange">Large Orange</option>
                        <option value="largeTomato">Large Tomato</option>
                    </select>
                    <button className={`${styles.homeSearchBtn} btn btn-primary`}>Search</button>
                </div>
            </section>
        </>
    )
  };
  
  export default HomeSearch;