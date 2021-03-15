import React, { useState } from 'react';
import app from 'firebase'

const SignUp = (props) => {
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
                <label for="email">Email</label>
                <input name="email" type="email" id="email" placeholder="Email" />

                <label for="password">Password</label>
                <input name="password" type="password" id="password" placeholder="Password" />

                <div>
                    {formErrors.map((value, index) => {
                        return <p key={index} className="error-text">{value}</p>
                    })}
                </div>

                <div class="centered-flex-column">
                    <button type="submit">Sign Up</button>
                    <div class="centered-flex-row">
                        <button type="button" onClick={props.cancel}>Cancel</button>
                        <button type="button" onClick={props.oauth}>Sign Up with Google</button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default SignUp
