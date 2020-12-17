import './Registration.css';
import React, { useState } from 'react';



var PORT = 8084
function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let ages = []
    for (let i = 18; i < 130; i++) {
        ages.push(i);
    }

    let locations = {Kirtland: 1, Edwards: 2, Scranton: 3, Moscow: 4}
    const register = (e) => {
        e.preventDefault()
    }

    return (
        <>
        <h1>Registration</h1>
              <div>
              <form onSubmit={register}>
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
                     <label>
                    Age
                    <select>
                        {ages.map((i) => (<option value={i}>{i}</option>))}
                    </select>
                     </label>

                     <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <br/>
              </div>
        </>
    );
}

/*                     <label>
                        Location
                        <select>
                            {locations.map((i) => (<option value={locations[i]}>{i}</option>))}
                        </select>
                     </label> */





export default Registration;
