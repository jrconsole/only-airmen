import './Chat.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function Chat() {

  //CHANGE TO COOKIE THING
  const user_id = '1';

  //should load list of conversations for logged in user
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [addToLog, userInput] = useInput({ type: "text" });
  const [value, setValue] = useState();

  const getConversations = async () => {
    const response = await fetch('http://localhost:8080/conversations/' + user_id); //fetch the user's conversations from server
    const returnedConversations = await response.json();

    setConversations(returnedConversations);
  }

  const getUsers = async () => {
    const response = await fetch('http://localhost:8080/users/all'); //fetch the users from server
    const returnedUsers = await response.json();
    setUsers(returnedUsers);
  }

  useEffect(() => {
    getConversations();
    getUsers();
  }, []);

  const renderConversations = () => {
    return conversations.map(conversation => {
      return (
        <>
           <Link to={{
              pathname: "/conversation",
              state: { test: conversation.chat_log }
            }} key={conversation.receiver_user_id}>{conversation.receiver_username}</Link>
           <br/>
           {conversation.chat_log}
           <br/>
        </>
      );
    })
  }

  const renderUsers = () => {
    return users.map(user => {
      return (
        <>
           {user.user_id}
           {user.username} 
        </>
      );
    })
  }

 function useInput({ type }) {
   const [value, setValue] = useState("");
   const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
   return [value, input];
 }

 const handleStartNewChat = async (e) =>{
    const response = await fetch(`http://localhost:8080/conversations`, {
      method: 'POST',
      headers: { 'Content-Type':  'application/json' },
      body: JSON.stringify({
              "my_user_id": user_id,
              "receiver_user_id": value,  //FIX
              "chat_log": addToLog, //FIX
            })
    }); //fetch the user's conversations from server
    getConversations();
 }

  return (
    <>
      <h1>Chats</h1>
      {renderConversations()}
      <br /><br />
      {renderUsers()}
      <br /><br />
      {userInput}
      <button onClick={handleStartNewChat}>New Chat</button>

      <select
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    >
      {users.map(user => (
        <option key={user.user_id} value={user.user_id}>
          {user.username}
        </option>
      ))}
    </select>

      <br /><br />
      <Link to="/conversation"><button>Conversation</button></Link>
      <br /><br />
      <Link to="/user"><button>User Profile</button></Link> 
    </>
  );
}

export default Chat;
