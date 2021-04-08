import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
  const[loggedInUser, setLoggedInUser] = useContext(UserContext);
  const[viewOrders, setViewOrders] = useState([]);

  useEffect(()=>{
    fetch(`https://thawing-ridge-35915.herokuapp.com/showOrders?email=${loggedInUser.email}`)
    .then(res => res.json())
    .then(data => setViewOrders(data));
  },[])
  let totalPrice = 0;

  if(viewOrders?.length > 0){
    totalPrice = viewOrders?.reduce((sum, book) =>{
      return sum + (book.price * book.quantity)
    }, 0)
  }

  return (
    <div>
      <h2 className="text-center m-4">Orders Summary Of</h2> 
      <h2  className="text-center m-4">{loggedInUser.displayName}</h2>
      <h4 className=" m-3">Total Order:{viewOrders?.length || 0}</h4>
      <div className="table-responsive p-2">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">View</th>
              <th scope="col">Ordered At</th>

            </tr>
          </thead>
          <tbody>
            { viewOrders.map(book => {
              return (
                <tr>
                <td>{book.name}</td>
                <td>{book.writer}</td>
                <td>{book.quantity}</td>
                <td>{book.price * book.quantity}</td>
                <td><img src={book.image} className=" " style={{height:'80px', width:'100px'}} alt={book.name} /></td>
                <td>{book.date}</td>

              </tr>
              )
            })
            }
          <tr>
            <td>Total ::</td>
            <td></td>
            <td></td>
            <td>{totalPrice || 0}$</td>
            <td></td>
            <td></td>
          </tr>

          </tbody>
        </table>
      </div>
    
    </div>
  );
};

export default Orders;