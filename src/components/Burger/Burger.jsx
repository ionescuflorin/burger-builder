import React from 'react';
import { withRouter } from 'react-router-dom'
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  // transform the ingredients object in an array so we can use map function
  // Object.keys - extracts the keys of a given obj and turns that in an array (the values 1122 are not part of the array)
  // see ref1
  let transformedingredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  }) // here if we have 0 for all ingredients it will be returned different empty arrays so we can't check if it's empty or not
.reduce((arr, el) => {
    return arr.concat(el) // now we have an array that can be either empty or having ingredients
}, []);

if (transformedingredients.length === 0) {
    transformedingredients = <p>Please start adding ingredients</p>
}

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
