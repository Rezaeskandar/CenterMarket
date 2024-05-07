import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

function ProductDtails() {
  const { basket,status } = useAppSelector(state=> state.basket);
  const dispatch = useAppDispatch();
  const {id} = useParams<{ id:any }>();
  const product = useAppSelector(state => productSelectors.selectById(state,id));
  const {status: productStatus} = useAppSelector(state => state.catalog)
  const [quantity, setQuantity] = useState(0);
  
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
   if(!product && id) dispatch(fetchProductAsync(parseInt(id)))
  }, [id, item,dispatch,product]);

  // handel the textField input
  function handelInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  // add to the busket button
  function handelUppdateCard() {
   
    if (!item || quantity > item.quantity) {
      const uppdatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({productId: product?.id!,quantity: uppdatedQuantity}))
    } else {
      const uppdatedQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({productId: product?.id!,quantity: uppdatedQuantity}))
    }
  }

  return (
    <>
      {productStatus.includes('pending') ? (
        <LoadingComponent message="Loading product..." />
      ) : !product ? (
        <NotFound />
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img
              src={product.pictureUrl}
              alt={product.name}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{ mb: 2 }}></Divider>
            <Typography variant="h3" color="secondary">
              ${(product.price / 100).toFixed(2)}
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{product.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>{product.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Quantity in stock</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container spacing={2}>
              <Grid xs={6} marginTop={2}>
                <TextField
                  onChange={handelInputChange}
                  variant="outlined"
                  type="number"
                  label=" Quantity in Card"
                  fullWidth
                  value={quantity}
                />
              </Grid>
              <Grid item xs={6}>
                <LoadingButton
                disabled={item?.quantity === quantity || (!item && quantity === 0)}
                  loading={status.includes('pending')}
                  onClick={handelUppdateCard}
                  sx={{ height: "55px" }}
                  color="primary"
                  size="large"
                  variant="contained"
                  fullWidth
                >
                  {item ? "Upadate Quantity" : "Add to Card"}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductDtails;

