import React from 'react';

import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends React.Component {
    render() {
        return (
           <React.Fragment>
               <Burger />
               <div>Build Control</div>
           </React.Fragment>
        );
    }
}

export default BurgerBuilder;