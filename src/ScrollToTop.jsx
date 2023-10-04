import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;

    // const loading = document.querySelector('.loading-effect')
    // loading.classList.toggle('invisible')
    // const t = setTimeout(() => {
    //   loading.classList.toggle('invisible')
    // }, 2000);

    // return () => {
    //   clearTimeout(t); // Clean up the timeout when the component unmounts or the effect re-runs
    // };