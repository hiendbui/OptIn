import React from 'react';
import { ImPencil} from 'react-icons/im';
import { IconContext } from "react-icons"

export default ({ profile, profileId, myProfile, showForm, handleConnect, connections, status, done}) => {
    const coverPhoto = 'https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm';
    const defaultProfPic = 'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png';
    const numConnections = done && connections ? connections > 1 ? ` · ${connections} connections` : ' · 1 connection' : '';

    return (        
        <div className='main-profile'>
            <img src={coverPhoto} alt=""/>
            <div className='profile-info'>
                <img  
                src={profile.photoUrl ? profile.photoUrl : defaultProfPic}/>
                <p>{profile.fullName}</p>
                <p>{profile.location}{numConnections}</p>
                <p>{profile.headline}</p>
            </div>
            <div className={myProfile() ? 'reveal' : 'hide'}>
            <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                    <div onClick={showForm('modalMain')}><ImPencil /></div>
            </IconContext.Provider>
            </div>
            <button 
                className={myProfile() ? 'hide' : 'connect'} 
                onClick={handleConnect(profileId)}>{status}
            </button>
        </div>
    )
}