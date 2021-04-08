import React from 'react';
import { Link } from 'react-router-dom';

const Book = (props) => {
  console.log("book ",props);
  const{ _id, name, price, image, writer} = props.book;

  return (
    <div className=" col-8 col-sm-5 col-md-4 p-3">
        <div className="card"  >
            <img src={image} className="card-img-top p-3 img-fluid" alt={name} />
            <div className="card-body">
                <h4>{name}</h4>
                <p className="card-text">{writer}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <h3>${price}</h3>
                <Link className="btn btn-success" to={`/cart/book/${_id}`}>Buy Now</Link> 
            </div>
        </div>  
    </div>
  );
};

export default Book;