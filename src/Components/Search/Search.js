import './Search.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const userList = [
  {id: 1, name: "john"},
  {id:2, name: "sarah"}
];

function Search() {

  const [users, setUsers] = useState([]);

  const getUsers =  () => {
    const returnedUsers = userList; //fetch users from server

    setUsers(returnedUsers);
  }

  useEffect(getUsers, []);

  const renderUsers = () => {
    return users.map(user => {
      return <Link to="/user" key={user.id}>{user.name}</Link>;
    })
  }

  return (
    <>
      <h1>this is the Search page</h1>
      {renderUsers()}
      <br /><br />
      <Link to="/user"><button>User Profile</button></Link>
      <br /><br />
      <Link to="/conversations"><button>Chat</button></Link> 
    </>
  );
}

export default Search;
