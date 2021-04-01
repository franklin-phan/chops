import React, { useEffect, useState } from 'react';
import Post from '../../Components/Post/Post'
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import Navbar from '../../Components/Navbar/Navbar'
import MakePost from '../../Components/MakePost/MakePost'
import ProfileSnippet from '../../Components/ProfileSnippet/ProfileSnippet'
import Player from '../../Components/test-player/Player'
// import Player from '../../Components/customPlayer/player'
import './Feed.css'

function Feed() {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => (
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data(),
        }
      )))
    ))
  }, [])
//https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
  return (
    <div className='app'>
      <Navbar
        user={user}
      />
      
      <div className='feed-container'>
        <ProfileSnippet user={user} />
        <MakePost user={user} />
        <section className='display-item'>
          <div className="wrapper">
            <ul>
              {posts.map((data, index) => {
                return (
                  <Post data={data} key={index} />
                )
              })}
            </ul>
          </div>
        </section>
       
        <Player />
      </div>
    </div>
  );
};

export default Feed;