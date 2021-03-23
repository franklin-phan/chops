import React, {useEffect, useState} from "react";
import EditModal from '../Utils/EditModal'
import { db } from '../../firebase';

export default function EditProfile(props) {
    // const [headline, setHeadline] = useState('test')
    // function changeHeadline(e) {
    //     console.log(e.target.value)
    //     setHeadline(e.target.value)
    // }
    const headline = props.headline
    const spotifyLink = props.spotifyLink
    const youtubeLink = props.youtubeLink
    const soundcloudLink = props.soundcloudLink
    const changeSoundcloudLink = props.changeSoundcloudLink
    const changeSpotifyLink = props.changeSpotifyLink
    const changeYoutubeLink = props.changeYoutubeLink
    const bio = props.bio
    const pronouns = props.pronouns
    const displayName = props.displayName
    const changeHeadline = props.changeHeadline
    const changeBio = props.changeBio
    const changePronouns = props.changePronouns
    const changeDisplayName = props.changeDisplayName
    const cancelEdit = props.cancelEdit
    const uid = props.uid
    const s = props.s
    const setS = props.setS

    useEffect(() => {
        // EditModal.setAppElement('app');
    }, [])
    function handleSubmit(e, dataType, data) {
        e.preventDefault();
        console.log(dataType)
        console.log(data)

        db.collection("users").doc(uid).update({
            [dataType]: data,
        });
        setS(!s)
          
    }   
    return (
        <div>
            <h3>Headline: {headline}</h3> <EditModal data={headline} changeData={changeHeadline} handleSubmit={handleSubmit} name={"headline"}/>
            <h3>Bio: {bio}</h3> <EditModal data={bio} changeData={changeBio} handleSubmit={handleSubmit} name={"bio"}/>
            <h3>Pronouns: {pronouns}</h3> <EditModal data={pronouns} changeData={changePronouns} handleSubmit={handleSubmit} name={"pronouns"}/>
            <h3>Display Name: {displayName}</h3> <EditModal data={displayName} changeData={changeDisplayName} handleSubmit={handleSubmit} name={"displayName"}/>
            <h3>Spotify Link: {spotifyLink}</h3> <EditModal data={spotifyLink} changeData={changeSpotifyLink} handleSubmit={handleSubmit} name={"spotifyLink"}/>
            <h3>Youtube Link: {youtubeLink}</h3> <EditModal data={youtubeLink} changeData={changeYoutubeLink} handleSubmit={handleSubmit} name={"youtubeLink"}/>
            <h3>Soundcloud Link: {soundcloudLink}</h3> <EditModal data={soundcloudLink} changeData={changeSoundcloudLink} handleSubmit={handleSubmit} name={"soundcloudLink"}/>
            <button type="button" onClick={() => cancelEdit()}>Exit</button>
        </div>
    )
}