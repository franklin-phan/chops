import React, { useState, useEffect } from 'react';
import app from 'firebase'

const SignUp = (props) => {
    const [formErrors, setFormErrors] = useState([])
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState("true")

    const handleSignUp = (async event => {
        event.preventDefault();
        const { username, email, password } = event.target.elements;
        setFormErrors([])

        if (passwordsMatch) {
            try {
                await app
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value)
                    .then((userCredential) => {

                        var user = userCredential.user;

                        user.updateProfile({
                            displayName: (username.value)
                        }).catch(function (error) {
                            setFormErrors(formErrors => [...formErrors, error.message])
                        });
                    })

            } catch (error) {
                setFormErrors(formErrors => [...formErrors, error.message])
            }
        }
        else {
            setFormErrors(formErrors => [...formErrors, "Passwords don't match"])
        }
    });

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword)
    }, [password, confirmPassword]);

    return (
        <div>
            <div class="spaced-flex-row">
                <h1 class="auth-header auth-header-small">Create a Jam Session Account</h1>
                <button type="button" className="close-modal" onClick={props.cancel}>X</button>
            </div>
            <form onSubmit={handleSignUp}>
                <label>Name:
                <input name="username" type="text" id="username" required />
                </label>

                <label>Email:
                <input name="email" type="email" id="email" required />
                </label>

                <label>Password:
                <input name="password" type="password" id="password" value={password} required
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                </label>

                <label>Confirm Password:
                <input type="password" id="confirmpassword" value={confirmPassword} className={`${passwordsMatch ? "" : "inputError"}`} required
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }} />
                </label>

                <div>
                    {formErrors.map((value, index) => {
                        return <p key={index} className="error-text">{value}</p>
                    })}
                </div>

                <div className="spaced-flex-row">
                    <button type="submit">Sign Up</button>
                    <div class="google-btn" onClick={props.oauth}>
                        <div class="google-icon-wrapper">
                            <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p class="btn-text"><b>Sign in with Google</b></p>
                    </div>
                </div>

            </form>
        </div >
    );
};

export default SignUp
