// import { useEffect, useState } from 'react';
// import './App.css';
// import { createdNewPost, deletePost, getAllPosts, editPost } from './service/axios';
// import 'bootstrap/dist/css/bootstrap.min.css';


// type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// function App() {
//   const [data, setData] = useState<Post[]>([]);
//   const [editTitle, setEditTitle] = useState<string>("");
//   const [editBody, setEditBody] = useState<string>("");

//   useEffect(() => {
//     getAllPosts()
//       .then(data => setData(data))
//       .catch(err => console.log(err));

//     createdNewPost({ title: "Hạ đi ăn kem", body: "Đi chơi sở thú" })
//       .then(d => {
//         // nhận được data vừa thêm mới
//         setData(prevData => [...prevData, d]);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const handleDelete = async (id: number) => {
//     try {
//       await deletePost(id);
//       setData(prevData => prevData.filter(post => post.id !== id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleEdit = async (id: number) => {
//     const updatedPost = { title: editTitle, body: editBody };
//     try {
//       const updatedData = await editPost(id, updatedPost);
//       setData(prevData => prevData.map(post => (post.id === id ? updatedData : post)));
//     } catch (err) {
//       console.log(err);
//     }
//   };



//   return (
//     <>
//       <ul>
//         {data.map((d) => (
//           <li key={d.id}>
//             {d.title} - {d.body}
//             <button onClick={() => handleDelete(d.id)}>Delete</button>
//             <button onClick={() => handleEdit(d.id)}>Edit</button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         placeholder="Edit title"
//         value={editTitle}
//         onChange={(e) => setEditTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Edit body"
//         value={editBody}
//         onChange={(e) => setEditBody(e.target.value)}
//       />
//     </>
//   );
// }

// export default App;




// import React, { useState, useEffect } from 'react';
// import {getAllProduct} from './component/Session57/bt2'
// import { createProduct } from './component/Session57/bt5';




// function ProductManagement() {
//   const [product, setProduct] = useState({ name: '', price: 0 });
//   const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//       const fetchProducts = async () => {
//           const data = await getAllProduct();
//           setProducts(data);
//       };

//       fetchProducts();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setProduct((prevProduct) => ({
//           ...prevProduct,
//           [name]: name === 'price' ? parseFloat(value) : value,
//       }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       const newProduct = await createProduct(product);
//       setProducts((prevProducts) => [...prevProducts, newProduct]);
//       setProduct({ name: '', price: 0 }); // Reset the form after submission
//   };

//   return (
//       <div>
//           <h1>Product Management</h1>
//           <div>
//               <h2>Add Product</h2>
//               <form onSubmit={handleSubmit}>
//                   <div>
//                       <label>Name:</label>
//                       <input
//                           type="text"
//                           name="name"
//                           value={product.name}
//                           onChange={handleChange}
//                       />
//                   </div>
//                   <div>
//                       <label>Price:</label>
//                       <input
//                           type="number"
//                           name="price"
//                           value={product.price}
//                           onChange={handleChange}
//                       />
//                   </div>
//                   <button type="submit">Add Product</button>
//               </form>
//           </div>
//           <div>
//               <h2>Product List</h2>
//               <ul>
//                   {products.map((product) => (
//                       <li key={product.id}>{product.name}</li>
//                   ))}
//               </ul>
//           </div>
//       </div>
//   );
// }

// export default ProductManagement;

import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { act_decrement_n, act_increment_n } from './store/action';


// create slice: vừa tạo reducder và tạo action
import { createSlice } from '@reduxjs/toolkit';

export const countSlice = createSlice({
  name: 'count',
  initialState: 0,
  reducers: {
    increment(state) {
      return state + 100;
    },
    decrement(state) {
      return state - 100;
    }
  }
});


export const { increment, decrement } = countSlice.actions;


function App() {

  // lấy state của store 
  // const count = store.getState(); // ko khuyến khích
  // function component có hook
  const state = useSelector<{ count: number }>(state => state) // trả về 1 state gốc


  const dispatch = useDispatch();
  useEffect(() => {
    // gửi action lên 
    // const action = act_decrement_n(10);
    dispatch(act_increment_n(100));
   },
[])

  return (
    <>
      {/* <div className='container mt-3'>
        <p>{state?.count}</p>
        <button onClick={() => dispatch(act_increment_n(5))}> click</button>
      </div> */}
    </>
  )
}

export default App




















