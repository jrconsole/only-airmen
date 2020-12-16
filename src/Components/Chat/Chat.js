import './Chat.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function Chat() {

  //should load list of conversations for logged in user
  const [conversations, setConversations] = useState([]);
   const [addToLog, userInput] = useInput({ type: "text" });

  const getConversations = async () => {
  //CHANGE TO COOKIE THING
    var user_id = '1';

    const response = await fetch('http://localhost:8080/conversations/' + user_id); //fetch the user's conversations from server
    const returnedConversations = await response.json();

    setConversations(returnedConversations);
  }

  useEffect(() => getConversations(), []);

  const renderConversations = () => {
    return conversations.map(conversation => {
      return (
        <>
           <h3>i am talking to:</h3>
           <Link to="/conversation" key={conversation.receiver}>{conversation.receiver}</Link>
           <br/>
           {conversation.chat_log}
          <br /><br />
        </>
      );
    })
  }

 function useInput({ type }) {
   const [value, setValue] = useState("");
   const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
   return [value, input];
 }

 const handleClick = async () =>{
    alert(addToLog)
    fetch(`http://localhost:8080/conversations`, {
      method: 'POST',
      headers: { 'Content-Type':  'application/json' },
      body: JSON.stringify({
              my_user_id: 1,
              receiver_user_id: 2,
              chat_log: "fighterPilotXOXO: hey boss",
            })
    })
 }

  return (
    <>
      <h1>this is the chat page</h1>
      {renderConversations()}
      <br /><br />
      {userInput}
      <button onClick={handleClick}>New Convo</button>
      <br /><br />
      <Link to="/conversation"><button>Conversation</button></Link>
      <br /><br />
      <Link to="/user"><button>User Profile</button></Link> 
    </>
  );
}

export default Chat;
