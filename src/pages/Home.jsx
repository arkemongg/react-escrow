import Counts from "./home/Counts";
import Featured from "./home/Featured";
import HomeSearch from "./home/HomeSearch";
import HowToBuy from "./home/HowToBuy";
import NewProducts from "./home/NewestProducts";
import Services from "./home/Services";
import JoinUs from "./home/JoinUs";
import Subscribe from "./home/Subscribe";
import { memo } from "react";

const Home = () => {
    return (
      <>
      <HomeSearch />
      <Featured />
      <NewProducts />
      <Services />
      <Counts />
      <HowToBuy />
      <JoinUs />
      <Subscribe/>
      </>
    );
  };
  
  export default Home;