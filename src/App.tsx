import { useState } from "react";
import { useQuery } from "react-query";

//components
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



const getProducts = async () => {
  await (await fetch('https://fakestoreapi.com/products')).json();         //doubles await because fetching from api, and converting to JSON are both asynchronous
}

const App = () => {
  return (
    <div className="App">
      TEST
    </div>
  );
}

export default App;
