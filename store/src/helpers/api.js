import axios from 'axios'

export async function getProducts(){
    const response = await axios.get('https://fakestoreapi.com/products')
    const {data} = response
    return data;
}