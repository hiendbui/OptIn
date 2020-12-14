import React from 'react';
import { ImPencil} from 'react-icons/im';
import { IconContext } from "react-icons"
import { GrClose } from 'react-icons/gr';

export default class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {profile: this.props.profile,  modalMain: 'hidden-modal', modalAbout: 'hidden-modal' }
        // this.showForm = this.showForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)   
    }

    myProfile() {
        if (this.props.currentUser.id !== this.props.profile.userId) return 'hide'
    }
    
    componentDidMount() {
        console.log(this.props.profileId)
        this.props.fetchAllProfiles()
            .then(() => this.props.fetchProfile(this.props.profiles[this.props.profileId]))
            .then(() => this.setState({profile: this.props.profile}))
    }
    
    showForm(field) {
        return (e) => this.setState({[field]: 'modal'})
    }

    closeForm(field) {
        return (e) => this.setState({ [field]: 'hidden-modal' })
    }

    handleSubmit(e) {
        e.preventDefault;
        this.props.updateProfile(this.state.profile);
    }

    handleChange(field) {
        return (e) => this.setState({ profile: { ...this.state.profile, [field]: e.target.value }})
    }
    render() {
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
                    <div className={`edit-${this.myProfile}`}>
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
                    <div className={`edit-${this.myProfile}`}>
                        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div onClick={this.showForm('modalAbout')}><ImPencil /></div>
                        </IconContext.Provider>
                    </div>
                </div>
                <br/>
                <div className={`${this.state.modalMain}`}>
                    <div className='modal-screen'>

                    </div>

                    <div className='modal-form'>
                        <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '15px' } }}>
                            <div className='close' onClick={this.closeForm('modalMain')}><GrClose /></div>
                        </IconContext.Provider>
                       <h1>Edit intro</h1>
                    <img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" width='100%' />
                        <div>
                        <img
                            src={this.state.profile.photoUrl ? this.state.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/favpng_user-profile-2018-in-sight-user-conference-expo-business-default.png'} 
                            width='120px'
                            height='120px'
                            className='profile-pic'
                            />
                        </div>
                       <br/>
                       <br/>
                       <br/>
                        <form onSubmit={this.handleSubmit}>
                            <label>Update Profile Pic</label>
                             <br />
                            <input className='img-input' type="file" />
                            <br />
                            <br/>
                            <div >
                                <label>Full Name *
                                </label>
                                <br/>
                                <input defaultValue={this.state.profile.fullName} type="text" onChange={this.handleChange('fullName')}/>    
                            </div>
                             <br />
                            <div >
                                <label>Headline *
                                </label>
                                 <br />
                                <input defaultValue={this.state.profile.headline} type="text" onChange={this.handleChange('headline')}/>
                            </div>
                             <br />
                             <div >
                                 <label>Location *
                                </label>
                                 <br />
                                <input defaultValue={this.state.profile.location} type="text" onChange={this.handleChange('location')} />
                             </div>
                             <br />
                            <div className="submit">
                                <button onClick={this.closeForm('modalMain')} type="submit">Save</button>
                             </div>
                             <br/>
                        </form>
                    </div>
                </div>
                
                <div className={`${this.state.modalAbout}`}>
                    <div className='modal-screen'>

                    </div>

                    <div className='modal-about-form'>
                        <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '15px' } }}>
                            <div className='close' onClick={this.closeForm('modalAbout')}><GrClose /></div>
                        </IconContext.Provider>
                        
                        <h1>Edit about</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>Summary</label>
                            <br/>
                            <textarea defaultValue={this.state.profile.description} cols="30" rows="10" onChange={this.handleChange('description')}></textarea>
                            <div className="submit">
                                <button onClick={this.closeForm('modalAbout')} type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}