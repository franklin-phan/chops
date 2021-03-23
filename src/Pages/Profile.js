import React from 'react';
import Navbar from '../Components/Navbar/Navbar'
import { useSelector } from 'react-redux';
import { selectUser } from '../userRedux';
import Profile from '../Components/Profile/profile'

function ProfilePage() {
  const user = useSelector(selectUser);
  return (
    <div className='app'>
      <Navbar
        profilePage={true}
        user={user}
      />
      <Profile />
    </div>
  )
}

export default ProfilePage