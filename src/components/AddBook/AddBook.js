import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AddBook.css';

const AddBook = () => {

  const [imageUrl, setImageUrl] = useState([null]);

  const { register, handleSubmit } = useForm();
  const onSubmit = data =>{
    data.image = imageUrl;
    fetch('https://thawing-ridge-35915.herokuapp.com/addBook', {
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        window.location.reload(false);
      }
    })

  }
  const handleImageUpload = (e)=>{
    const imageData = new FormData();
    imageData.set('key', '2cdca9c5794e6c006907401073db37d6')
    imageData.append('image', e.target.files[0])
    axios.post('https://api.imgbb.com/1/upload',imageData)
    .then(res=>setImageUrl(res.data.data.display_url))
    .catch(err=>console.log(err));
    
  }
  return (
    <div className="container-fluid">
      <h4 className="text-center p-3">Add Book</h4> 
      <div className="p-3 bg-light rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Book Name</label>
          <input {...register("name")} className="ml-1" placeholder="book name.." required /> <br />
          <label>Author</label>
          <input {...register("writer")} className="ml-1" placeholder="book author.." required /><br />
          <label>Price</label>
          <input {...register("price")} className="ml-1" placeholder="book price.." required /><br />
          <label>Photo</label>
          <input onChange={handleImageUpload} className="ml-1" type="file" required /> <br />
          <input className= "btn btn-success m-1" type="submit" />
        </form>
      </div>   
    </div>
  );
};

export default AddBook;