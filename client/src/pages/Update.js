import React, { useState } from 'react'
import { Books } from './Books';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export const Update = () => {
  const[book,setBook]=useState({
    title:"",
    desc:"",
    price:null,
    cover:""
  });

  const navigate= useNavigate()
  const location= useLocation()

  const bookId = location.pathname.split("/")[2]
    

  const handleChange=(e)=>{
    setBook((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const handleClick= async e =>{
    e.preventDefault();
    try{
      await axios.put("http://localhost:8080/books/"+bookId,book)
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }
  console.log(book);
  return (
    <div className='form'>
      <h1>Update the Book</h1>
      <input type='text' placeholder='title'onChange = {handleChange} name="title"/>
      <input type='text' placeholder='desc'onChange = {handleChange}name="desc"/>
      <input type='number' placeholder='price'onChange = {handleChange}name="price"/>
      <input type='text' placeholder='cover'onChange = {handleChange}name="cover"/>
       <button className='btn' onClick={handleClick}>Update</button>
    </div>
  )
}
