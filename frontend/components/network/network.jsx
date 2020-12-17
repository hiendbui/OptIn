import React from 'react';
import { Link } from 'react-router-dom';

export default class Network extends React.Component {
    constructor(props) {
        super(props);
        this.status = {};
        this.handleClick = this.handleClick.bind(this)
    }
    
    componentDidMount() {
        this.props.fetchAllProfiles()
        .then(() => this.props.fetchProfile(this.props.userProfile))
    }

    handleClick(profileId) {
        return (e) => {
            console.log(this.status[profileId])
            if (this.status[profileId] === 'Disconnect') {
                this.status[profileId] = 'Connect'
                this.props.destroyConnection(profileId)

            } else {
                this.status[profileId] = 'Disconnect'
                this.props.createConnection(profileId)
                }
        }
    }

    render() {
        return (
            <div className='network'>
                <div className="connected">
                <h1>Connections</h1>
                    {this.props.connected.map((profile) => {
                        if (this.status[profile.id] !== 'Disconnect' )
                        return(
                            <div className='profile-block' key={profile.id}>
                                <img className='profile-view' src={
                                    profile.photoUrl ? 
                                    profile.photoUrl : 
                                    'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'} 
                                    width="100" 
                                    height="100"/>
                                <div><Link to={{ pathname: `/in/${profile.fullName.toLowerCase().split(' ').join('-')}-${profile.id}` }}><div> <span>{profile.fullName}</span></div></Link></div>
                                
                                <p>{profile.headline}</p>
                                
                            </div>
                            )}
                    )}
                    
                </div>
                <div className='suggested'>
                <h1>People you may know</h1>
                        {this.props.notConnected.map((profile) => {
                            if (!this.status[profile.id]) this.status[profile.id] = 'Connect'
                            if (profile.id !== this.props.userProfile.id && (!this.props.connected.includes(profile) || this.status[profile.id] === 'Disconnect'))
                            return (
                                <div className='profile-block' key={profile.id}>
                                    <img className='profile-view' src={
                                        profile.photoUrl ?
                                            profile.photoUrl :
                                            'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                                        width="100"
                                        height="100" />
                                    <div><Link to={{ pathname: `/in/${profile.fullName.toLowerCase().split(' ').join('-')}-${profile.id}` }}><div> <span>{profile.fullName}</span></div></Link></div>
                                    <p>{profile.headline}</p>
                                    <button onClick={this.handleClick(profile.id)}>{this.status[profile.id]}</button>
                                </div>
                            )
                        }
                        )}  
                </div>
            </div>
        )
    }
}