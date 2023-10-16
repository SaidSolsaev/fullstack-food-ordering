import React from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';

export default function ProductPage() {
    
    const location = useLocation();
    const productId = location.pathname.split("/")[2];

    const {data} = useFetch(`/product/${productId}`);
    
    // move to a componente
    var categoryId = data.category;
     
    const category = useFetch(`/categories/${categoryId}`).data;
    
    var sameProds = category.products;

    return (

        <section>
            <div className='container'>
                <div className='row'>
                    <div className='left-side'>
                        image
                    </div>

                    <div className="right-side">
                        <div className='product-info'>
                            <h1>{data.title}</h1>
                            <p>{data.desc}</p>
                            <h4>{data.price}$</h4>

                            <h3>Category: {category.name}</h3>
                        </div>
                    </div>
                </div>
                
                
                {/* move to another component */}
                {/* <h2>You may also like</h2>
                <div className=''>

                    {sameProds?.map((item, i) => (
                        <h2 key={i}>{item}</h2>
                    ))}
                </div> */}
            </div>
        </section>
    )
}
