import React from 'react'
import {Redirect, Link} from 'react-router-dom'

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {profile: {} }
        this.props.profiles.forEach(prof => {
                if (prof.fullName === 'Hien Bui') this.state.profile =prof;
        })
    }
    componentDidMount () {
        if (this.state.profile.fullName !== 'Hien Bui') {
            this.props.fetchAllProfiles()
            .then(() => {
            if (this.props.profiles) {
                this.props.profiles.forEach(prof => {
                    if (prof.fullName === 'Hien Bui') this.setState({profile:prof});
                })
            }
            })
        }
    }

    render() {
        return (
            <div className="sidebar">
            <div className='user-profile'>
                <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" />
                    <div className='link'><Link target="_blank" to={{ pathname: `/in/${this.state.profile.fullName?.toLowerCase().split(' ').join('-')}-${this.state.profile?.id}` }}><div> <img className='profile-img' src={
                    this.state.profile.photoUrl ?
                        this.state.profile.photoUrl :
                        'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                    width="75"
                    height="75" /> <p className='name'>{this.state.profile?.fullName}</p></div></Link>

                    <p className='headline'>{this.state.profile?.headline}</p>
                    
                        <a href="https://www.linkedin.com/in/hiendbui/" target="_blank">
                        <img id="linkedin" src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Wordmark-Black-Logo.wine.svg" />
                        </a>
                        <a href="https://github.com/hiendbui" target="_blank">
                            <img id="github" src="https://pngimg.com/uploads/github/github_PNG15.png" />
                        </a>
                        <a href="https://angel.co/u/hien-bui-6" target="_blank">
                            <img id="angellist" src="https://angel.co/images/static_pages/homepage/logo-angellist.png" />
                        </a>
                    
                </div>
            </div>
            </div>
        );
    }
}