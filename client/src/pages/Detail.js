import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS 
} from "../utils/actions";
import { idbPromise } from "../utils/helpers";

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'
import Cart from "../components/Cart";
import CartItem from "../components/CartItem";
import { Container, Divider, Button, Icon } from 'semantic-ui-react'

function Detail() {
  // create state and dispatch from redux:
  const state = useSelector(state=>state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  // const products = data?.products || [];
  const {products, cart} = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    }
    // retrieved from server
    else if(data){
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb:
    else if(!loading){
      idbPromise('products', 'get').then((indexedProducts)=>{
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        });
      });
    }
  }, [products, data, dispatch, id]);

  const addToCart = () =>{
    
    const itemInCart = cart.find((CartItem)=> CartItem._id === id);
    
    if(itemInCart){
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    }else{

      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity:1 }
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', {...currentProduct, purchaseQuantity: 1});
    }
  };

  const removeFromCart = () =>{
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });
    // upon removal from cart, delete the item from IndexedDB using the 'currentProduct._id' to locate what to remove
    idbPromise('cart', 'delete', {...currentProduct});
  };

  return (
    <>
      {currentProduct ? (
        <Container textAlign='center' style={{padding:"5em"}}>
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
          </p>
          <p>
            <Button size='huge' color="green" animated='vertical'>
              <Button.Content hidden onClick={addToCart}>Add</Button.Content>
              <Button.Content visible>
                <Icon name='shop' />
              </Button.Content>
            </Button>

            <Button size='huge' color="red" animated='vertical' 
              disabled={!cart.find(p=>p._id === currentProduct._id)}
            >
              <Button.Content hidden onClick={removeFromCart}>Remove</Button.Content>
              <Button.Content visible>
                <Icon name='remove' />
              </Button.Content>
            </Button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </Container>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
