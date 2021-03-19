import React from 'react'

import SignUpModal from '../Authentication/SignUpModal'
import SignInModal from '../Authentication/SignInModal'
import { logout } from '../../userRedux';
import { useDispatch } from 'react-redux';
export default function Navbar(props) {
    const { user } = props;
    const dispatch = useDispatch();
    return (
        <header>
            <div className="wrapper">
                <h1>Jam Session</h1>
                {user ?
                    <button onClick={() => dispatch(logout())}>Logout</button>
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
