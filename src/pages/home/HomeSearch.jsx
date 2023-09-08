import styles from './styles/HomeSearch.module.css'

const HomeSearch = () => {
    return (
        <>
            <section className={`${styles.homeSearchSection} flex flex-col justify-center items-center`}>
                <div className="text-4xl lg:text-6xl xl:text-8xl mb-10 text-center text-white  mx-auto max-w-[960px]">
                    Buy your desired product through ESCROW
                </div>
                <div className={`${styles.searchArea} xl:pb-[250px]`}>
                    <input type="text" placeholder="Type here" className="input" />
                    <button className="btn btn-primary">Search</button>
                </div>
            </section>
        </>
    )
  };
  
  export default HomeSearch;