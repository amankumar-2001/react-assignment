import React, { useState } from 'react'
import CartPizza from '../Components/CartPizza';
import Swal from "sweetalert2";

function Cartscreen() {
    const [pizza, setPizza] = useState(JSON.parse(localStorage.getItem('bagPizza')));
    
    function handleDecrease(changeCount) {

        const newList = pizza.map((pizza) => {
            if (pizza === changeCount) {
                pizza.count = pizza.count - 1;
                if (pizza.count < 0)
                    pizza.count = 0;
            }

            return pizza;
        })

        setPizza(newList);
        window.localStorage.setItem("bagPizza", JSON.stringify(pizza));
    }

    function handleIncrease(changeCount) {
        const newList = pizza.map((pizza) => {
            if (pizza === changeCount) {
                pizza.count = pizza.count + 1;
            }

            return pizza;
        })

        setPizza(newList);
        window.localStorage.setItem("bagPizza", JSON.stringify(pizza));
    }
    function handlePayment() {
        Swal.fire("Payment Successfully")
    }

    return (
        <div className="m-5 bs">
            <div className="row d-flex justify-content-center mt-5">
                {pizza ? (
                    pizza.map((pizza, id) => {
                        return <div className="col-md-9 mt-4" key={id}>
                            <CartPizza pizzaData={pizza} key="id" />
                            <div className='container bs d-flex col align-items-center m-2'>
                                <button className='btn text-white h-2' onClick={() => handleDecrease(pizza)}>-</button>
                                <b><div className='textright'>Quantity: {pizza.count}</div></b>
                                <div className='container d-flex col justify-content-between align-items-center'>
                                    <button className='btn text-white h-2' onClick={() => handleIncrease(pizza)}>+</button>
                                    <b><div className='textright'>Price: {pizza.price * pizza.count}</div></b>
                                </div>
                            </div>
                        </div>;
                    })
                ) : (
                    <div className='container d-flex justify-content-around'>
                        <b><p>Oops! No Item</p></b>
                    </div>
                )}
                <div className='container d-flex justify-content-between align-items-center' style={{ width: "30%" }}>
                    <button className='btn text-white' onClick={handlePayment} style={{ width: "100%" }}>Pay Now</button>
                </div>
            </div>
        </div>
    )
}

export default Cartscreen
