import './Chat.css';
import { Link } from "react-router-dom";

function Chat() {

  //should load list of conversations for logged in user

  return (
    <>
      <h1>this is the chat page</h1>
      {/*for each conversation, render Link component that redirects user to the conversation component (while passing conversation id as props)*/}
      <Link to="/conversation"><button>Go to conversation component</button></Link>
    </>
  );
}

export default Chat;
