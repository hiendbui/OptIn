import React from 'react'
import {Link} from 'react-router-dom'

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {profile: {} }
    }
    componentDidMount () {
        this.props.fetchAllProfiles()
        .then(() => {
        if (this.props.profiles) {
            this.props.profiles.forEach(prof => {
                if (prof.fullName === 'Hien Bui') this.setState({profile:prof});
            })
        }
        })
    }

    render() {
        return (
            <div className='sidebar'>
                {/* <span> Developer Profile</span> */}
            <div className='user-profile'>
                <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" />
                <div className='link'><Link to={{ pathname: `/in/${this.state.profile.fullName?.toLowerCase().split(' ').join('-')}-${this.state.profile?.id}` }}><div> <img className='profile-img' src={
                    this.state.profile.photoUrl ?
                        this.state.profile.photoUrl :
                        'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                    width="75"
                    height="75" /> <p className='name'>{this.state.profile?.fullName}</p></div></Link>

                    <p className='headline'>{this.state.profile?.headline}</p>
                    <br/>
                        <Link to={`/in/${this.state.profile.fullName?.toLowerCase().split(' ').join('-')}-${this.state.profile?.id}`}><button id="logo"><img src={window.logo} /></button></Link>
                    <a href="https://www.linkedin.com/in/hiendbui/">
                        <img id="linkedin" src="https://upload.wikimedia.org/wikipedia/commons/8/80/LinkedIn_Logo_2013.svg" />
                    </a>
                        <a href="https://github.com/hiendbui">
                            <img id="github" src="https://pngimg.com/uploads/github/github_PNG15.png" />
                        </a>
                    
                </div>
            </div>
            </div>
            
        );
    }
}