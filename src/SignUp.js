import React, { useState, useEffect } from 'react';
import app from 'firebase'

const SignUp = (props) => {
    const [formErrors, setFormErrors] = useState([])
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState("true")

    const handleSignUp = (async event => {
        event.preventDefault();
        const { firstname, lastname, email, password } = event.target.elements;
        setFormErrors([])

        if (passwordsMatch) {
            try {
                await app
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value);

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
    });

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <label>First Name:
                <input name="firstname" type="text" id="firstname" placeholder="John" required />
                </label>

                <label>Last Name:
                <input name="lastname" type="text" id="lastname" placeholder="Doe" required />
                </label>

                <label>Email:
                <input name="email" type="email" id="email" placeholder="Email" required />
                </label>

                <label>Password:
                <input name="password" type="password" id="password" placeholder="Password" value={password} required
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                </label>

                <label>Confirm Password:
                <input type="password" id="confirmpassword" placeholder="Confirm Password" value={confirmPassword} className={`${passwordsMatch ? "" : "inputError"}`} required
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
                        <button type="button" className="w-49" onClick={props.oauth}>Sign Up with Google</button>
                    </div>
                </div>

            </form>
        </div >
    );
};

export default SignUp
