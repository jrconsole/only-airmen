import './Login.css';
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

var PORT = 8084
function NewComp() {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:${PORT}/auth/login`, 
                        {method: 'POST',  body: JSON.stringify({username:username,password:password}),
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        credentials: 'include'     
                        })
        let cookie = new Cookies(); 
        let uid = cookie.get("sessionInfo").split("_")[0]
        history.push(`/user/${uid}`)

    }

    const logout = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:${PORT}/auth/logout`, 
                    {method: 'GET',
                    credentials: 'include'     
                    })
    }

    return (
        <>
        <br/><br/>
        <h1>OnlyAirmen</h1>
        <h2><em>find your boo in the big blue</em></h2>
        <br/>
        <h2>Login</h2>
              <div>
                  <Link to="/registration">Registration</Link>
                <form onSubmit={login}>
                    <label>
                    Username:
                    <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)} />
                    </label>
                    <br/>
                    <label>
                    Password:
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                     </label>
                     <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <br/>
                <button onClick={logout}>Logout</button>
              </div>
        </>
    );
}





export default NewComp;
