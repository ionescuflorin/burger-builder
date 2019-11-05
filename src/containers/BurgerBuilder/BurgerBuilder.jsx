import React from 'react';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render() {
        return (
           <React.Fragment>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls />
           </React.Fragment>
        );
    }
}

export default BurgerBuilder;