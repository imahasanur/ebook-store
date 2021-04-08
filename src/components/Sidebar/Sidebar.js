import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sidebar.css';
import { faFile, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddBook from '../AddBook/AddBook';
import ManageBook from '../ManageBook/ManageBook';

const Sidebar = () => {
    const [addOrManage, setAddOrManage] = useState(false);
  return (
    <div className="sidebar-content">
      <div className=" sidebar">
        <ul>

            <li>
                <p className="text-decoration-none text-white"
                onClick={()=>setAddOrManage(true)}>
                <FontAwesomeIcon icon={faPlus}/> Add Book </p>
            </li>
            <li>
                <p className="text-decoration-none text-white"
                    onClick={()=>setAddOrManage(false)}>
                    <FontAwesomeIcon icon={faList} /> Manage Book</p>
            </li>
        </ul>
      </div>
      <div className="toggle-container">
          {
            addOrManage === true && <AddBook></AddBook>
          }
          {
            addOrManage === false && <ManageBook></ManageBook>
          }

      </div>
    </div>
  );
};

export default Sidebar;