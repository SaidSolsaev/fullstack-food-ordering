import React from 'react'
import useFetch from '../../hooks/useFetch'
import "./PopularFoodsProduct.css"
import pic from "../../assets/images/exampleItem.jpg"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function PopularFoodsProduct({categoryId}) {
    const { dispatch} = useCart();

    var url = "/product";

    if (categoryId){
        url = "/product/getByCategory/" + categoryId;
    }
    
    const {data, loading} = useFetch(url)
    
    const addToCart = (item) => {
        dispatch({type: 'ADD_TO_CART', payload: item})
    }
    
    
    return (
        <>
    
        {loading ? (
            <LoadingSpinner />
        ): (
            <>
                {data?.map((item) => (
                    <div key={item._id} className='productCard'>
                        <div className='pCard_item'>
                            <div className='pCard_img'>
                            <Link to={`/product/${item._id}`}>
                                <img alt='item' src={pic}/>
                            </Link>

                            </div>

                            <div className='pCard_content'>
                                <h3>{item.title}</h3>
                                <div className='pCard_price'>
                                    <p>{item.price}$</p>
                                    {/* Remember to add function for adding to cart! */}
                                    <button onClick={() => addToCart({item})}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
            
        )}
        </>
    )
}
