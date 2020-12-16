import './Search.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function Search() {

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch('http://localhost:8080/users'); //fetch users from server
    const returnedUsers = await response.json();

    setUsers(returnedUsers);
  }

  useEffect(() => getUsers(), []);

  const renderUsers = () => {
    return users.map(user => {
      return (
        <>
          <Link to="/user" key={user.user_id}>{user.username}</Link>
          <br /><br />
        </>
      );
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
