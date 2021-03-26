import React, { useEffect, useState } from 'react';
import Post from '../../Components/Post/Post'
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../userRedux'
import Navbar from '../../Components/Navbar/Navbar'
import MakePost from '../../Components/MakePost/MakePost'
import Player from '../../Components/customPlayer/player'
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
              {posts.map((data, index) => {
                return (
                  <Post data={data} key={index} />
                )
              })}
            </ul>
          </div>
        </section>
      </div>
      {/* <Player /> */}
    </div>
  );
};

export default Feed;