import React, {createContext, useContext} from "react";
import {useProductReducer} from './reducers';

// instantiate a new Context object
const StoreContext = createContext();
const {Provider} = StoreContext;

const StoreProvider = ({value = [], ...props})=>{
    // update the initial state to include cart properties,
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });

    // use this to confirm it works!
    // console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
}

const useStoreContext = () =>{
    return useContext(StoreContext);
}

export {StoreProvider, useStoreContext};