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
        .then(() => this.props.fetchCurrentProfConnections());
    }

    handleClick(profileId) {
        return (e) => {
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
                <div className={/*this.props.connected.length > 0 ? */'connected' /*: 'hide'*/}> {/* May make change later to have connections block not display if user has no connections*/}
                <h1>Connections</h1>
                    {this.props.connected.map((profile) => {
                        if ( profile && this.status[profile.id] !== 'Disconnect' )
                        return(
                            <div className='profile-block' key={profile.id}>
                                <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" />
                                <div className='link'><Link to={{ pathname: `/in/${profile.fullName.toLowerCase().split(' ').join('-')}-${profile.id}`, state:{profile: profile} }}><div> <img className='profile-img' src={
                                    profile.photoUrl ?
                                        profile.photoUrl :
                                        'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                                    width="105"
                                    height="105" /><p>{profile.fullName}</p></div></Link>
                                    
                                <p className='headline'>{profile.headline}</p>
                            </div>
                                
                                
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
                                    <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" />
                                    <div className='link'><Link to={{ pathname: `/in/${profile.fullName.toLowerCase().split(' ').join('-')}-${profile.id}`, state: { profile: profile } }}><div> <img className='profile-img' src={
                                        profile.photoUrl ?
                                            profile.photoUrl :
                                            'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                                        width="105"
                                        height="105" /><p>{profile.fullName}</p></div></Link>
                                        <p className='headline'>{profile.headline}</p>   
                                    </div>
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