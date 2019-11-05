// ref1
const transformedingredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  });
//  ... 
//  Object.keys(props.ingredients) is [salad, bacon, cheese, meat]. 
//  props.ingredients[igKey] is the number of the current ingredient (singular).
//  So 5 slices of cheese is 5. 
 
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 
//  ...Array(props.ingredients[igKey]) is 5 undefined array items, 
//  if there are 5 slices of cheese (the current burger ingredient item),
//  then,  there are 5 array items,  but,  not inside an array (yet). 
 
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 
//  The ... (spread operator) has stripped them (5 undefineds) out of Array(). 
//  [...Array(props.ingredients[igKey])] 
//  Now,  the 5 undefined array items,  are inside a new array.
 
//  Above:  Note,  ...Array(props.ingredients[igKey]) 
//  is now placed inside [ ]. 
//  So now,  the result is  [...Array(5)]   or   [ , , , , ]  
 
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 
//  [...Array(props.ingredients[igKey])].map((_, index) => { ... 
//  is the same as  ... 
//  [ , , , , ].map((_, index) => { .... 
 
//  Now,  the (first/outer) map() is being addressed.
//   _ reminds us that we are iterating through 5 undefined array items. 
//  _ is the current array item that's being processed.
//  This current array item's value is "undefined". 
 
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 
//  The (above) purpose:  To dynamically determine,
 
//  the number of each ingredient (cheese),
 
//  the user added to their burger. 
 
//  The (second/inner) map() iterates for each empty array item.
 
//  That's all this array is used for (nothing more). 
 
//  So,  when map() gets to cheese,
 
//  it will iterate 5 times (5 undefined array items). 
 
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 
//  This (above) number will determine how many
 
//  <Ingredient ... />s (of each ingredient type)
 
//  are drawn to the GUI. 
 
//  <Ingredient key={igKey + index} type={igKey} /> 
 
//  is the same as ... 
 
//  <Ingredient key={"cheese2"} type={"cheese"} /> 
 
//  5 images of cheese are drawn to the GUI. 
 
//  Note:  key={cheese2} 
 
//  A key can be any configuration of string characters,
 
//  as long as it's unique. 
 
//  unique: meaning,  compared to any other JSX created DOM element. 
 
//  ------------------------------------------------------------- 
 
//  ... are we essentially "filling" the empty placeholders ?
 
//  No (see above or ask me to further explain).
 
//  ==================================
 
//  ADDITIONAL  INFORMATION:
 
//  Mr. Schwarzmüller flattens the
 
//  transformedIngredients multidimensional array
 
//  so the if statement's transformedIngredients.length === 0
 
//  can properly (individually) count all included
 
//  array items (burger ingredients).
 
//  ===================================
//  ADDITIONAL  INFORMATION:
//  https://itnext.io/heres-why-mapping-a-constructed-array-doesn-t-work-in-javascript-f1195138615a

// REFACTORING ABOVE EXAMPLE
// 1.

// In some places using good old ES5 some and every might turn the code in something that can be read almost like normal English text, e.g.:



// Original (BurgerBuilder.js):

// const sum = Object.keys(ingredients)
//     .map(igKey => {
//         return ingredients[igKey];
//     })
//     .reduce((sum, el) => {
//         return sum + el;
//     }, 0);
// return sum > 0;
// Refactored:

// return Object.values(ingredients).some(amount => amount > 0);
// ... saying: "Return whether there is some (= at least one) ingredient with an amount greater than 0.



// Original (ContactData.js and Auth.js):

// let formIsValid = true;
// for (let inputIdentifier in updatedOrderForm) {
//     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
// }
// Refactored:

// const formIsValid = Object.values(updatedOrderForm).every(input => input.valid);
// ... saying: "To check whether the form is valid check whether every input is valid."



// ========================================================================================================================

// 2.

// There are multiple places where Object.entries could be useful, which transforms an object ...

// {'a': 1, 'b': 2, 'c': 3}

// ... into an array of entries:

// [['a', 1], ['b', 2], ['c', 3]].

// Such an entries array can then be further processed using array destructuring and the object property shorthand syntax.



// Original (Order.js):

// const ingredients = [];
// for (let ingredientName in props.ingredients) {
//     ingredients.push(
//         {
//             name: ingredientName,
//             amount: props.ingredients[ingredientName]
//         }
//     );
// }
// Refactored:

// const ingredients = Object.entries(props.ingredients).map(([name, amount]) => ({name, amount}));


// Original (ContactData.js and Auth.js):

// const formElementsArray = [];
// for (let key in this.state.controls) {
//     formElementsArray.push({
//         id: key,
//         config: this.state.controls[key]
//     });
// }
// Refactored:

// const formElementsArray = Object.entries(this.state.controls).map(([id, config]) => ({id, config}));


// Original (actions/order.js):

// const fetchedOrders = [];
// for ( let key in res.data ) {
//     fetchedOrders.push( {
//         ...res.data[key],
//         id: key
//     } );
// }
// Refactored:

// const fetchedOrders = Object.entries(res.data).map(([id, data]) => ({...data, id}));


// ========================================================================================================================

// 3.

// There are other cases where it might be better not to use a one-liner, even though it would be possible:



// Original (ContactData.js):

// const formData = {};
// for (let formElementIdentifier in this.state.orderForm) {
//       formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
// }
// Alternative (not recommended):

// const formData = Object.entries(this.state.orderForm).reduce((data, [name, item]) => ({...data, [name]: item.value}), {});


// Original (BurgerBuilder.js):

// const disabledInfo = {
//     ...this.props.ings
// };
// for (let key in disabledInfo) {
//     disabledInfo[key] = disabledInfo[key] <= 0
// }
// Alternative (not recommended):

// const disabledInfo = this.props.ings ? Object.entries(this.props.ings).reduce((ings, [name, amount]) => ({...ings, [name]: amount <= 0}), {}) : {};


// ========================================================================================================================

// 4.

// And there is one situation where I'd even go the opposite way, using the old school approach with nested for...in/for loops. From my point of view this seems to be easier to understand than the course code version:



// Original (Burger.js):

// let transformedIngredients = Object.keys(props.ingredients)
//     .map(igKey => {
//         return [...Array(props.ingredients[igKey])].map((_, i) => {
//             return <BurgerIngredient key={igKey + i} type={igKey} />;
//         });
//     })
//     .reduce((arr, el) => {
//         return arr.concat(el)
//     }, []);
// Refactored:

// let transformedIngredients = [];
 
// for (let key in props.ingredients) {
//     for (let i = 0; i < props.ingredients[key]; i++) {
//         transformedIngredients.push(<BurgerIngredient key={key + i} type={key} />);
//     }
// }