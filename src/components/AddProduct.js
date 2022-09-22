import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [inputs, setInputs]= useState([])
  const navigate = useNavigate();


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value})); //destr. so it creates only 1 obj
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1/my_projects/react-php-200922/react-php/api/product/add', inputs).then(function(response){
      console.log(response.data);
      navigate('/');
    });     
  }




  return (
    <div className="form__container">
      <h3>Product Add</h3>

        <form onSubmit={handleSubmit}>

        <label>SKU:</label>
        <input type="text" name="sku" onChange={handleChange} />
        <br /> <br />
       
        <label>Title:</label>
        <input type="text" name="title" onChange={handleChange} />
        <br /> <br />

        <label>Price:</label>
        <input type="text" name="price" onChange={handleChange} />
        <br /> <br />

        <button>Save</button>
        <button>Cancel</button>
        </form>  
    </div>)
}
