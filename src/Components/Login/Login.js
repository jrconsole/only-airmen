import './Login.css';
import { Link } from "react-router-dom";

function NewComp() {
  return (
    <>
      <h1>this is the login page</h1>
      <Link to="/user"><button>User Profile</button></Link>
    </>
  );
}

export default NewComp;
