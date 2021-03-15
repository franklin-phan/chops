import React from 'react'

import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'

export default function Navbar(props) {
    const user = props.user;
    // const username = props.username;
    const logout = props.logout;
    return (<header>
        <div className="wrapper">
            <h1>Jam Session</h1>
            {user ?
                <button onClick={logout}>Logout</button>
                :
                <div>
                    <SignUpModal />
                    <SignInModal />
                </div>
            }
        </div>
    </header>)
}
