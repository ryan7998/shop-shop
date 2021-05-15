import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import {useLazyQuery} from '@apollo/react-hooks';

import { useSelector, useDispatch } from 'react-redux';
import {TOGGLE_CART, ADD_MULTIPLE_TO_CART} from '../../utils/actions';
import {idbPromise} from "../../utils/helpers";
import {QUERY_CHECKOUT} from '../../utils/queries';
import {loadStripe} from '@stripe/stripe-js';
import {Button, Icon} from 'semantic-ui-react';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () =>{
    
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [getCheckout, {data}] = useLazyQuery(QUERY_CHECKOUT);
    
    // check if there's anything in the state's cart property on load
    useEffect(()=>{
        async function getCart(){
            const cart = await idbPromise('cart', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_CART,
                products: [...cart]
            });
        };
        if(!state.cart.length){
            getCart();
        }
    }, [state.cart.length, dispatch]);

    // watch for changes to data
    useEffect(()=>{
        if(data){
            stripePromise.then((res)=>{
                res.redirectToCheckout({sessionId:data.checkout.session});
            });
        }
    }, [data]);

    function toggleCart(){
        dispatch({type: TOGGLE_CART});
    }

    function calculateTotal(){
        let sum = 0;
        state.cart.forEach(item =>{
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout(){
        const productIds = [];
        state.cart.forEach((item)=>{
            for (let i=0; i<item.purchaseQuantity; i++){
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables:{products: productIds}
        });
    }

    if(!state.cartOpen){
        return(
            <div className="cart-closed" onClick={toggleCart}>
                <Icon name="shop" />
            </div>
        );
    }
    // console.log(state);
    return(
        <div className="cart" style={{padding:"2em"}}>
            <Button circular icon='close' size="large" onClick={toggleCart} className="closeBtn" color="red"/>
            <h2>Shopping Cart</h2>
            {state.cart.length ?(
                <div>
                    {state.cart.map(item =>(
                        <CartItem key={item._id} item={item} />
                    ))}

                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ?
                            <Button circular color='green' icon='shop'  onClick={submitCheckout} content={'Checkout'}/>
                            :
                            <span>(Log in to check out</span>
                        }
                    </div>
                </div>
            ):(
                <h3>
                    {/* <span role="img" aria-label="schocked">
                        😱
                    </span> */}
                    <Icon name="zip"/>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;