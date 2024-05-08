import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParamas } from "../../app/models/Product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParamas;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParamas){
    const params =new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy.toString());
    if(productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if(productParams.brands) params.append('brands', productParams.brands.toString());
    if(productParams.types) params.append('types', productParams.types.toString());
    return params;
}

// fetching the products
export const fetchProductsAsync =createAsyncThunk<Product[],void, {state:RootState}>(
    'catalog/fetchProductsAsync',
    async (_,thunkAPI) =>{
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams)
        try{
            return await agent.Catalog.list(params);
        }catch(error:any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
) 

// getting filters from api 
export const fetchFilters =createAsyncThunk(
    //Type prifix
    'catalog/fetchFilters',
    async (_,thunkAPI) =>{
        try{
            // gettting data from agent 
            return await agent.Catalog.fetchFilters();
        }catch(error:any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

// fetching the product
export const fetchProductAsync =createAsyncThunk<Product,number>(
    'catalog/fetchProductAsync',
    async (productId,thunkAPI) =>{
        try{
            return await agent.Catalog.details(productId);
        }catch(error:any){
         return thunkAPI.rejectWithValue({error: error.data})
        }
    }
) 

function initParams(){
  return{
    pageNumber: 1,
    pageSize: 6,
    orderBy:'name'
  }
}

// createing catalog slice 
export const catalogSlice= createSlice(
    {
        name: 'catalog',
        initialState: productsAdapter.getInitialState<CatalogState>({
            productsLoaded:false,
            filtersLoaded: false,
            status: 'idle',
            brands: [],
            types: [],
            productParams: initParams()
        }),
        reducers:{
            setProductParams: (state, action) =>{
                state.productsLoaded =false;
                state.productParams ={...state.productParams, ...action.payload}
            },
            //resets product parameters what is was before 
            resetProductParams:(state) => {
                state.productParams = initParams();
            }
        },
        // extrareducer is is used for to do somthing withe product when we getting them back 
        extraReducers: (builder => {
            builder.addCase(fetchProductsAsync.pending, (state)=>{
                state.status ='pendingFetchProducts';
            });

            builder.addCase(fetchProductsAsync.fulfilled, (state,action)=>{
                productsAdapter.setAll(state,action.payload);
                state.status = 'idle';
                state.productsLoaded = true;
            });

            builder.addCase(fetchProductsAsync.rejected, (state,action)=>{
                console.log(action);
                state.status ='idle';
            });

            builder.addCase(fetchProductAsync.pending, (state)=>{
                state.status ='pendingFetchProduct';
            });

            builder.addCase(fetchProductAsync.fulfilled, (state,action)=>{
                productsAdapter.upsertOne(state,action.payload);
                state.status = 'idle';
            });

            builder.addCase(fetchProductAsync.rejected, (state,action)=>{
                console.log(action)
                state.status ='idle'; 
            });
            
            // cases to filters 
            builder.addCase(fetchFilters.pending, (state)=>{
                state.status ='pendingFetchFilters';
            });

            builder.addCase(fetchFilters.fulfilled, (state,action)=>{
                state.brands = action.payload.brands;
                state.types = action.payload.types;
                state.filtersLoaded =true;
                state.status = 'idle';
            });

            builder.addCase(fetchFilters.rejected, (state,action)=>{
                state.status ='idle'; 
                console.log(action.payload);
            });
        })

    }
)

// using of productSelectors to get data from the store 
export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog); 

export const {setProductParams , resetProductParams} =catalogSlice.actions;