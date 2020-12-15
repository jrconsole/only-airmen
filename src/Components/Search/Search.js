import './Search.css';
import { Link } from "react-router-dom";

function Search() {
  return (
    <>
      <h1>this is the Search page</h1>
      <Link to="/user"><button>User Profile</button></Link>
      <br /><br />
      <Link to="/conversations"><button>Chat</button></Link> 
    </>
  );
}

export default Search;
