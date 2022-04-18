import { useState } from "react";
import { useQuery } from "react-query";

//components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import { Drawer, LinearProgress, Badge, Grid } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

//Styles
import { Wrapper, StyledButton } from "./App.styles";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

  console.log("data>>", data);

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((accum: number, item) => accum + item.amount, 0);   //iterates over CartItemType and returns sum of items in cart, while defaulting to 0

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      //check if item is already in the cart
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      //if item is already in cart, increase amount of item displayed in cart by +1
      if (isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item
        );
      }
    
      // first time the item is added
      return [...prev, {...clickedItem, amount: 1}];

  });
};

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
            cartItems={cartItems} 
            addToCart={handleAddToCart} 
            removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
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
