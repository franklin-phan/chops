import React from 'react';
import Navbar from '../Components/Navbar/Navbar'
import { useSelector } from 'react-redux';
import { selectUser } from '../userRedux'
import EditProfile from '../Components/Profile/editProfile'

function EditProfilePage() {
    const user = useSelector(selectUser);

    return (
        <div className='app'>
            <Navbar
                user={user}
            />
            <EditProfile/>
        </div>
    )
}

export default EditProfilePage