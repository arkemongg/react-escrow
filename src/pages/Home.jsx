import Featured from "./home/Featured";
import HomeSearch from "./home/HomeSearch";
import NewProducts from "./home/NewestProducts";

const Home = () => {
    return (
      <>
      <HomeSearch />
      <Featured />
      <NewProducts />
      </>
    );
  };
  
  export default Home;