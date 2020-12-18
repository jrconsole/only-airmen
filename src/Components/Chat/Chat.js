import './Chat.css';
import { Link } from "react-router-dom";
import { useState, useEffect, Integer } from 'react';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane , faUserCircle } from "@fortawesome/free-solid-svg-icons";

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
    return (<>{msg}</>)
  }

  const renderConversations = () => {
    return (
      <table>
        {
          conversations.map(conversation => {
            return (
                  <tr>
                    <td>
                      <Link to={`/user/${conversation.receiver_user_id}`}><FontAwesomeIcon icon={faUserCircle} /></Link>
                    </td>
                    <td>
                      <Link to={{
                                pathname: "/conversation",
                                state: { conversation: conversation }
                              }} 
                            key={conversation.receiver_user_id}>{conversation.receiver_username}</Link>
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
      <h3>Start a new chat</h3>
      <label>To:</label>
      <select value={value} onChange={(e) => setValue(e.currentTarget.value)}>
        <option value={null}> {""} </option>
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
      <label>Message:</label>
      {userInput}
      <span onClick={handleStartNewChat}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </span>
    </>
   )
 }

 function useInput({ type }) {
   const [value, setValue] = useState("");
   const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
   return [value, input];
 }

 const handleStartNewChat = async (e) =>{
   if(value == ""){
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
      <br/><br />
      <Link to="/search"><button>Search</button></Link>
      <br/><br />
      <Link to={`/user/${user_id}`}><button>My Profile</button></Link>
    </>
  );
}

export default Chat;
