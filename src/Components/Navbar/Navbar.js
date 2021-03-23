import React, { useState } from 'react';

import { logout } from '../../userRedux';
import { useDispatch } from 'react-redux';

import SignUpModal from '../Authentication/SignUpModal'
import SignInModal from '../Authentication/SignInModal'
import DropDownMenu from '../Utils/DropDownMenu';

export default function Navbar(props) {
  const { user, profilePage } = props;
  const dispatch = useDispatch();
  const [menuHidden, setMenuHidden] = useState("hidden")

  return (
    <header>
      <div className="wrapper">
        <a href={"/feed"}><div className="JamSessionLogo"></div></a>
        {user ?
          <div className="navbar-content">
            <div className='user-profile'>
              <img src={user.photoUrl} />
            </div>
            <DropDownMenu menuColor="#fff" menuTopMargin="59px" actions={
              [{
                name: "Feed",
                link: '/feed',
                action: () => { }
              },
              {
                name: "Profile",
                link: `/profile/${user.uid}`,
                action: () => { }
              },
              {
                name: "Logout",
                link: "/",
                action: () => { dispatch(logout()) }
              }]
            } />
          </div>
          :
          <div>
            <button style={{marginTop: 10}} onClick={()=>{window.location = '/'}}>Homepage</button>
          </div>
        }
      </div>
    </header >
  )
}