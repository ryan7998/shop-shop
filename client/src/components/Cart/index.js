import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';

// import global store:
import {useStoreContext} from '../../utils/GlobalState';
import {TOGGLE_CART, ADD_MULTIPLE_TO_CART} from '../../utils/actions';
import {idbPromise} from "../../utils/helpers";

const Cart = () =>{
    const [state, dispatch] = useStoreContext();
    
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

    if(!state.cartOpen){
        return(
            <div className="cart-closed" onClick={toggleCart}>
                <span
                    role="img" aria-label="trash">
                    🛒
                </span>
            </div>
        );
    }
    console.log(state);
    return(
        <div className="cart">
            <div className="close"
                onClick={toggleCart}           
            >[close]</div>
            
            <h2>Shopping Cart</h2>
            {state.cart.length ?(
                <div>
                    {/* <CartItem item={{name:'Camera', image:'camera.jpg', price:5, purchaseQuantity:3}} />
                    <CartItem item={{name:'Soap', image:'soap.jpg', price:6, purchaseQuantity:4 }} /> */}

                    {state.cart.map(item =>(
                        <CartItem key={item._id} item={item} />
                    ))}

                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ?
                            <button>
                                Checkout
                            </button>
                            :
                            <span>(Log in to check out</span>
                        }
                    </div>
                </div>
            ):(
                <h3>
                    <span role="img" aria-label="schocked">
                        😱
                    </span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;