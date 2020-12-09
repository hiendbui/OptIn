import React from 'react';
import { Link } from 'react-router-dom';
import { ImHome3 } from 'react-icons/im';
import { IoMdPeople, IoMdNotifications } from 'react-icons/io'; 
import { BsFillBriefcaseFill, BsPersonFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { IconContext } from "react-icons"

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <img src={window.logo} id="logo-navbar" />
                <IconContext.Provider value={{ style: { fontSize: '25px'} }}>
                    <button>
                        <BsPersonFill />
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