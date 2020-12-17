import './Login.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
var PORT = 8080
function NewComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const postCreds = async (e) => {
        e.preventDefault();
        const studentResponse = await fetch(`http://localhost:${PORT}/auth/login`, 
                                            {method: 'POST',  body: JSON.stringify({username:username,password:password}),
                                            headers: {
                                            'Content-Type': 'application/json'
                                            },
                                            credentials: 'include'     
                                            })
    }

    const logout = async(e) => {
    

    }

    return (
        <>
        <h1>Login</h1>
              <div>
                <form onSubmit={postCreds}>
                    <label>
                    Username:
                    <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)} />
                    </label>
                    <br/>
                    <label>
                    Password:
                    <input type="text" name="password" onChange={(e)=>setPassword(e.target.value)} />
                     </label>
                    <input type="submit" value="Submit"/>
                    </form>
              </div>
        </>
    );
}





export default NewComp;
