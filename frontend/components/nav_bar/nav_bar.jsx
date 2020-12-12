import React from 'react';
import { Link } from 'react-router-dom';
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
        const url = this.props.session && this.state.profile && this.state.profile.photoUrl ? this.state.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/3vGwZcA6dzTsc3DGGCBkbLgt'
        return (
            <div className="nav-bar">
                <Link to="/feed"><button id="logo-navbar"><img src={window.logo} /></button></Link>
                <IconContext.Provider value={{ style: { fontSize: '23px'} }}>
                    <button></button>
                    <button></button>
                    <button onClick={this.handleClick}>
                        <div className='dropdown'>
                        <img src={url} width="23" height="23"/>
                        <br />
                        <span>Me ▾</span> 
                        <div className={this.state.dropdown}>
                            <img src={url} width="40" height="40"/>
                            <span>{fullName}</span>
                            <br/>
                            <span>{headline}</span>
                            <Link to={`/in/${fullName.toLowerCase().split(' ').join('-')}-${this.props.users[this.props.session.id].id}`}><span>View Profile</span></Link> 
                            <p onClick={() => this.props.logout()}>Log out</p>
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
                    <button>
                        <IoMdPeople />
                        <br/>
                        <span>My Network</span>
                    </button>
                    <button>
                        <ImHome3 />
                        <br/>
                        <span>Home</span>
                    </button>
                </IconContext.Provider>
            </div>
        )
    }
}