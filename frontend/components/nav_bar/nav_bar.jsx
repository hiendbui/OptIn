import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ImHome3 } from 'react-icons/im';
import { IoMdPeople, IoMdNotifications } from 'react-icons/io'; 
import { BsFillBriefcaseFill, BsPersonFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { IconContext } from "react-icons"

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { profile: this.props.users[this.props.session.id].profile, dropdown: 'hidden'}
        this.handleClick = this.handleClick.bind(this)
        this.props.fetchAllProfiles()
    }
    
    handleClick(e) {
        e.preventDefault()
        this.state.dropdown === 'hidden' ? this.setState({ dropdown: 'revealed'}) : this.setState({ dropdown: 'hidden'})
        this.setState({ profile: this.props.users[this.props.session.id].profile})
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
                    <button onClick={this.handleClick}>
                        <div className='dropdown'>
                        <img id='navbar-pic' src={url} width="22.5" height="22.5"/>
                        <br />
                        <span>Me ▾</span> 
                        <div className={this.state.dropdown}>
                            <img id='dropdown-pic' src={url} width="45" height="45"/>
                            <p>{fullName}</p>
                            <p>{headline}</p>
                                <div><Link to={{pathname: this.state.profile ? `/in/${fullName.toLowerCase().split(' ').join('-')}-${this.props.users[this.props.session.id].profile.id}` : null, state: {users: this.props.users}}} ><div> <span>View Profile</span></div></Link></div>
                            <p>{'\xa0'}</p>
                            <div onClick={() => this.props.logout()}><span>Log out</span></div>
                        </div>
                        </div>
                    </button>
                    <div className='dropdown'></div>
                    <button>
                        <IoMdNotifications />
                        <br />
                        <span>Notifications</span>
                    </button>
                    <button>
                        <RiMessage2Fill />
                        <br />
                        <span>Messaging</span>
                    </button>
                    <button>
                        <BsFillBriefcaseFill />
                        <br />
                        <span>Jobs</span>
                    </button>
                    <Link to={'/mynetwork'}> 
                    <button>
                        <IoMdPeople />
                        <br/>
                        <span>My Network</span>
                    </button>
                    </Link>
                    <Link to={'/feed'}> 
                    <button>  
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