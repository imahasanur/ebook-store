import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ManageBook.css";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ManageBook = () => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(()=>{
    fetch('https://thawing-ridge-35915.herokuapp.com/showAllBooks')
    .then(res => res.json())
    .then(data => setAllBooks(data));

  },[]);

  const deleteBook = ( id)=>{
    fetch(`https://thawing-ridge-35915.herokuapp.com/deleteBook/${id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(result => {
      if(result){
        window.location.reload(false);
      }
    })

  }
  return (
    <div>
      <h4 className="">Manage  Books</h4>
      <h5>Total Books:{allBooks?.length}</h5>   
      <div className="table-responsive p-2">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            { allBooks.map(book => {
              return (
                <tr>
                <td>{book.name}</td>
                <td>{book.writer}</td>
                <td>{book.price}</td>
                <td onClick={()=>deleteBook(book._id)}> <FontAwesomeIcon icon={faTrash}/> Delete</td>

              </tr>
              )
            })
            }
          </tbody>
        </table>
      </div> 
    </div>
  );
};

export default ManageBook;