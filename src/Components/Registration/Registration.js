import './Registration.css';
import React, { useState } from 'react';



var PORT = 8080
function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = async (e) => {
        e.preventDefault()
        const studentResponse = await fetch(`http://localhost:${PORT}/auth/login`, 
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





export default Registration;
