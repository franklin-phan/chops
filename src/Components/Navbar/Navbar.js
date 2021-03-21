import React, { useState } from 'react';

import { logout } from '../../userRedux';
import { useDispatch } from 'react-redux';

import SignUpModal from '../Authentication/SignUpModal'
import SignInModal from '../Authentication/SignInModal'

export default function Navbar(props) {
    const { user } = props;
    const dispatch = useDispatch();
    const [menuHidden, setMenuHidden] = useState("hidden")
    return (
        <header>
            <div className="wrapper">
                <a href={"/feed"}><h1>Jam Session</h1></a>
                {user ?
                    <div className="navbar-content">
                        <div className='user-profile'>
                            <img src={user.photoUrl} />
                        </div>
                        <div className="navbar-menu" onClick={() => menuHidden === "hidden" ? setMenuHidden("visible") : setMenuHidden("hidden")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" /></svg>
                        </div>
                        <div className="navbar-dropdown" style={{ visibility: menuHidden }}>
                            <div className="navbar-dropdown-item"><a href={`/profile/${user.uid}`}>Profile</a></div>
                            <div className="navbar-dropdown-item" onClick={() => {
                                dispatch(logout())
                                } }><a href={"/"}>Logout</a></div>
                        </div>
                    </div>
                    :
                    <div>
                        <SignUpModal />
                        <SignInModal />
                    </div>
                }
            </div>
        </header>
    )
}