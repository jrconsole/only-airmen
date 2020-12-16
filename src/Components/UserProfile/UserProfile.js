import './UserProfile.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function UserProfile() {

  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch('http://localhost:8080/users/1');
      const jsonResponse = await response.json();

      setProfile(jsonResponse);
    }
    fetchProfile();
  }, []);

  return (
    <>
      <h3>username: {profile.username}</h3>
      <h3>age: {profile.age}</h3>
      <h3>location: {profile.location}</h3>
      
      <Link to="/"><button>Login</button></Link>
      <br /><br />
      <Link to="/conversations"><button>Chat</button></Link> 
      <br /><br />
      <Link to="/search"><button>Search</button></Link> 
    </>
  );
}

export default UserProfile;
