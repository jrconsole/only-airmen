import './Conversation.css';
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
function Conversation() {

  //should load list of conversations for logged in user

  let location = useLocation();

  const handleClick = async (e) =>{
    const response = await fetch(`http://localhost:8080/conversations/1`, {
     method: 'POST',
     headers: { 'Content-Type':  'application/json' },
     body: "hey kid"
   }); 
     alert('this is reached')
  }


  return (
    <>
      <h1>this is the conversation page</h1>
      {location.state.test}
      <button onClick={handleClick}>Send Message</button>
      <Link to="/conversations"><button>Chat</button></Link>
    </>
  );
}

export default Conversation;
