import Counts from "./home/Counts";
import Featured from "./home/Featured";
import HomeSearch from "./home/HomeSearch";
import HowToBuy from "./home/HowToBuy";
import NewProducts from "./home/NewestProducts";
import Services from "./home/Services";

const Home = () => {
    return (
      <>
      <HomeSearch />
      <Featured />
      <NewProducts />
      <Services />
      <Counts />
      <HowToBuy />
      </>
    );
  };
  
  export default Home;