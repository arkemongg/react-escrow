
import { PageLocation } from "./GlobalTemplates/PageLocation";
import Services from "./home/Services";

import Subscribe from "./home/Subscribe";
import { LoadingProductsCard } from "./home/templates/ProductCards";
import AllProducts from "./products/AllProducts";
const Products = ()=>{
    return (
        <>
            <PageLocation head={"Products"} tail={"Home / Products"}/>

            <AllProducts />
            
            <Services />
            <Subscribe />
        </>
    )

}

export default Products