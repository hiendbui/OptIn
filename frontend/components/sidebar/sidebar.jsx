import React from 'react'
import {Link} from 'react-router-dom'

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.profile = {}
    }
    componentDidMount () {
        this.props.fetchAllProfiles()
    }

    render() {
        
        if (this.props.profiles) {
            this.props.profiles.forEach(prof => {
                if (prof.fullName === 'Hien Bui') this.profile = prof;
            })
        }

        return (
            <div className='user-profile'>
                <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" />
                <div className='link'><Link to={{ pathname: `/in/${this.profile.fullName?.toLowerCase().split(' ').join('-')}-${this.profile?.id}` }}><div> <img className='profile-img' src={
                    this.profile.photoUrl ?
                        this.profile.photoUrl :
                        'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                    width="75"
                    height="75" /> <p className='name'>{this.profile?.fullName}</p></div></Link>

                    <p className='headline'>{this.profile?.headline}</p>
                </div>
            </div>
            
        );
    }
}