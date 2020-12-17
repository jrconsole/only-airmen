import './Search.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function Search() {

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [userHobbies, setUserHobbies] = useState([]);

  const [currUsers, setCurrUsers] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ location: null, hobbies: [] });

  const getUsers = async () => {
    const response = await fetch('http://localhost:8080/users'); //fetch users from server
    const returnedUsers = await response.json();

    setUsers(returnedUsers);
    setCurrUsers(returnedUsers);
  }

  const getLocations = async () => {
    const response = await fetch('http://localhost:8080/locations');
    const returnedLocations = await response.json();

    setLocations(returnedLocations);
  }

  const getHobbies = async () => {
    const response = await fetch('http://localhost:8080/hobbies');
    const returnedHobbies = await response.json();

    setHobbies(returnedHobbies);
  }

  const getUserHobbies = async () => {
    const response = await fetch('http://localhost:8080/user-hobbies');
    const returnedUserHobbies = await response.json();

    setUserHobbies(returnedUserHobbies);
  }

  useEffect(() => {
    getUsers();
    getLocations();
    getHobbies();
    getUserHobbies();
  }, []);

  const filterUsers = () => {
    let usersByLocation;
    if (Number(activeFilters.location) === 0) {
      usersByLocation = users;
    } else {
      usersByLocation = users.filter(user => {
        return user.location_id === Number(activeFilters.location);
      });
    }

    let filteredUsers;
    if (activeFilters.hobbies.length === 0) {
      filteredUsers = usersByLocation;
    } else {
      filteredUsers = usersByLocation.filter(user => {
        let userHasSelectedHobbies = false;
        const hobbyList = userHobbies.filter(userHobby => userHobby.user_id === user.user_id)
                                      .map(userHobby => userHobby.hobby_id);
        activeFilters.hobbies.forEach(hobby => {
          if (hobbyList.includes(hobby)) {
            userHasSelectedHobbies = true;
          }
        })

        return userHasSelectedHobbies;
      })
    }

    setCurrUsers(filteredUsers);
  }

  const filterByLocation = (selectedLocation) => {
    const state = activeFilters;
    state.location = selectedLocation;
    setActiveFilters(state);
    console.log(activeFilters);

    filterUsers();
  }

  const renderLocationSelect = () => {
    return (
      <select name="locations" id="locations"  onChange={(e) => filterByLocation(e.target.value)}>
        <option value={0}>All</option>
        {locations.map(location => {
          return <option value={location.location_id}>{location.name}</option>
        })}
      </select>
    );
  }

  const renderHobbySelect = () => {
    // return (
    //   <select name="hobbies" id="hobbies"  onChange={(e) => filterByHobbies(e.target.value)}>
    //     <option value={0}>All</option>
    //     {locations.map(location => {
    //       return <option value={location.location_id}>{location.name}</option>
    //     })}
    //   </select>
    // );
  }

  const renderUsers = () => {
    return currUsers.map(user => {
      return (
        <>
          <Link to="/user" key={user.user_id}>{user.username}</Link>
          <br /><br />
        </>
      );
    })
  }

  return (
    <>
      <h1>this is the Search page</h1>
      {renderLocationSelect()}
      {renderHobbySelect()}
      <br/><br />
      {renderUsers()}
      <br /><br />
      <Link to="/user"><button>User Profile</button></Link>
      <br /><br />
      <Link to="/conversations"><button>Chat</button></Link> 
    </>
  );
}

export default Search;
