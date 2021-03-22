import React from 'react';
import Navbar from '../Components/Navbar/Navbar'
import { useSelector } from 'react-redux';
import { selectUser } from '../userRedux'
import Profile from '../Components/Profile/profile'
// import Profile from '../Components/Profile/profileClass'

function ProfilePage(props) {
    const user = useSelector(selectUser);

    return (
        <div className='app'>
            <Navbar
                profilePage={true}
                user={user}
            />
            <Profile {...props}/>
        </div>
    )
}

export default ProfilePage