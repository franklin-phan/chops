import React, { useState } from 'react';
import app from 'firebase'


const SignIn = (props) => {
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
            <div class="spaced-flex-row">
                <h1 class="auth-header">Login</h1>
                <button type="button" className="close-modal" onClick={props.cancel}>X</button>
            </div>
            <form onSubmit={handleLogin}>
                <label>
                    Email
            <input name="email" type="email" required />
                </label>
                <label>
                    Password
            <input name="password" type="password" required />
                </label>

                <div>
                    {formErrors.map((value, index) => {
                        return <p key={index} className="error-text">{value}</p>
                    })}
                </div>

                <div className="spaced-flex-row">
                    <button type="submit">Login</button>
                    <div class="google-btn" onClick={props.oauth}>
                        <div class="google-icon-wrapper">
                            <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p class="btn-text"><b>Sign in with Google</b></p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignIn