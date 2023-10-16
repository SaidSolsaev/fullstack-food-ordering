import React, { useState } from 'react'
import "./PopularFoods.css";
import useFetch from "./../../hooks/useFetch.js"
import PopularFoodsProduct from '../PopularFoodsProduct/PopularFoodsProduct';


export default function PopularFoods() {
    const [categoryId, setCategoryId] = useState(null);
    const [activeBtn, setActiveBtn] = useState("0");

    const activeClass = 'pFoods active';
    const inactiveClass = 'pFoods';

    const {data} = useFetch("/categories?limit=6");
    
    const handleActiveBtn = (buttonId) => {
        
        setActiveBtn(buttonId);
    }

    const handleClick = (catId) => {
        handleActiveBtn(catId);
        setCategoryId(catId);
    }

    const handleAllButton = () => {
        setCategoryId(null);
        handleActiveBtn("0");
    }

    return (
        <section className='popFoodsSect'>
            <div className='container'>
                <div className="row">
                    <div className="popularTitle">
                        <h2>Popular Foods</h2>
                    </div>

                    <div className="categoryContainer">
                        <div className="btnContainer">
                            <button className={"0" === activeBtn ? activeClass : inactiveClass} onClick={handleAllButton}>All</button>
                            {data?.map((item) => (
                                <button 
                                className={item._id === activeBtn ? activeClass : inactiveClass} 
                                key={item._id}
                                onClick={() => handleClick(item._id)}>
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <PopularFoodsProduct categoryId={categoryId}/>
                </div>
            </div>
        </section>
    )
}
