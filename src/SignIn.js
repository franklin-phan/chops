import React, { useState } from 'react';
import app from 'firebase'


const SignIn = () => {
    const [formErrors, setFormErrors] = useState([])

    const handleLogin = (async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        setFormErrors([])

        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);

        } catch (error) {
            setFormErrors(formErrors => [...formErrors, error.message])
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

                <div>
                    {formErrors.map((value, index) => {
                        return <p key={index} className="error-text">{value}</p>
                    })}
                </div>

                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default SignIn