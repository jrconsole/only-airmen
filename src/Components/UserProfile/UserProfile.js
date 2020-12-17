import './UserProfile.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

function UserProfile() {

  const cookies = new Cookies();
  const sessionInfo = cookies.get('sessionInfo');
  const sessionInfoSplit = sessionInfo.split("_");
  const userID = sessionInfoSplit[0];

  const searcherUserID = 1;

  let ownProfile;
  if(searcherUserID == userID) {
    ownProfile = true;
  } else {
    ownProfile = false;
  }

  const [profile, setProfile] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState("");
  const [hobbyMap, setHobbyMap] = useState([]);
  const [url, setUrl] = useState("");
  const [locationMap, setLocationMap] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newAge, setNewAge] = useState("");

  useEffect(() => {
    const fetchPicture = async () => {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
      const jsonResponse = await response.json();

      setUrl(jsonResponse[0].url);
    }
    fetchPicture();
  }, []);

  const fetchHobbies = async () => {
    const response = await fetch(`http://localhost:8082/hobbies/${userID}`);
    const jsonResponse = await response.json();

    setHobbies(jsonResponse);
  }

  const handleNewHobbyChange = e => {
    const {value} = e.target;
    setNewHobby(value);
  }

  const handleNewLocationChange = e => {
    const {value} = e.target;
    setNewLocation(value);
  }

  const handleNewUsernameChange = e => {
    const {value} = e.target;
    setNewUsername(value);
  }

  const handleNewAgeChange = e => {
    const {value} = e.target;
    setNewAge(value);
  }

  const handleUpdateUsername = async () => {
    const data = {
      username: newUsername
    }

    await fetch(`http://localhost:8082/users/${userID}`,
                  {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }
    )
    .then(() => fetchProfile())

    setNewUsername("");    
  }

  const handleUpdateAge = async () => {
    const data = {
      age: newAge
    }

    await fetch(`http://localhost:8082/users/${userID}`,
                  {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }
    )
    .then(() => fetchProfile())

    setNewAge("");
  }

  const handleUpdateLocation = async () => {
    const data = {
      location_id: newLocation
    }

    await fetch(`http://localhost:8082/users/${userID}`,
                  {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }
    )
    .then(() => fetchProfile())

    setNewLocation("");
  }

  const handleNewHobby = async () => {
    const data = {
      hobby_id: newHobby,
      user_id: userID
    }

    await fetch(`http://localhost:8082/hobbies`,
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }
    )
    .then(() => fetchHobbies())

    setNewHobby("");
  }

  const handleDeleteHobby = async (id) => {
    const data = {
      hobby_id: id,
      user_id: userID
    }

    await fetch(`http://localhost:8082/hobbies`,
                  {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }
    )
    .then(() => fetchHobbies())
  }

  async function fetchProfile() {
    const response = await fetch(`http://localhost:8082/users/${userID}`);
    const jsonResponse = await response.json();

    setProfile(jsonResponse);
  }

  useEffect(() => fetchProfile(), []);

  useEffect(() => {
    async function fetchHobbyMap() {
      const response = await fetch(`http://localhost:8082/hobbies`);
      const jsonResponse = await response.json();

      setHobbyMap(jsonResponse);
    }
    fetchHobbyMap();
  }, []);

  useEffect(() => {
    async function fetchLocationMap() {
      const response = await fetch(`http://localhost:8082/locations`);
      const jsonResponse = await response.json();

      setLocationMap(jsonResponse);
    }
    fetchLocationMap();
  }, []);

  useEffect(() => fetchHobbies(), []);

  const hobbiesList = hobbies.map(hobby => {
    return (
        <li>{hobby.name} <button type="button" onClick={() => handleDeleteHobby(hobby.hobbyID)}>Delete</button></li>
    )
  })

  const hobbiesListReadOnly = hobbies.map(hobby => {
    return (
        <li>{hobby.name}</li>
    )
  })

  const hobbySelect = hobbyMap.map(hobby => {
    return (
      <option value={hobby.hobbyID}>{hobby.name}</option>
    )
  })

  const locationSelect = locationMap.map(location => {
    return (
      <option value={location.locationID}>{location.name}</option>
    )
  })

  let editBar = "";
  if(ownProfile === true) {
    editBar = (
    <tr>
      <td></td>
      <td>
        <input type="text" placeholder="Enter New Username" onChange={handleNewUsernameChange} value={newUsername}></input>
        <button onClick={handleUpdateUsername}>Update</button>
      </td>
      <td>
        <input type="text" placeholder="Enter New Age" onChange={handleNewAgeChange} value={newAge}></input>
        <button onClick={handleUpdateAge}>Update</button>
      </td>
      <td>
        <select placeholder="Select Location" onChange={handleNewLocationChange} value={newLocation}>
          <option value = ""></option>
            {locationSelect}
        </select>
        <button onClick={handleUpdateLocation}>Update</button>
      </td>
    </tr>
  )}

  let addHobbyBar = "";
  if(ownProfile) {
    addHobbyBar = (
      <div>
        <select placeholder="Select Hobby" onChange={handleNewHobbyChange} value={newHobby}>
          <option value = ""></option>
          {hobbySelect}
        </select>
        <button onClick={handleNewHobby}>Add Hobby</button>
      </div>
    )}

  return (
    <>
      <h2>Welcome To {profile.username}'s Profile!</h2>
      <table>
        <th>Picture</th><th>Username</th><th>Age</th><th>Location</th>
        <tbody>
        <tr>
          <td><img src={url} alt=""/></td>
          <td>{profile.username}</td>
          <td>{profile.age}</td>
          <td>{profile.location}</td>
        </tr>
        {editBar}
        </tbody>
      </table>

      <h4>Here are {profile.username}'s Hobbies</h4>
      <ul>
        {ownProfile ? hobbiesList : hobbiesListReadOnly}
      </ul>

      {addHobbyBar}
      
      <br/><br/><br/><br/>

      <Link to="/"><button>Login</button></Link>
      <br /><br />
      <Link to="/conversations"><button>Chat</button></Link> 
      <br /><br />
      <Link to="/search"><button>Search</button></Link> 
    </>
  );
}

export default UserProfile;
