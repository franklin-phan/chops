
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, logout, selectUser } from './userRedux';
import Feed from './Pages/Feed'
import Homepage from './Pages/Homepage'
import ProfilePage from './Pages/Profile'

import { auth } from './google-signin'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [redirectLogin, setRedirectLogin] = useState(false)
  const [redirectLogout, setRedirectLogout] = useState(false)


  useEffect(() => {
    let isMounted = true; // note this flag denote mount status

    auth.onAuthStateChanged(async userAuth => {
      console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
      if (userAuth) {
        // user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
        setRedirectLogin(true)
      } else {
        // user is logged out
        if (isMounted) await setRedirectLogout(true)
      }
      return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
    })
    
  }, [dispatch]);

  return (
    <Router>
      <Switch>
      <div className="app">
        <Route path="/profile/:uid" exact render={ () => <ProfilePage/>} />
        <Route exact path="/" exact render={ () => <Homepage/>}>
          {redirectLogin ? <Redirect to="/feed" /> : <Homepage/>}
        </Route>
        <Route exact path="/feed" > 
          {redirectLogout ? console.log("attempting to redirect") : <Feed/>}
          {!user ? <Redirect to="/" /> : <Feed/>}
        </Route>

      </div>
      </Switch>
    </Router>

  );
}

export default App;