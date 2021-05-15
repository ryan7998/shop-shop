import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

const Home = () => {

  return (
    <div className="container" style={{padding:"5em"}}>
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
