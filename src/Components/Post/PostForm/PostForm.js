import React from 'react'
import './PostForm.css'

export default function PostForm(props) {
  const title = props.title
  const songLink = props.songLink
  const changeTitle = props.changeTitle
  const changeSongLink = props.changeSongLink
  const handleSubmit = props.handleSubmit
  return (
    <section>
      <form onSubmit={handleSubmit} className="createPostForm">
        <div className="flex-row flex-align-center create-post-profile-wrapper">
          <div className="user-profile">
            {props.user ? <img src={props.user.photoUrl} alt='Profile Pic Loading' /> : null}
          </div>
          {props.user ? <a>{props.user.displayName}</a> : null}
        </div>

        <input type="text" name="currentItem" placeholder="Describe your music" onChange={changeTitle} value={title} />
        <input type="text" name="linkValue" placeholder="SoundCloud, Spotify, or YouTube Link" onChange={changeSongLink} value={songLink} />
        <button>Post</button>
      </form>
    </section>
  )
}