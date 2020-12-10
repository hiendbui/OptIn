import React from 'react';
import { Link } from 'react-router-dom';
import { ImHome3 } from 'react-icons/im';
import { IoMdPeople, IoMdNotifications } from 'react-icons/io'; 
import { BsFillBriefcaseFill, BsPersonFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { IconContext } from "react-icons"

export default class NavBar extends React.Component {
    componentDidMount() {
        console.log(this.props.currentUser.profile)
        if (!this.props.userProfile) this.props.fetchProfile(this.props.currentUser.profile)
    }
    render() {
        const url = this.props.userProfile ? this.props.userProfile.photoUrl : 'https://i.stack.imgur.com/l60Hf.png'
        
        return (
            <div className="nav-bar">
                <Link to="/feed"><button id="logo-navbar"><img src={window.logo} /></button></Link>
                <IconContext.Provider value={{ style: { fontSize: '23px'} }}>
                    <button>
                        {/* <BsPersonFill /> */}
                        <img src={url} width="20" height="20"/>
                        <br />
                        <span>Me ▾</span>
                    </button>
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