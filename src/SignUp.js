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
            <h1 class="auth-header">Sign up</h1>
            <form onSubmit={handleSignUp}>
                <label>Name:
                <input name="username" type="text" id="username" placeholder="John Doe" required />
                </label>

                <label>Email:
                <input name="email" type="email" id="email" placeholder="Email" required />
                </label>

                <label>Password:
                <input name="password" type="password" id="password" placeholder="New Password" value={password} required
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                </label>

                <label>Confirm Password:
                <input type="password" id="confirmpassword" placeholder="Repeat Password" value={confirmPassword} className={`${passwordsMatch ? "" : "inputError"}`} required
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }} />
                </label>

                <div>
                    {formErrors.map((value, index) => {
                        return <p key={index} className="error-text">{value}</p>
                    })}
                </div>

                <div className="centered-flex-column">
                    <button type="submit">Sign Up</button>
                    <div className="centered-flex-row">
                        <button type="button" className="w-49" onClick={props.cancel}>Cancel</button>
                        <button type="button" className="w-49" onClick={props.oauth}>
                            {/* <img src={process.env.PUBLIC_URL + '/google-icon.svg'} class="inline-icon" /> */}
                            Sign Up with Google</button>
                    </div>
                </div>

            </form>
        </div >
    );
};

export default SignUp
