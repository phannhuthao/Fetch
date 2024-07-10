// import { useEffect, useState } from 'react'
// import './App.css'
// import { creatNewPost, deletePost, getAllPosts } from './service'
// import {getAllProduct} from './component/Session57/bt2'
// import {createProduct } from './component/Session57/bt5'



// function App() {

//   // const [data, setdata] = useState
 
//   // Fetch là gì ? : dùng để gửi request và nhận response trả về từ các API 

//   // hàm fetch(); trả về 1 Promise -> dùng cơ chế .then , .catch để xứ lý , kết async await để
  
//   // useEffect(()=> {
//   //   // Call API
//   //   const data = getAllPosts();
//   //   console.log(data)
//   //   data.then((data)=> {
//   //     console.log(data)
//   //   }).catch(err => {
//   //     console.log("err",err);
//   //   })

//   //     // Call post
//   //     const datas = {
//   //       "userId": 2,
//   //       "title": "Hạ",
//   //       "body": "Vô tri"
//   //     }
//   //   creatNewPost(datas).then(datas => {
//   //     console.log("new dât", datas)
//   //   })
//   // })

  



//   return (
//     <>
//     </>
//   )
// }

// export default App



import React, { useState, useEffect } from 'react';
import {getAllProduct} from './component/Session57/bt2'
import { createProduct } from './component/Session57/bt5';




function ProductManagement() {
  const [product, setProduct] = useState({ name: '', price: 0 });
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
      const fetchProducts = async () => {
          const data = await getAllProduct();
          setProducts(data);
      };

      fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({
          ...prevProduct,
          [name]: name === 'price' ? parseFloat(value) : value,
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const newProduct = await createProduct(product);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setProduct({ name: '', price: 0 }); // Reset the form after submission
  };

  return (
      <div>
          <h1>Product Management</h1>
          <div>
              <h2>Add Product</h2>
              <form onSubmit={handleSubmit}>
                  <div>
                      <label>Name:</label>
                      <input
                          type="text"
                          name="name"
                          value={product.name}
                          onChange={handleChange}
                      />
                  </div>
                  <div>
                      <label>Price:</label>
                      <input
                          type="number"
                          name="price"
                          value={product.price}
                          onChange={handleChange}
                      />
                  </div>
                  <button type="submit">Add Product</button>
              </form>
          </div>
          <div>
              <h2>Product List</h2>
              <ul>
                  {products.map((product) => (
                      <li key={product.id}>{product.name}</li>
                  ))}
              </ul>
          </div>
      </div>
  );
}

export default ProductManagement;























