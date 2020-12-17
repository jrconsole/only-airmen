import './Search.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";


function Search() {

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [userHobbies, setUserHobbies] = useState([]);

  const [currUsers, setCurrUsers] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ location: null, hobbies: [] });

  const getUsers = async () => {
    const response = await fetch('http://localhost:8081/users'); //fetch users from server
    const returnedUsers = await response.json();

    setUsers(returnedUsers);
    setCurrUsers(returnedUsers);
  }

  const getLocations = async () => {
    const response = await fetch('http://localhost:8081/locations');
    const returnedLocations = await response.json();

    setLocations(returnedLocations);
  }

  const getHobbies = async () => {
    const response = await fetch('http://localhost:8081/hobbies');
    const returnedHobbies = await response.json();

    setHobbies(returnedHobbies);
  }

  const getUserHobbies = async () => {
    const response = await fetch('http://localhost:8081/user-hobbies');
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

  const filterByHobby = (e) => {
    const filterIndex = activeFilters.hobbies.indexOf(Number(e.target.value));
    let newFilters = activeFilters;
    if(filterIndex > -1) {
      newFilters.hobbies.splice(filterIndex, 1);
    } else {
      newFilters.hobbies.push(Number(e.target.value));
    }

    setActiveFilters(newFilters);
    filterUsers();
  }

  const filterByLocation = (selectedLocation) => {
    const newFilters = activeFilters;
    newFilters.location = selectedLocation;
    setActiveFilters(newFilters);

    filterUsers();
  }

  const renderLocationSelect = () => {
    return (
      <select 
        name="locations" 
        id="locations"  
        className="filter-select"
        onChange={(e) => filterByLocation(e.target.value)}>
        <option value={0}>All Locations</option>
        {locations.map(location => {
          return <option value={location.location_id}>{location.name}</option>
        })}
      </select>
    );
  }

  const renderHobbySelect = () => {
    return (
      hobbies.map(hobby => {
        return (
          <>
            <FormControlLabel
              key={hobby.hobby_id_id}
              control={
                <Checkbox
                  onChange={filterByHobby}
                  value={hobby.hobby_id_id}
                  color="primary"
                />
              }
              label={hobby.name}
            />
          </>
        )
      })
    );
  }

  const renderUsers = () => {
    return currUsers.map(user => {
      return (
        <>
          <Link to={`/user/${user.user_id}`} key={user.user_id}>
            
            <div className="user-card">
              {user.username}
            </div>

          </Link>

        </>
      );
    })
  }

  return (
    <>
      <h1>Search for your Airman</h1>
      {renderLocationSelect()}
      {renderHobbySelect()}
      <br/><br />
      {renderUsers()}
      <br /><br />
      <Link to="/conversations"><button>Chat</button></Link> 
    </>
  );
}

export default Search;
