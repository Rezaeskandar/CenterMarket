import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogSlice";
import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/api/components/RadioButtonGroup";
import CheckboxButtons from "../../app/api/components/CheckboxButtons";

const sortOptions =[
  {value: 'name', lable: 'Alphabetical'},
  {value: 'priceDesc', lable: 'price - High to low'},
  {value: 'price', lable: 'price - Low to high'}
]

export default function Catalog() {
  // here we are getting list of products from catalogSlice
  const products = useAppSelector(productSelectors.selectAll);
  // using loading from redux statte
  const { productsLoaded, status, filtersLoaded , brands, types,productParams} = useAppSelector(
    (state) => state.catalog
  );
  // usnig of createAsyncThumk
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message=" Loading Products..." />;

  return (
    <Grid container spacing ={4}>
      {/* search box */}
      <Grid item xs= {3}>
        <Paper sx ={{mb: 2}}>
          <ProductSearch/>
        </Paper> 

        {/* sort by Alphabetical, name , price  */}
        <Paper sx= {{mb:2 ,p:2}}>
            <RadioButtonGroup selectedValue={productParams.orderBy} 
            options={sortOptions} 
            onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}/>
        </Paper>

        {/*checkBox filter brnads */}
        <Paper sx= {{mb:2 ,p:2}}>
          <CheckboxButtons 
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
          />
        </Paper>

        {/* filter by types */}
        <Paper sx= {{mb:2 ,p:2}}>
          <CheckboxButtons 
              items={types}
              checked={productParams.types}
              onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
            />
        </Paper>
      </Grid>
      <Grid item xs= {9}>
        <ProductList products={products} />   
      </Grid>

       {/* pagination */}
       <Grid item xs= {3}/>
        <Grid item xs= {9}>
            <Box display='flex' justifyContent='space-between' alignItems='center' >
                <Typography>
                  Displaying 1-6 of 29 items
                </Typography>
                <Pagination
                color="primary"
                size="large"
                count ={10}
                page={2}
                />
            </Box>
            </Grid>
    </Grid>
  );
}
