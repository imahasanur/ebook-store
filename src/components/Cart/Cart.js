import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import {useParams} from "react-router-dom";
import { UserContext } from '../../App';
import { addToDatabaseCart, getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Cart = () => {
  let {bookId} = useParams();
  const[loggedInUser, setLoggedInUser] =useContext(UserContext);
  const [book, setBook] = useState({});
  const [cart, setCart] = useState([]);
  const [orderedBooks, setOrderedBooks] = useState([]);
  const [finalOrder, setFinalOrder] = useState([]);
  useEffect(()=>{
    fetch(`https://thawing-ridge-35915.herokuapp.com/book/${bookId}`)
    .then(res => res.json())
    .then(data => setBook(data));
  },[bookId])


  useEffect(()=>{
    addToDatabaseCart(book.image, 1);
    const chosenBooks = getDatabaseCart();
    const getChosenBooks = Object.keys(chosenBooks);
    setOrderedBooks(chosenBooks);
    fetch('https://thawing-ridge-35915.herokuapp.com/getBooks', {
      method: 'POST',
      headers:{
        'content-Type': 'application/json'
     },
      body: JSON.stringify(getChosenBooks)
    })
    .then(res => res.json())
    .then(data => {
      return setCart(data);
    });

  }, [book?.name]);

  useEffect(()=>{
    
    let newBookings = cart.map( book => {
      const {_id:key, name, writer, price, image} = book;
      const newBook = {key, name, writer, price, image}
      newBook.email = loggedInUser.email;
      const books = Object.entries(orderedBooks)
      const count = books.filter( book => book[0] === image)
      newBook.quantity = count[0][1] ;
      newBook.date = new Date();
      return newBook;
    })
    setFinalOrder(newBookings);
  },[cart])

  let total = 0;
  if(finalOrder.length > 0){
    total = finalOrder.reduce((sum, book)=>{
      return sum + (book.price * book.quantity);
    },0)
  }

  const handleOrder = ()=>{
    console.log("final Ordr",finalOrder)
    fetch('https://thawing-ridge-35915.herokuapp.com/addBookOrders', {
    method:'POST',
    headers:{
      'content-Type': 'application/json'
    },
    body: JSON.stringify(finalOrder)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        setFinalOrder([]);
      }
    })
  }
  return (
    <div>
      <h2>CheckOut</h2> 
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          { finalOrder.map(book => {
            return (
              <tr>
              <td>{book.name}</td>
              <td>{book.quantity}</td>
              <td>{book.price * book.quantity}</td>
            </tr>
            )
          })
          }
          {
            <tr>
              <td>Total:</td>
              <td></td>
              <td>{total}</td>
            </tr>
          }

        </tbody>
        <button 
            className="btn btn-primary m-3 "
            onClick={handleOrder}>
            CheckOut
        </button>

      </table>
    </div>
  );
};

export default Cart;