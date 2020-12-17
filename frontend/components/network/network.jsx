import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Network extends React.Component {
    
    componentDidMount() {
        this.props.fetchAllProfiles()
        .then(() =>this.props.fetchProfile(this.props.userProfile))
    }

    render() {
        return (
            <div>
                <h1>Connections</h1>
                <div>
                    {this.props.connected.map((profile) => {
                        return(
                            <div>
                                <img className='profile-view' src={
                                    profile.photoUrl ? 
                                    profile.photoUrl : 
                                    'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'} 
                                    width="100" 
                                    height="100"/>
                                <p>{profile.fullName}</p>
                                <p>{profile.headline}</p>
                                <div><Link to={{pathname: `/in/${profile.fullName.toLowerCase().split(' ').join('-')}-${profile.id}`}}><div> <span>View Profile</span></div></Link></div>
                            </div>
                            )}
                    )}
                    
                </div>
                <h1>People you may know</h1>
                <div>
                    
                        {this.props.notConnected.map((profile) => {
                            if (profile.id !== this.props.userProfile.id)
                            return (
                                <div>
                                    <img className='profile-view' src={
                                        profile.photoUrl ?
                                            profile.photoUrl :
                                            'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                                        width="100"
                                        height="100" />
                                    <p>{profile.fullName}</p>
                                    <p>{profile.headline}</p>
                                    <div><Link to={{ pathname: `/in/${profile.fullName.toLowerCase().split(' ').join('-')}-${profile.id}` }}><div> <span>View Profile</span></div></Link></div>
                                </div>
                            )
                        }
                        )}
                    
                </div>
            </div>
        )
    }
}