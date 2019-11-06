import axios from 'axios'

// Instance for main url
const instance = axios.create({
    baseURL: 'https://react-my-burger-15937.firebaseio.com/'
})

export default instance;