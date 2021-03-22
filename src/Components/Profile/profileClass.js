import React, { useEffect, useState, Component } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { db } from '../../firebase';
import Post from '../Post/Post'
import { userLoggedIn, userIsOwner } from '../Authentication/IsLoggedIn'
import { useSelector, connect } from 'react-redux';
import { selectUser } from '../../userRedux'
import EditProfile from './editProfile'
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uidInvalid: false,
            editProfile: false,
            profileData: null,
            posts: [],
            bio: null,
            pronouns: null,
            displayName: null,
            followers: [],
            renderAgain: 0
        }
    }

    async componentDidMount() {
        console.log(this.props.match)
        let { uid } = this.props.match.params
        const profileDataRef = db.collection("users").doc(uid)
        const doc = await profileDataRef.get();
        if (!doc.exists) {
            this.setState({uidInvlaid: true})
            console.log('No such document!');
            return
        } else {
            this.setState({profileData: doc.data()})
            // console.log('Document data:', doc.data());
        }
        db.collection("posts").where("uid", "==", uid).get()
        .then(snap => {
            this.setState({posts: snap.docs.map(doc => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                ))})
                // console.log(doc.data())
        });

        const followersObject = doc.data().followers
        // console.log(typeof(followersObject))
        const followersKeys = Object.keys(followersObject)
        const promises = followersKeys.map((key) => {
            return db.collection("users").doc(key).get()
        })
        console.log(promises)
        Promise.all(promises).then((values) => {
            const followersNames = values.map((value) => value.data().displayName)
            console.log('*******************')
            console.log(followersNames)
            console.log('*******************')
            this.setState({followers: followersNames,
            renderAgain: this.state.renderAgain + 1})
        })
        // const followersData = followersKeys.map((key) => {
        //     if (followersObject[key]) {
        //         // console.log(key)
        //         const followersName = await db.collection("users").doc(key).get()
        //         console.log(followersName.data().displayName)
        //         followersDisplayNames.push(followersName.data().displayName)
        //     }
        // })
        // console.log('*******************')
        // console.log(followersDisplayNames)
        // console.log('*******************')
        // this.setState({followers: followersDisplayNames,
        // renderAgain: this.state.renderAgain + 1})
    }
    
handleSubmit(e) {
    e.preventDefault();
    let { uid } = this.props.match.params
    db.collection("users").doc(uid).update({
      bio: this.state.bio,
      pronouns: this.state.pronouns,
      displayName: this.state.displayName
    });
    this.setState({bio: ''})
    this.setState({pronouns: ''})
    this.setState({displayName: ''})
    this.setState({editProfile: false})
  }
   changeBio(e) {
    this.setState({bio: e.target.value})
  }
   changePronouns(e) {
    this.setState({pronouns: e.target.value})
  }
   changeDisplayName(e) {
    this.setState({displayName: e.target.value})
  }
  render() {
      const {bio, pronouns, displayName, posts, followers, profileData, uidInvalid, editProfile, renderAgain} = this.state
      const {changeBio, changePronouns, changeDisplayName, handleSubmit} = this
      console.log(`Render Number: ${renderAgain}`)
      return (
        <div className="profile">
        {uidInvalid ? <h1>Profile page does not exist!</h1> :
          <div>
            {editProfile ? <EditProfile
              bio={bio}
              pronouns={pronouns}
              displayName={displayName}
              changeBio={changeBio}
              changePronouns={changePronouns}
              changeDisplayName={changeDisplayName}
              handleSubmit={handleSubmit}
            /> :
              <div>
                {profileData ?
                  <div className="profile-container">
                    <div className="profile-banner">
                      <img className="profile-image" src={profileData.pfpUrl} />
                      <div className="edit-profile-button">
                        {userIsOwner(this.props.user, this.props.match.params.uid) ? <div onClick={() => this.setState({editProfile: true})}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#333"><path d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z" /></svg>
                        </div> : null}
                      </div>
                    </div>
                    <div className="profile-info">
                      <p className="profile-name">{profileData.displayName}</p>
                      <p className="profile-pronouns">{profileData.pronouns}</p>
                      <p className="profile-bio">{profileData.bio}</p>
                      {followers ? console.log(followers): console.log("No followers")}
                      {console.log(followers.length)}
                      {followers ? <div>{followers.map((name) => {
                        return <p>{name}</p>
                      })}</div>: <p>Followers DONT exist</p>}
  
                    </div>
                  </div>
                  : null}
                {posts.map((data) => {
                  return (
                    <Post data={data} />
                  )
                })}
              </div>
            }
          </div>
        }
      </div>
      )
  }
}
function mapStateToProps(state) {
    return {
        user: state.user.user
    }
} 
export default connect(mapStateToProps)(Profile);