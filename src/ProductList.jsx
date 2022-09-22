import React from "react";
import { useState, useEffect } from "react";

export default function ProductList() {
 const [product, setProduct] = useState("")
 const [dataLoaded, setDataLoaded] = useState(false)

 async function fetchData() {
  const response = await fetch("http://localhost:8080/contact-form/src/api/products.php")
  const responseData = await response.json()
  setProduct(responseData)
  if(response.ok) {
    setDataLoaded(true)
  }
 }

 useEffect(() => {
   fetchData()
 

 }, [])
 

 console.log(product)



  return (
    <div>
        <h1>Product List</h1>

    </div>
  )
}
