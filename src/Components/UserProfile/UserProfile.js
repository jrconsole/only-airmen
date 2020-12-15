import './UserProfile.css';
import { Link } from "react-router-dom";

function UserProfile() {
  return (
    <>
      <h1>this is the user profile</h1>
      <Link to="/"><button>Go to login component</button></Link>
      <br /><br />
      <Link to="/conversations"><button>Go to chat component</button></Link> 
    </>
  );
}

export default UserProfile;
