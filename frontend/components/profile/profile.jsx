import React from 'react';
import { ImPencil} from 'react-icons/im';
import { IconContext } from "react-icons"
import { GrClose } from 'react-icons/gr';
import { AiOutlinePlus } from 'react-icons/ai';
import NBATEAMS from '../../util/nba_teams';

//Please forgive me for this file being way too long lol.

export default class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            profile: {...this.props.profile, photoFile: null}, 
            modalMain: 'hidden-modal', 
            modalAbout: 'hidden-modal', 
            modalExp: 'hidden-modal' ,
            modalEdu: 'hidden-modal',
            modalAch: 'hidden-modal',
            logos: {},
            education: { },
            achievement: { },
            experience: { },
        };
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.handleFile = this.handleFile.bind(this);
        this.handleCreateExp = this.handleCreateExp.bind(this);
        this.handleEditExp = this.handleEditExp.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.showItemForm = this.showItemForm.bind(this)
    }

    
    fetchLogo(institution, id) {
        return $.ajax({
            method: 'GET',
            url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${institution.split(' ').join('').toLowerCase()}`,
        })
            .then((data) => {
                this.setState({logos: {...this.state.logos, [id]: data[0] ? data[0]['logo'] : 'https://optin-dev.s3-us-west-1.amazonaws.com/default_company.png'}})
            })
    };

    myProfile() {
        if (this.props.profile) return this.props.currentUser.id === this.props.profile.userId;
    }
    
    componentDidMount() {
        this.props.fetchAllProfiles()
        .then(() => this.props.fetchProfile(this.props.profiles[this.props.profileId]))
        .then(() => this.setState({profile: this.props.profile}))
        .then(() => this.props.experiences.forEach((experience) => { this.fetchLogo(experience.company, experience.id) }))
        .then(() => this.setState({ experience: {} }))
    }
    
    showForm(field) {
        return (e) => this.setState({[field]: 'modal'})
    }
    
    showItemForm(field, value, item) {
        // console.log(item) 
        return (e) => {
            this.setState({'experience': item })
            this.setState({[field]: value})
        }
    }
    
    closeForm(field) {
        return (e) => {
            this.setState({ [field]: 'hidden-modal' });
        }
    }
    
    
    
    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile[full_name]', this.state.profile.fullName);
        formData.append('profile[headline]', this.state.profile.headline);
        formData.append('profile[location]', this.state.profile.location);
        formData.append('profile[description]', this.state.profile.description);
        if (this.state.profile.photoFile) formData.append('profile[profile_pic]', this.state.profile.photoFile);
        this.props.updateProfile(formData, this.state.profile.id);
    }
    
    handleCreateExp(e) {
        e.preventDefault();
        this.props.createExperience(this.state.experience)
        .then(() => this.setState({ experience: {} }))
        .then(() => this.props.experiences.forEach((experience) => { this.fetchLogo(experience.company, experience.id) }))
    }

    handleEditExp(e){
        e.preventDefault();
        this.props.updateExperience(this.state.experience)
    }

    handleDeleteItem(func, id) {
        return (e) => {
            e.preventDefault();
            this.props[func](id);
        }
    }

    handleItemChange(field, item) {
        
        return (e) => {
            
            this.setState({ experience: { ...this.state.experience, [field]: e.target.value }})}
    }
    handleChange(field) {
        return (e) => this.setState({ profile: { ...this.state.profile, [field]: e.target.value }})
    }

    handleFile(e) {
        const img = e.currentTarget.files[0]
        const reader = new FileReader();
        reader.onloadend = (event) => {
            this.setState({ profile: { ...this.state.profile, ['photoUrl']: reader.result, ['photoFile']: img } })
        };
        reader.readAsDataURL(img);
        // console.log(this.state.profile)
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
            <div className='profile'>
                <div className='main-profile'>
                    <img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt=""/>
                    <div className='profile-info'>
                        <img  
                        src={this.state.profile.photoUrl ? this.state.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}/>
                        <p>{this.state.profile.fullName}</p>
                        <p>{this.state.profile.location}</p>
                        <p>{this.state.profile.headline}</p>
                    </div>
                    <div className={this.myProfile() ? 'reveal' : 'hide'}>
                    <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div onClick={this.showForm('modalMain')}><ImPencil /></div>
                    </IconContext.Provider>
                    </div>
                </div>
                <div className='prof-details'>
                    <div className='about'>
                        <br/>
                        <label>About</label>
                        <br/>
                        <p>{this.state.profile.description}</p>
                        <div className={this.myProfile() ? 'reveal' : 'hide'}>
                            <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                                <div onClick={this.showForm('modalAbout')}><ImPencil /></div>
                            </IconContext.Provider>
                        </div>
                    </div>
                    <br/>
                    <div className='exp-edu'>
                        <div className='experiences'>
                            <label>Experience
                            <div className='add' onClick={this.showItemForm('modalExp','add-exp')}><AiOutlinePlus /></div>
                            </label>
                            {this.props.experiences.map((experience) => {
                                return (<div key={experience.id}>
                                    <p fontSize="5px">{'\xa0'}</p>
                                    <img src={
                                        NBATEAMS.includes(experience.company) ? 
                                            `http://loodibee.com/wp-content/uploads/nba-${experience.company.toLowerCase().split(' ').join('-')}-logo.png` 
                                            : experience.photoUrl ? experience.photoUrl : this.state.logos[experience.id]}  width='60px' height='60px'></img>
                                    <div className="experience">
                                        <div className='title'>
                                            <div id='edit' className={this.myProfile() ? 'reveal' : 'hide'}>
                                                <div  onClick={this.showItemForm('modalExp', 'edit-exp', experience)}>
                                                        <ImPencil />
                                                </div>
                                            </div>
                                            {experience.title}
                                        </div>
                                        <p className='company'>{experience.company}</p>
                                        <p className='dates'>{experience.startDate} - {experience.endDate}</p>
                                        <p className='location'>{experience.location}</p>
                                        <p className='description'>{experience.description}</p>
                                        <br/>
                                    </div>
                                </div>
                                )
                             
                            })}
                        </div>
                        <div className='border'></div>
                        <div className='educations'>
                            <label>Education
                            <div className='add' onClick={this.showItemForm('modalEdu', 'add-edu')}><AiOutlinePlus /></div>
                            </label>
                 
                            {this.props.educations.map((education) => (
                                <div key={education.id}>
                                    <div></div>
                                    <img src={education.photoUrl} width='60px' height='60px' />
                                    <div className="education">
                                        <div className='school'>{education.school}
                                        <div id='edit' className={this.myProfile() ? 'reveal' : 'hide'}>
                                            <div  onClick={this.showItemForm('modalEdu', 'edit-edu', education.id)}><ImPencil /></div>
                                        </div>
                                        </div>
                                        <p className='degree-subject' >{education.degree ? education.degree : ""}{education.degree && education.subject ? ", " : ""}{education.subject}</p>
                                        <p className='years'>{education.startYear} - {education.endYear}</p>
                                        <p className='description'>{education.description}</p>
                                        <br />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='ach-container'>
                    <div className='achievements'>
                        <label>Achievements
                            <div className='add' onClick={this.showItemForm('modalAch', 'add-ach')}><AiOutlinePlus /></div>
                        </label>
                        {this.props.achievements.map((achievement) => (
                            <div key={achievement.id}>
                                <div className="achievement">
                                    <div className='title'>{achievement.title}
                                    <div id='edit' className={this.myProfile() ? 'reveal' : 'hide'}>
                                         <div  onClick={this.showItemForm('modalAch', 'edit-ach', achievement.id)}><ImPencil /></div>
                                    </div>
                                    </div>
                                    <p className='issuer-year' >{achievement.issuer ? achievement.issuer : ""}{achievement.issuer && achievement.year ? " · " : ""}{achievement.year}</p>
                                    <p className='description'>{achievement.description}</p>
                                    <br />
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
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
                            <input className='img-input' type="file" onChange={this.handleFile} />
                            <br />
                            <br/>
                            <div >
                                <label>Full Name *
                                </label>
                                <br/>
                                <input defaultValue={this.state.profile.fullName} required="required" type="text" onChange={this.handleChange('fullName')}/>    
                            </div>
                             <br />
                            <div >
                                <label>Headline *
                                </label>
                                 <br />
                                <input defaultValue={this.state.profile.headline} required="required" type="text" onChange={this.handleChange('headline')}/>
                            </div>
                             <br />
                             <div >
                                 <label>Location *
                                </label>
                                 <br />
                                <input defaultValue={this.state.profile.location} required="required" type="text" onChange={this.handleChange('location')} />
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

                
                <div className={`${this.state.modalExp}`}>
                    <div className='modal-screen'>

                    </div>

                    <div className='modal-exp-form'>
                        <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '15px' } }}>
                            <div className='close' onClick={this.closeForm('modalExp')}><GrClose /></div>
                        </IconContext.Provider>
                        
                        <h1>{`${this.state.modalExp.split('-')[0].charAt(0).toUpperCase() + this.state.modalExp.split('-')[0].slice(1)}`} Experience</h1>
                        <form onSubmit={!this.state.experience ? this.handleCreateExp : this.state.experience.id ? this.handleEditExp : this.handleCreateExp}>                                
                                <div >
                                    <label>Title *
                                </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.title : ""} required="required" type="text" onChange={this.handleItemChange('title','experience')} />
                                </div>
                                <br />
                                <div >
                                    <label>Company *
                                </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.company : ""} required="required" type="text" onChange={this.handleItemChange('company','experience')} />
                                </div>
                                <br />
                                <div >
                                    <label>Start Date (e.g. Feb 2018) *
                                </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.startDate : ""} required="required" type="text" onChange={this.handleItemChange('start_date','experience')} />
                                </div>
                                <br />
                                <div >
                                    <label>End Date (if current position, state 'Present') *
                                    </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.endDate : ""} required="required" type="text" onChange={this.handleItemChange('end_date', 'experience')} />
                                </div>
                                <br/>
                                <div >
                                    <label>Location
                                        </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.location : ""}  type="text" onChange={this.handleItemChange('location', 'experience')} />
                                </div>
                                <div className='delete'>
                                    <button onClick={this.handleDeleteItem('destroyExperience')} type="submit">Delete</button>
                                </div>
                                <div className="submit">
                                <button onClick={this.closeForm('modalExp')} type="submit">Save</button>
                                </div>
                                <br />
                        </form>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}
