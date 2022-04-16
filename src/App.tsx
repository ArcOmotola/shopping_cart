import { useState } from "react";
import { useQuery } from "react-query";

//components
import Item from "./Item/Item";
import { Drawer, LinearProgress, Badge, Grid } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

//Styles
import { Wrapper } from "./App.styles";

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}



const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();         //doubles await because fetching from api, and converting to JSON are both asynchronous


const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

  console.log("data>>", data);

  const getTotalItems = () => null;

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
