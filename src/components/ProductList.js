import React from 'react'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [])

  function getProducts() {
  axios.get('http://127.0.0.1/my_projects/react-php-200922/react-php/api/product')
  .then(function(response) {
    console.log(response);
    setProducts(response.data);
    })
}
  
  const deleteProduct = (id) => {
    axios.delete(`http://127.0.0.1/my_projects/react-php-200922/react-php/api/${id}/delete`).then(function(response){
      console.log(response.data);
      getProducts();
    })

  }
  
  return (
    <div className='list__container'>
      <h2>Product List</h2>
    
    {products.map((product, key) => (
      <ul key={key}>
        <input type="checkbox" />
        <li>{product.title}</li>
        <li>{product.sku}</li>
        <li>{product.price}</li>
        <Link to={`${product.id}/edit`}>Edit Product</Link>
        <button onClick={() => deleteProduct(product.id)}>Delete</button>
          
        
      </ul>
 )
    )}

    </div>
  )
}
