
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, logout, selectUser } from './userRedux';
import Feed from './Pages/Feed'
import Homepage from './Pages/Homepage'
import { auth } from './google-signin'

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [shouldUpdate, setShouldUpdate] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
      } else {
        // user is logged out
        setShouldUpdate(!shouldUpdate) // ! Sets to opposite
      }
    })
  }, [dispatch]);

  return (
      <div className="app">

        {!user ? (
          <Homepage />
        ) : (
          <div className="app_body">
            <Feed/>
          </div>
        )}
        
      </div>
  );
}

export default App;