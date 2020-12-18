import './Conversation.css';
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Conversation() {

  const my_user_id = useLocation().state.conversation.my_user_id;
  const my_username = useLocation().state.conversation.my_username;
  const receiver_user_id = useLocation().state.conversation.receiver_user_id;
  const receiver_username = useLocation().state.conversation.receiver_username;
  const conversation_id = useLocation().state.conversation.conversation_id;

  const [details, setDetails] = useState({});
  const [addToLog, userInput] = useInput({ type: "text" });

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const response = await fetch('http://localhost:8080/conversations/' + conversation_id);
    const resDetails = await response.json();
    setDetails(resDetails);
  }
  
  const renderChatLog = () => {
    if(details.chat_log){
      var chat_log = details.chat_log;
      var messages = chat_log.split('\n')
      return (
        <table class='messages'>
          {
            messages.map(m => {
              if(m==""){
                return;
              }
              var displayM = m.split(": ")[1];
              if (m.includes(my_username)){
                return(
                  <tr>
                    <td class="msgUsername" width="5%">me:</td>
                    <td >{displayM}</td>
                  </tr>
                )
              } else{
                return (
                  <tr>
                    <td width="5%">
                      <Link to={`/user/${receiver_user_id}`}><FontAwesomeIcon icon={faUserCircle} class="profileIcon"/></Link>
                    </td>
                    <td>{displayM}</td>
                  </tr>
                );
              }
            })
          }
        </table>
      )
    }
  }

  const renderSendMessage = () => {
    return (
      <>
      {userInput}
      <span onClick={handleSendMsg}>
        <FontAwesomeIcon icon={faPaperPlane} class="sendIcon"/>
      </span>
      </>
    )
  }
  
  function useInput({ type }) {
    const [value, setValue] = useState("");
    const input = <input value={value} class='msgInput' placeholder={"Enter Message"} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }
  
  const handleSendMsg = async (e) =>{
    if(addToLog==""){
      alert("Please input a message");
      return;
    }

    const msg = `${my_username}: ${addToLog}\n`
    const response = await fetch(`http://localhost:8080/conversations/${conversation_id}`, {
     method: 'POST',
     headers: { 'Content-Type':  'application/json' },
     body: msg
    });
    getDetails(); 
  }

  return (
    <>
      <br/>
      <header>{receiver_username}</header>
      <br/>
      {renderChatLog()}
      {renderSendMessage()}
      <br/><br/>
      <Link to={`/conversations`}><button>Chats</button></Link>
      <br/><br/>
    </>
  );
}

export default Conversation;
