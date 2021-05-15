import React from "react";
import { Link } from "react-router-dom";
import { pluralize, idbPromise } from "../../utils/helpers"

import {useSelector, useDispatch} from 'react-redux';
import {ADD_TO_CART, UPDATE_CART_QUANTITY} from '../../utils/actions';
import CartItem from "../CartItem";
import { Card, Icon, Image, Button } from 'semantic-ui-react'

function ProductItem(item) {
  
  const state = useSelector(state=>state);
  const dispatch = useDispatch();
  const {cart} = state;

  const addToCart = () =>{
  
    //find the cart item with the matrching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    //if there was a match, call update with a new purchase quantity
    if(itemInCart){
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    }else{
      dispatch({
        type: ADD_TO_CART,
        product:{...item, purchaseQuantity: 1}
      });
      idbPromise('cart', 'put', {...item, purchaseQuantity: 1});
    }
  };

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  return (
      <Card>
        <Link to={`/products/${_id}`}><Image src={`/images/${image}`} wrapped ui={false} /></Link>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Description>${price}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='shopping basket' />
            {quantity} {pluralize("item", quantity)} in stock
          </a>
        </Card.Content>
        <Button color="olive" onClick={addToCart}>
          Add to cart
        </Button>
      </Card>

    // <div className="card px-1 py-1">
    //   <Link to={`/products/${_id}`}>
    //     <img
    //       alt={name}
    //       src={`/images/${image}`}
    //     />
    //     <p>{name}</p>
    //   </Link>
    //   <div>
    //     <div>{quantity} {pluralize("item", quantity)} in stock</div>
    //     <span>${price}</span>
    //   </div>
    //   <button onClick={addToCart}>Add to cart</button>
    // </div>
  );
}

export default ProductItem;
