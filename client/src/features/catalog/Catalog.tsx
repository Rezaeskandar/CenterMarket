import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog() {
  // here we are getting list of products from catalogSlice
 const products = useAppSelector(productSelectors.selectAll)
 // using loading from redux statte 
 const {productsLoaded,status} = useAppSelector(state => state.catalog);
 // usnig of createAsyncThumk
 const dispatch = useAppDispatch();
  

  useEffect(() => {
    if(!productsLoaded)dispatch(fetchProductsAsync());
  }, [productsLoaded,dispatch]);

  if(status.includes('pending')) return <LoadingComponent message=" Loading Products..."/>
  
  return (
    <>
      <ProductList products={products}/>
      </>
  );
}
