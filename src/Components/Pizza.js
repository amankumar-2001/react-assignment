import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import "./pizza.css";

function Pizza(params) {
    const [size, setSize] = useState([]);
    const [topping, setTopping] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [selectedTopping, setSelectedTopping] = useState([]);
    const [show, setShow] = useState(false);

    const handleOrder = () => {
        let pizza = JSON.parse(localStorage.getItem('bagPizza'));

        const newItem = params.pizzaData;
        newItem['size'] = selectedSize;
        newItem['topping'] = selectedTopping;
        newItem['count'] = 1;
        
        console.log(newItem);
        if (pizza) {
            pizza = [...pizza, newItem];
        }
        else {
            pizza = [newItem];
        }

        window.localStorage.setItem("bagPizza", JSON.stringify(pizza));
        setShow(false)
    };

    const handleShow = () => setShow(true);

    function selectSize(obj) {
        let temp = [];
        for (let items in obj) {
            temp.push(obj[items].size);
        }
        setSize(temp);
    }

    function selectTopping(obj) {
        let temp = [];
        for (let items in obj) {
            temp.push(obj[items].name);
        }
        setTopping(temp);
    }

    useEffect(() => {
        selectSize(params.pizzaData.size[0].items);
        selectTopping(params.pizzaData.toppings[0].items);
    }, []);

    return (
        <div className='row bs'>
            <div className='col-md-4'>
                <img src={params.pizzaData.img_url} className='smallimg' alt="" />
            </div>
            <div className='col-md-8  text-left'>
                <h1 className='hsize textleft'>{params.pizzaData.name}</h1>
                <b>
                    <p className='textleft'>Type: {params.pizzaData.isVeg ? `Veg` : `Non-Veg`}</p>
                    <p className='textleft'>Price: {params.pizzaData.price}</p>
                    <p className='textleft'>Rating: {params.pizzaData.rating}/5</p>
                </b>
                <div className='btnClass'>
                    <button className='btn-primary btn' type="" onClick={handleShow}>Add</button>
                </div>
            </div>

            <Modal show={show} onHide={handleOrder} size='lg'>
                <Modal.Header>
                    <Modal.Title>{params.pizzaData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 bigimg"
                                src={params.pizzaData.img_url}
                                alt="First slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <p><b>Description: </b>{params.pizzaData.description}</p>
                    <div className='container d-flex row'>
                        <b>Size: </b>
                        <div className='container d-flex row bg-secondary text-white'>
                            {
                                size.map((size, i) => {
                                    return <div className='container d-flex col align-items-center m-1' key={i}>
                                        <input type="radio" id={size} name="size" value={size} onChange={(e) => setSelectedSize(e.target.value)} />
                                        <label for={size}>{size}</label>
                                    </div>
                                })
                            }
                        </div>
                        <b>Toppings: </b>
                        <div className='container d-flex row bg-secondary text-white'>
                            {
                                topping.map((topping, i) => {
                                    return <div className='container d-flex col align-items-center m-1' key={i}>
                                        <input type="radio" id={topping} name="topping" value={topping} onChange={(e) => setSelectedTopping(e.target.value)} />
                                        <label for={topping}>{topping}</label>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleOrder}>
                        Add item
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default Pizza
