import React, {useEffect} from "react";
import {UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/helpers';
import { Button, Header } from 'semantic-ui-react';

function CategoryMenu() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  
  useEffect(()=>{
    // if categoryData exists or has changed from the response of useQuery,
    // then run dispatch()
    if(categoryData){
      // execute our dispatch function with action object
      // indicating the type of action and the data to set our state
      // for categories to 
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if(!loading){
      idbPromise('categories', 'get').then(categories =>{
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, dispatch])

  const handleClick = id =>{
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      {/* <Header as='h3'>Choose a Category:</Header> */}
      <Button.Group>
        {categories.map((item, i) => (
          <>
            <Button color="olive" key={item._id} 
              onClick={() => {
                handleClick(item._id);
              }}>
              {item.name}
            </Button>
            {(i<4) && <Button.Or />}
          </>
        ))}
      </Button.Group>
    </div>
  );
}

export default CategoryMenu;
