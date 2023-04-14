import React, { useEffect, useState } from "react";
import axios from "axios";
import Pizza from "../Components/Pizza";
import 'antd/dist/antd.min.css';
import Loader from "../Components/Loader";
import Form from 'react-bootstrap/Form';

function Homescreen() {

  const [pizzas, setpizzas] = useState([])
  const [loading, setloading] = useState([])

  const [dublicatepizzas, setdublicatepizzas] = useState([])
  const [searchkey, setsearchkey] = useState()
  const [type, settype] = useState('all')
  
  const getData = async () => {
    try {
      setloading(true)
      const data = (await axios.get('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68')).data;

      setpizzas(data);
      setdublicatepizzas(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }
  
  useEffect(() => {
    getData();
  }, [])

  function filterBySearch(){
    const temppizzas = dublicatepizzas.filter(pizza=>pizza.name.toLowerCase().includes(searchkey.toLowerCase()))

    setpizzas(temppizzas);
  }

  function filterByType(e) {
    settype(e);
    if(e==='Veg')
    {
      const temppizzas = dublicatepizzas.filter((pizza) =>{
        return pizza.isVeg===true;   
      })
      setpizzas(temppizzas);
    }
    else if(e==="Non-Veg"){
      const temppizzas = dublicatepizzas.filter((pizza) => {
        return pizza.isVeg === false;
      })
      setpizzas(temppizzas);
    }   
    else{
      setpizzas(dublicatepizzas);
    }
  }

  function handleSortPrice() {
    const temppizzas = [...pizzas];
    temppizzas.sort(function (a, b) {
      var x = a.price,y = b.price;
      
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    setpizzas(temppizzas);
  }

  function handleSortRating() {   
    let temppizzas = [...pizzas];  
    temppizzas.sort(function (a, b) {
      var x = a.rating, y = b.rating;

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    setpizzas(temppizzas);
  }

  return (
    <div className="container mt-3">
      <div className="row bs filter d-flex justify-content-around">
        <div className="col-md-3 d-flex align-items-center">
          <input type='text' className='form-control' placeholder='Search pizzas' value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}}
          onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3 d-flex align-items-center">
          <Form.Select aria-label="Default select example" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
            <option value='all'>All</option>
            <option value='Veg'>Veg</option>
            <option value='Non-Veg'>Non-Veg</option>
          </Form.Select>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <button className="btn text-white" onClick={handleSortPrice}>Sort By Price</button>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <button className="btn text-white" onClick={handleSortRating}>Sort By Rating</button>
        </div>
      </div> 
      <div className="row d-flex bs justify-content-center mt-5">
        {pizzas && <div className="container d-flec justify-content-center"><b>Menu:</b></div>}
        {loading ? (
          <div className="container d-flex justify-content-center">
             <Loader /> 
          </div>
        ) : (
          pizzas.map((pizza,i) => {
            return <div className="col-md-9 mt-4" key={i}>  
              <Pizza pizzaData={pizza} key="i" />
            </div>;
          })
        )}
      </div>
    </div>
  )
}

export default Homescreen
