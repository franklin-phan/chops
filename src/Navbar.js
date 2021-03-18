import React, { useState } from 'react';

import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'

export default function Navbar(props) {
    const user = props.user;
    // const username = props.username;
    const logout = props.logout;
    const [menuHidden, setMenuHidden] = useState("hidden")

    return (<header>
        <div className="wrapper">
            <h1>Jam Session</h1>
            {user ?
                <div className="navbar-content">
                    <div className='user-profile'>
                        <img src={user.photoURL} />
                    </div>
                    <div className="navbar-menu" onClick={() => menuHidden === "hidden" ? setMenuHidden("visible") : setMenuHidden("hidden")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" /></svg>
                    </div>
                    <div className="navbar-dropdown" style={{ visibility: menuHidden }}>
                        <div className="navbar-dropdown-item">Profile</div>
                        <div className="navbar-dropdown-item" onClick={logout}>Logout</div>
                    </div>
                </div>
                :
                <div>
                    <SignUpModal />
                    <SignInModal />
                </div>
            }
        </div>
    </header >)
}
