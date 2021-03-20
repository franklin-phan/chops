import React, { useEffect, useState } from 'react';
import '.././App.css';
import Post from '../Components/Post/Post'
import { auth } from '../google-signin'
import { db } from '../firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../userRedux'
import { Redirect } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Homepage from './Homepage'
import MakePost from '../Components/Post/MakePost'

function Feed() {

    const user = useSelector(selectUser);
    console.log("User")

    console.log(user)
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      if (!user) {
        return <Redirect to="/" />;
      }
      db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => (
          setPosts(snapshot.docs.map(doc => (
              {
                  id: doc.id,
                  data: doc.data(),
              }
          )))
      ))
        console.log(posts)
    }, [])

    return (
        <div className='app'>
            <Navbar
                user={user}
            />
            <div className='feed-container'>
                <MakePost user={user} />
                <section className='display-item'>
                    <div className="wrapper">
                        <ul>
                            {posts.map((data) => {
                                return (
                                    <Post data={data} />
                                )
                            })}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Feed;