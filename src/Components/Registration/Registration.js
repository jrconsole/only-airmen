import './Registration.css';
import React, { useState } from 'react';



var PORT = 8084
function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    let ages = []
    for (let i = 18; i < 130; i++) {
        ages.push(i);
    }

    let locations = {Kirtland: "1", Edwards: "2", Scranton: "3", Moscow: "4"}
    let locations_arr = ["Kirtland", "Edwards", "Scranton", "Moscow"]
    const register = async (e) => {
        e.preventDefault()
        let loc = locations[location]
        console.log(loc)
        await fetch(`http://localhost:${PORT}/registration/new`, 
        
        {method: 'POST',  body: JSON.stringify({username:username,password:password,age:age,location:loc}),
        headers: {
        'Content-Type': 'application/json'
        },
        })

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
                    <select onChange={(e) => setAge(e.target.value)}>
                        {ages.map((i) => (<option value={i}>{i}</option>))}
                    </select >
                     </label>
                     <br/>
                     <label>
                        Location
                        <select onChange={(e) => setLocation(e.target.value)}>
                            {locations_arr.map(i => (<option value={i}>{i}</option>))}
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







export default Registration;
