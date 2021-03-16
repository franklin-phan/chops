import React from "react";
import CommentInput from './Components/Comment/sendComment'
import Comment from './Components/Comment/comment'
import pfp from './Components/Comment/pfp.png'
import Snap from './Components/Snaps/snap'

function Post(item, user, email) {
    console.log(item)

    return (
        <li key={item.id}>
            <h3>{item.title}</h3>
            {item.item.link.search("soundcloud") !== -1 ?
                <iframe title="post"width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
                src={"https://w.soundcloud.com/player/?url="+ item.item.link +"&am;"}>
                </iframe> : null}
            {item.item.link.search("spotify") !== -1 ? 
                <iframe src={(item.item.link).replace("track", "embed/track")} title="post" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : null}
            {item.item.link.search("youtube") !== -1 ?
                <iframe title="post" width="100%" height="166" src={(item.item.link).replace("watch?v=", "embed/")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : null}
            <p>Posted by: {item.item.user}
                {item.item.user === item.user || item.item.user === item.email ?
                <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
            </p>
            {/* Profile Picture */}
            <img src={pfp} width="30px" height="30px"/>
            {/* Time Posted */}
            <time>{item.item.time}</time>
            {/* Snaps */}
            <Snap snaps={item.item.snaps} snapActive={item.item.snapActive} id={item.item.id}/>
            {/* Comment Form */}
            <CommentInput comments={item.comments} user={item.user} id={item.item.id}/>
            {/* Comments if not undefined */}
            {item.item.comments != undefined ?
                item.item.comments.map((comment) => {
                    return (
                        <div>
                            <Comment comment={comment.comment} username={comment.username} time={comment.time}/>
                            {comment.username === item.user || comment.username === item.email ?
                            <button onClick={() => this.removeItem(item.item.comments[0])}>Remove Item</button> : null}
                        </div>
                    )
            }) : null}
        </li>
    );
}

export default Post;



///
///
