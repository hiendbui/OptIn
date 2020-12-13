import React from 'react';
import { ImPencil} from 'react-icons/im';
import { IconContext } from "react-icons"

export default class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = this.props.profile
    }
    
    componentDidMount() {
        this.props.fetchAllProfiles(this.props.currentUser)
            .then(() => this.props.fetchProfile(this.props.profile))
            .then(() => this.setState(this.props.profile))
    }
    
    showForm() {
        
    }
    render() {
        console.log(this.props.profile)
        if (!this.state) {
            this.state = {
                fullName: '',
                location:'',
                headline:'',
                description: ''
            }
        }
        return (
            <div>
                <div className='main-profile'>
                    <img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt=""/>
                    <div className='profile-info'>
                        <img  
                            src={this.state.photoUrl ? this.state.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/favpng_user-profile-2018-in-sight-user-conference-expo-business-default.png'}/>
                        <p>{this.state.fullName}</p>
                        <p>{this.state.location}</p>
                        <p>{this.state.headline}</p>
                    </div>
                    <div>
                    <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div onClick={this.showForm}><ImPencil /></div>
                    </IconContext.Provider>
                    </div>
                </div>
                <div className='about'>
                    <br/>
                    <label>About</label>
                    <br/>
                    <p>{this.state.description}</p>
                    <div>
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div onClick={this.showForm}><ImPencil /></div>
                        </IconContext.Provider>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}