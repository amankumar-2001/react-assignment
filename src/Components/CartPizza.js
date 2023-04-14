import React from 'react'
import "./pizza.css";

function CartPizza(params) {
    return (
        <div className='container row'>
            <div className='col-md-4'>
                <img src={params.pizzaData.img_url} className='smallimg' alt="" />
            </div>
            <div className='col-md-8 text-left'>
                <h1 className='hsize textleft'>{params.pizzaData.name}</h1>
                <b>
                    <p className='textleft'>Type: {params.pizzaData.isVeg ? `Veg` : `Non-Veg`}</p>
                    <p className='textleft'>Rating: {params.pizzaData.rating}/5</p>
                    <p className='textleft'>Size: {params.pizzaData.size}</p>
                    <p className='textleft'>Topping: {params.pizzaData.topping}</p>
                </b>
            </div>
        </div>
    )
}

export default CartPizza
