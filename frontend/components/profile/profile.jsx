import React from 'react';
import { ImPencil} from 'react-icons/im';
import { IconContext } from "react-icons"

export default class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {profile: this.props.profile, modalMain: 'hidden-modal', modalAbout: 'hidden-modal' }
        this.showForm = this.showForm.bind(this)
    }
    
    componentDidMount() {
        this.props.fetchAllProfiles(this.props.currentUser)
            .then(() => this.props.fetchProfile(this.props.profile))
            .then(() => this.setState({profile: this.props.profile}))
    }
    
    showForm(field) {
        return (e) => this.setState({[field]: 'modal'})
    }
    render() {
        console.log(this.props.profile)
        if (!this.state.profile) {
            this.state.profile = {
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
                            src={this.state.profile.photoUrl ? this.state.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/favpng_user-profile-2018-in-sight-user-conference-expo-business-default.png'}/>
                        <p>{this.state.profile.fullName}</p>
                        <p>{this.state.profile.location}</p>
                        <p>{this.state.profile.headline}</p>
                    </div>
                    <div>
                    <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div onClick={this.showForm('modalMain')}><ImPencil /></div>
                    </IconContext.Provider>
                    </div>
                </div>
                <div className='about'>
                    <br/>
                    <label>About</label>
                    <br/>
                    <p>{this.state.profile.description}</p>
                    <div>
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div onClick={this.showForm}><ImPencil /></div>
                        </IconContext.Provider>
                    </div>
                </div>
                <br/>
                <div className={`${this.state.modalMain}`}>
                    <div className='modal-screen'>

                    </div>

                    <div className='modal-form'>
                       <h1>Edit Intro</h1>
                        <div>
                        <img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" width='100%' />
                        <img
                            src={this.state.profile.photoUrl ? this.state.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/favpng_user-profile-2018-in-sight-user-conference-expo-business-default.png'} 
                            width='100px'
                            height='100px'
                            />
                        </div>
                       <br/>
                       <div className="input">
                           <label>Full Name
                           </label>
                           <input value={this.state.profile.fullName} type="text" />
                       </div>

                       <div className="input">
                           <label>Headline
                           </label>
                            <input value={this.state.profile.headline}type="text"/>
                       </div>

                        <div className="input">
                            <label>Location
                           </label>
                            <input value={this.state.profile.location}type="text" />
                        </div>

                       <div className="submit">
                           <button type="submit">Sign In</button>
                           </div>

                    </div>
                </div>
            </div>
        )
    }
}