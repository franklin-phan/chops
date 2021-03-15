import React, { useState } from 'react';
import app from 'firebase'

const SignUp = () => {
    const [formErrors, setFormErrors] = useState([])

    const handleSignUp = (async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        setFormErrors([])

        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
        } catch (error) {
            setFormErrors(formErrors => [...formErrors, error.message])
        }
    });

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
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

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp
