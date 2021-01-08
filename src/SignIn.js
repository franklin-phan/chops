import React from 'react'

import app from 'firebase'
const SignIn = () => {
    const handleLogin = (async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
   
      } catch (error) {
        alert(error);
      }
    });
  
    return (
        <div>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  };
  
  export default SignIn