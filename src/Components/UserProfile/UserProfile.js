import './UserProfile.css';
import { Link } from "react-router-dom";

function UserProfile() {
  return (
    <>
      <h1>this is the user profile</h1>
      <Link to="/"><button>Login</button></Link>
      <br /><br />
      <Link to="/conversations"><button>Chat</button></Link> 
      <br /><br />
      <Link to="/search"><button>Search</button></Link> 
    </>
  );
}

export default UserProfile;
