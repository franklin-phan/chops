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


  function getDropDownItems() {
    const FeedOrProfileLink = profilePage ?
      {
        name: "Feed",
        link: '/feed',
        action: () => { }
      }
      :
      {
        name: "Profile",
        link: `/profile/${user.uid}`,
        action: () => { }
      }

    const logoutLink = {
      name: "Logout",
      link: "/",
      action: () => { dispatch(logout()) }
    }

    return [FeedOrProfileLink, logoutLink]

  }

  return (
    <header>
      <div className="wrapper">
        <a href={"/feed"}><h1>Jam Session</h1></a>
        {user ?
          <div className="navbar-content">
            <div className='user-profile'>
              <img src={user.photoUrl} />
            </div>
            <DropDownMenu menuColor="#fff" menuTopMargin="59px" actions={getDropDownItems()} />
          </div>
          :
          <div>
            <SignUpModal />
            <SignInModal />
          </div>
        }
      </div>
    </header >
  )
}