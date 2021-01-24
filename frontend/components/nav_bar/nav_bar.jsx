import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ImHome3 } from 'react-icons/im';
import { IoMdPeople, IoMdNotifications } from 'react-icons/io'; 
import { BsFillBriefcaseFill, BsPersonFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { IconContext } from "react-icons";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { profile: this.props.users[this.props.session.id].profile, dropdown: 'hidden'};
        this.handleClick = this.handleClick.bind(this);
        this.props.fetchAllProfiles();
        this.goToMyProfile = this.goToMyProfile.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault()
        this.state.dropdown === 'hidden' ? this.setState({ dropdown: 'revealed'}) : this.setState({ dropdown: 'hidden'})
        this.setState({ profile: this.props.users[this.props.session.id].profile})
    }

    goToMyProfile() {
        const curProfId = this.props.users[this.props.session.id].profile.id;
        this.props.clearProfileItems();
        this.props.fetchProfile({id: curProfId});
        this.props.history.push(`/in/${this.state.profile?.fullName.toLowerCase().split(' ').join('-')}-${curProfId}`);
    }
    render() {
        let fullName = ""
        let headline = ""
        if (this.state.profile) {
            fullName = this.state.profile.fullName;
            headline = this.state.profile.headline
        }
        const url = this.props.session && this.state.profile && this.state.profile.photoUrl ? this.state.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'
        return (
            <div>
            <div className="nav-bar">
                <Link to="/feed"><button id="logo-navbar"><img src={window.logo} /></button></Link>
                <IconContext.Provider value={{ style: { fontSize: '20px'} }}>
                    <button></button>
                    <button></button>
                    <button className='hover'onClick={this.handleClick}>
                        <div className='dropdown'>
                        <img id='navbar-pic' src={url} width="22.5" height="22.5"/>
                        <br />
                        <span>Me ▾</span> 
                        <div className={this.state.dropdown}>
                            <img id='dropdown-pic' src={url} width="45" height="45"/>
                            <p>{fullName}</p>
                            <p>{headline}</p>
                                <div onClick={this.goToMyProfile}> <div> <span>View Profile</span></div></div> 
                            <p>{'\xa0'}</p>
                            <div onClick={() => this.props.logout()}><span>Log out</span></div>
                        </div>
                        </div>
                    </button>
                    <div className='dropdown'></div>
                    <div className='no-hover'>
                        <span class="tooltip">Feature not available</span>    
                        <IoMdNotifications />
                        <br />
                        <span>Notifications</span>
                    </div>
                    <div className='no-hover'>
                        <span class="tooltip" >Feature not available</span>    
                        <RiMessage2Fill />
                        <br />
                        <span>Messaging</span>
                    </div>
                    <Link to={'/jobs'}>
                    <button className='hover'>
                        <BsFillBriefcaseFill />
                        <br />
                        <span>Jobs</span>
                    </button>
                    </Link>
                    <Link to={'/mynetwork'}> 
                    <button className='hover'>
                        <IoMdPeople />
                        <br/>
                        <span>My Network</span>
                    </button>
                    </Link>
                    <Link to={'/feed'}> 
                    <button className='hover'>  
                        <ImHome3 />
                        <br/>
                        <span>Home</span>
                    </button>
                    </Link>
                </IconContext.Provider>
            </div>
            <div id="gap"></div>
            </div>
        )
    }
}