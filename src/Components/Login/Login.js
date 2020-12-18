import './Login.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

var PORT = 8084
function NewComp() {
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
        <h1>Login</h1>
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
