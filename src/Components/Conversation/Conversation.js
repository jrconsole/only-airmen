import './Conversation.css';
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUserCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
      return messages.map(m => {
        var displayM = m;
        if (m.includes(my_username)){
          displayM = m.replace(my_username, "me")
        }
        return (<>{displayM}<br></br></>);
      })
    }
  }

  const renderSendMessage = () => {
    return (
      <>
      {userInput}
      <span onClick={handleSendMsg}>
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
  
  const handleSendMsg = async (e) =>{
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
      <Link to="/conversations"><FontAwesomeIcon icon={faArrowLeft}/></Link>
      <Link to={`/user/${receiver_user_id}`}><FontAwesomeIcon icon={faUserCircle} /></Link>
      <b>{receiver_username}</b>
      <br/><br/>
      {renderChatLog()}
      {renderSendMessage()}
      <br/><br/>
    </>
  );
}

export default Conversation;
