import './Conversation.css';
import { Link } from "react-router-dom";

function Conversation() {

  //should load list of conversations for logged in user

  return (
    <>
      <h1>this is the conversation page</h1>
 
      <Link to="/conversations"><button>Go to chat component</button></Link>
    </>
  );
}

export default Conversation;
