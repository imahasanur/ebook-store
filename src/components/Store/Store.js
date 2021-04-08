import React, { useEffect, useState } from 'react';
import fakeData from '../../FakeData/fakeData';
import Book from '../Book/Book';

const Store = () => {
  const [books, setBooks] = useState([])
  const [spinner, setSpinner] = useState(true)

  useEffect(()=>{
    fetch("https://thawing-ridge-35915.herokuapp.com/books")
    .then(res => res.json())
    .then(data => {
      setBooks(data)
      setSpinner(false)
    } )
  },[])

//   to load all products from fakeData
//   const addProducts = ()=>{
//     fetch('http://localhost:4000/addBooks', {
//         method:'POST',
//         headers:{
//           'content-Type': 'application/json'
//         },
//         body: JSON.stringify(fakeData)
//       })
//   }
//   addProducts();
  return (
    <div className="store container-fluid">
      <div className="row">
        <div className=" justify-content-center form-group form-inline ">
          <input type="text" name="" id="" className="form-control mt-2 " placeholder="search .."/>
          <button className="btn btn-primary mt-2">Search</button>
        </div>
      </div> 
      <div className="books row g-2 mt-2 container-fluid">
        {
          books.map( book => <Book book={book}></Book>)
        }
      </div>
      <div className="text-center mt-2">
        {spinner === true && <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>
        }
      </div>
      
    </div>
  );
};

export default Store;