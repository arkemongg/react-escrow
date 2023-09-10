import Featured from "./home/Featured";
import HomeSearch from "./home/HomeSearch";
import NewProducts from "./home/NewestProducts";
import Services from "./home/Services";

const Home = () => {
    return (
      <>
      <HomeSearch />
      <Featured />
      <NewProducts />
      <Services />
      </>
    );
  };
  
  export default Home;