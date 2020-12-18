import './Chat.css';
import { Link } from "react-router-dom";
import { useState, useEffect, Integer } from 'react';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane , faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function Chat() {
  //Renders Chat pages, with all the chats

  const cookies = new Cookies();
  const sessionInfo = cookies.get('sessionInfo');
  const sessionInfoSplit = sessionInfo.split("_");
  const user_id = sessionInfoSplit[0];

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [conversations, setConversations] = useState([]);
  const [addToLog, userInput] = useInput({ type: "text" });
  const [value, setValue] = useState();

  useEffect(() => {
    getConversations();
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetch('http://localhost:8080/users/all'); //fetch the users from server
    const returnedUsers = await response.json();
    setUsers(returnedUsers);
    returnedUsers.forEach(user =>{ 
      if(user_id == user.user_id){
        setUsername(user.username)
      }
    })
  }

  const getConversations = async () => {
    const response = await fetch('http://localhost:8080/conversations/user/' + user_id); //fetch the user's conversations from server
    const returnedConversations = await response.json();
    setConversations(returnedConversations);
  }

  const displayLastMsg = (chat_log) => {
    var msgs = chat_log.split('\n');
    var msg= msgs[msgs.length-2];
    if(msg.includes(username)){
      msg=msg.replace(username, "me");
    }
    if(msg.length>75){
      msg=msg.slice(0,75) + "...";
    }
    return (<div class="msgPreview">{msg}</div>)
  }

  const history = useHistory();
  const handleChatClick = (conversation) => {
    var location = {
      pathname: "/conversation",
      state: { 
        conversation: conversation,
      }

    }
    history.push(location);
  }  

  const renderConversations = () => {
    return (
      <table class="chat">
        {
          conversations.map(conversation => {
            return (
              <tr>
                <td width="5%">
                  <Link to={`/user/${conversation.receiver_user_id}`}><FontAwesomeIcon icon={faUserCircle} class="profileIcon"/></Link>
                </td>
                <td width="95%" class="hover" onClick={()=> handleChatClick(conversation)}>
                  <b>{conversation.receiver_username}</b>
                  <br/>
                  {displayLastMsg(conversation.chat_log)}
                </td>
              </tr>
            );})
        }
      </table>
    )
  }

 const renderStartNewChat = () => {
   var existingReceiversIds = conversations.map(c => c.receiver_user_id);
   return (
    <>
      <h2>New Chat</h2>
      <label>To:</label>
      <select class='selectRecipient' value={value} onChange={(e) => setValue(e.currentTarget.value)}>
        <option value={null} selected disabled hidden>Recipient</option>        
        {users.map(user => {
          if(user.user_id != user_id && !existingReceiversIds.includes(user.user_id)){
            return (
              <option key={user.user_id} value={user.user_id}>
                {user.username}
              </option>
            )
          }
        })}
      </select> 
      {userInput}
      <span onClick={handleStartNewChat}>
        <FontAwesomeIcon icon={faPaperPlane} class="sendIcon"/>
      </span>
    </>
   )
 }

 function useInput({ type }) {
   const [value, setValue] = useState("");
   const input = <input value={value} placeholder="Enter Message" class="msgInput" onChange={e => setValue(e.target.value)} type={type} />;
   return [value, input];
 }

 const handleStartNewChat = async (e) =>{
   if(value == null){
     alert("Please choose a recipient")
   } else {
      const msg = `${username}: ${addToLog}\n`
      const response = await fetch(`http://localhost:8080/conversations`, {
        method: 'POST',
        headers: { 'Content-Type':  'application/json' },
        body: JSON.stringify({
                "my_user_id": user_id,
                "receiver_user_id": value, 
                "chat_log": msg, 
              })
      }); 
      getConversations();
   }
 }

  return (
    <>
      <h1>Chats</h1>
      {renderConversations()}
      <br />
      {renderStartNewChat()}
      <br/><br /><br/><br />
      <Link to="/search"><button>Search</button></Link>
      <Link to={`/user/${user_id}`}><button>My Profile</button></Link>
    </>
  );
}

export default Chat;
