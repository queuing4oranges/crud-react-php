import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([])

  const {id} = useParams();  //gets id for url below

  useEffect(() => {
    getProduct();
  }, [])

    function getProduct() { 
      axios.get(`http://127.0.0.1/my_projects/react-php-200922/react-php/api/${id}`).then(function(response){
        console.log(response.data);
        setInputs(response.data);
        })
    }
    

    const handleChange = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.put(`http://127.0.0.1/my_projects/react-php-200922/react-php/api/${id}/edit`, inputs).then(function(response){
      console.log(response.data);
      navigate('/');
    }); 
    }

  return (
    <div><h3>Edit Product</h3>

        <form onSubmit={handleSubmit}>
          {/* pre-populating inputs: value={inputs.sku} */}

        <label>SKU:</label>
        <input value={inputs.sku} type="text" name="sku" onChange={handleChange} />
        <br /> <br />
       
        <label>Title:</label>
        <input value={inputs.title} type="text" name="title" onChange={handleChange} />
        <br /> <br />

        <label>Price:</label>
        <input value={inputs.price} type="text" name="price" onChange={handleChange} />
        <br /> <br />

        <button>Save</button>
        <button>Cancel</button>
        </form> 
    </div>
  )
}
