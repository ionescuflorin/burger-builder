import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios/axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }


    componentDidMount () {
        axios.get('/orders.json')
        .then(res => {
            const fetchOrders = []
            // turn the obj into an arr
            for (let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({loading: false, orders: fetchOrders})
        })
        .catch(err => {
            this.setState({loading: false})
        })
    }


    render() {
        return (
            <div>
            {this.state.orders.map(order => (
               <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
           ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);