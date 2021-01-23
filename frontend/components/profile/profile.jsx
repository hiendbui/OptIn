import React from 'react';
import { ImPencil} from 'react-icons/im';
import { IconContext } from "react-icons"
import { GrClose } from 'react-icons/gr';
import { AiOutlinePlus } from 'react-icons/ai';
import SideBarContainer from '../sidebar/sidebar_container';
import NBATEAMS from '../../util/nba_teams';



export default class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.props.clearProfileItems();
        this.state = {
            profile: {...this.props.profile, photoFile: null},
            modalMain: 'hidden-modal', 
            modalAbout: 'hidden-modal', 
            modalExp: 'hidden-modal' ,
            modalEdu: 'hidden-modal',
            modalAch: 'hidden-modal',
            expLogos: {},
            eduLogos: {},
            education: {},
            achievement: {},
            experience: {},
            status:  ''
        };
        
     
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.handleFile = this.handleFile.bind(this);
        this.showItemForm = this.showItemForm.bind(this);
        this.handleCreateExp = this.handleCreateExp.bind(this);
        this.handleEditExp = this.handleEditExp.bind(this);
        this.handleDeleteExp = this.handleDeleteExp.bind(this);
        this.handleCreateEdu = this.handleCreateEdu.bind(this);
        this.handleEditEdu = this.handleEditEdu.bind(this);
        this.handleDeleteEdu = this.handleDeleteEdu.bind(this);
        this.handleCreateAch = this.handleCreateAch.bind(this);
        this.handleEditAch = this.handleEditAch.bind(this);
        this.handleDeleteAch = this.handleDeleteAch.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
    }

    
    fetchExpLogo(institution, id) {
        return $.ajax({
            method: 'GET',
            url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${institution.split(' ').join('').toLowerCase()}`,
        })
            .then((data) => {
                console.log(data)
                this.setState({expLogos: {...this.state.expLogos, [id]: data[0] ? [data[0]['logo'],data[0]['domain']] : ['https://optin-dev.s3-us-west-1.amazonaws.com/default_company.png']}})
            })
    };

    fetchEduLogo(institution, id) {
        return $.ajax({
            method: 'GET',
            url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${institution.split(' ').join('').toLowerCase()}`,
        })
            .then((data) => {
                this.setState({ eduLogos: { ...this.state.eduLogos, [id]: data[0] ? [data[0]['logo'],data[0]['domain']] : ['https://optin-dev.s3-us-west-1.amazonaws.com/default_company.png'] } })
            })
    };

    myProfile() {
        if (this.props.currentUser) return this.props.currentUser.profile.id === this.props.profileId;
    }
    
    componentDidMount() {
        this.props.fetchCurrentProfConnections()
        this.props.fetchAllProfiles()
        .then(() => this.props.fetchProfile(this.props.profile))
        .then(() => this.setState({profile: this.props.profile}))
        // .then(() => this.props.experiences.forEach((experience) => { this.fetchExpLogo(experience.company, experience.id) }))
        // .then(() => this.props.educations.forEach((education) => { this.fetchEduLogo(education.school, education.id) }))
        .then(()=> {if (this.props.connected) this.setState({status: this.props.connected.includes(this.props.profile ? this.props.profile.id : this.props.profileId) ? 'Disconnect' : 'Connect'})})
        // .then(() => this.setState({ profile: this.props.profile }))


    }
    
    showForm(field) {
        return (e) => this.setState({[field]: 'modal'})
    }
    
    showItemForm(field, value, item) {
        return (e) => {
            field === 'modalExp' ? this.setState({ 'experience': item }) : field === 'modalEdu' ? this.setState({ 'education': item }) : this.setState({'achievement' : item})
            this.setState({[field]: value})
        }
    }
    
    closeForm(field, ref) {
        return (e) => {
            if (ref) this[ref].reset();
            this.setState({ [field]: 'hidden-modal' }) 
        }  
    }
    
    closeSavedForm(field, ref) {
        if (ref) this[ref].reset();
        this.setState({ [field]: 'hidden-modal' })    
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if (
                this.state.profile.fullName &&
                this.state.profile.headline &&
                this.state.profile.location
            ) {
            this.closeSavedForm('modalMain', 'mainRef')
        }
        this.closeSavedForm('modalAbout', 'aboutRef')
        const formData = new FormData();
        formData.append('profile[full_name]', this.state.profile.fullName);
        formData.append('profile[headline]', this.state.profile.headline);
        formData.append('profile[location]', this.state.profile.location);
        formData.append('profile[description]', this.state.profile.description);
        if (this.state.profile.photoFile) formData.append('profile[profile_pic]', this.state.profile.photoFile);
        this.props.updateProfile(formData, this.state.profile.id);
        if (this['mainRef']) this['mainRef'].reset();
    }
    
    handleChange(field) {
        return (e) => {
            this.setState({ profile: { ...this.state.profile, [field]: e.target.value }})
        }
    }
    
    handleFile(e) {
        const img = e.currentTarget.files[0]
        const reader = new FileReader();
        reader.onloadend = (event) => {
            this.setState({ profile: { ...this.state.profile, ['photoUrl']: reader.result, ['photoFile']: img } })
        };
        reader.readAsDataURL(img);
    }

    handleCreateExp(e) {
        e.preventDefault();
        if (
                this.state.experience.title &&
                this.state.experience.company &&
                this.state.experience.start_date &&
                this.state.experience.end_date
            ) {
            this.closeSavedForm('modalExp');
        }
        this['expRef'].reset();
        this.props.createExperience(this.state.experience)
        .then(() => this.props.experiences.forEach((experience) => { this.fetchExpLogo(experience.company, experience.id) }))
    }

    handleEditExp(e){
        e.preventDefault();
        if (
                this.state.experience.title &&
                this.state.experience.company &&
                this.state.experience.startDate &&
                this.state.experience.endDate
            ) {
            this.closeSavedForm('modalExp');
        }
        this['expRef'].reset();
        this.props.updateExperience(this.state.experience)
        .then(() => this.props.experiences.forEach((experience) => { this.fetchExpLogo(experience.company, experience.id) }))
    }

    handleDeleteExp(experience) {
        return (e) => {
            e.preventDefault();
            this.props.destroyExperience(experience.id);
            this.closeSavedForm('modalExp');
        }
    }

    handleExpChange(field) {
        return (e) => {
            this.setState({ experience: { ...this.state.experience, [field]: e.target.value }})
        }
    }

    handleCreateEdu(e) {
        e.preventDefault();
        if (this.state.education.school) this.closeSavedForm('modalEdu');
        this['eduRef'].reset();
        this.props.createEducation(this.state.education)
            .then(() => this.props.educations.forEach((education) => { this.fetchEduLogo(education.school, education.id) }))
    }

    handleEditEdu(e) {
        e.preventDefault();
        if (this.state.education.school) this.closeSavedForm('modalEdu');
        this['eduRef'].reset();
        this.props.updateEducation(this.state.education)
            .then(() => this.props.educations.forEach((education) => { this.fetchEduLogo(education.school, education.id) }))
    }

    handleDeleteEdu(education) {
        return (e) => {
            e.preventDefault();
            this.props.destroyEducation(education.id);
            this.closeSavedForm('modalEdu');
        }
    }

    handleEduChange(field) {
        return (e) => {
            this.setState({ education: { ...this.state.education, [field]: e.target.value } })
        }
    }

    handleCreateAch(e) {
        e.preventDefault();
        if (this.state.achievement.title) this.closeSavedForm('modalAch');
        this['achRef'].reset();
        this.props.createAchievement(this.state.achievement)
    }

    handleEditAch(e) {
        e.preventDefault();
        if (this.state.achievement.title) this.closeSavedForm('modalAch');
        this['achRef'].reset();
        this.props.updateAchievement(this.state.achievement)
    }

    handleDeleteAch(achievement) {
        return (e) => {
            e.preventDefault();
            this.props.destroyAchievement(achievement.id);
            this.closeSavedForm('modalAch');
        }
    }

    handleAchChange(field) {
        return (e) => {
            this.setState({ achievement: { ...this.state.achievement, [field]: e.target.value } })
        }
    }

    handleConnect(profileId) {
        return (e) => {
            if (this.state.status === 'Disconnect') {
                this.setState({status: 'Connect'})
                this.props.destroyConnection(profileId)
                .then(() => this.props.fetchProfile(this.props.profile))

            } else {
                this.setState({ status: 'Disconnect' })
                this.props.createConnection(profileId)
                    .then(() => this.props.fetchProfile(this.props.profile))
            }
        }
    }

    orderDates(x) {
        if (x === 'Present') return new Date().getFullYear() + 1; 
        const parsed = parseInt(x.slice(x.length - 4));
        if (isNaN(parsed)) return 0;
        return parsed;
    }

    render() {
        if (!this.props.profile) {
            this.state.profile = {
                fullName: '',
                location:'',
                headline:'',
                description: ''
            }
        } else if (this.state.profile.id !== this.props.profile.id) {
            this.state.profile = this.props.profile;
        } else {
            this.state.experiences = this.props.experiences;
            this.state.educations = this.props.educations;
            this.state.achievements = this.props.achievements;
        }
       
        return (
            <div className='profile'>
                <div className='main-profile'>
                    <img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt=""/>
                    <div className='profile-info'>
                        <img  
                        src={this.state.profile.photoUrl ? this.state.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}/>
                        <p>{this.state.profile.fullName}</p>
                        <p>{this.state.profile.location}{this.state.profile.location ? this.props.connections ? this.props.connections > 1 ? ` · ${this.props.connections} connections` : ' · 1 connection' : '' : ''}</p>
                        <p>{this.state.profile.headline}</p>
                    </div>
                    <div className={this.myProfile() ? 'reveal' : 'hide'}>
                    <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                            <div onClick={this.showForm('modalMain')}><ImPencil /></div>
                    </IconContext.Provider>
                    </div>
                    <button className={this.myProfile() ? 'hide' : 'connect'} onClick={this.handleConnect(this.props.profileId)}>{this.state.status}</button>
                </div>
                <div className='prof-details'>
                    <div className='about'>
                        <br/>
                        <label>About</label>
                        <br/>
                        <p>{this.state.profile.description ? this.state.profile.description : ''}</p>
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
                            <div className={this.myProfile() ? 'reveal' : 'hide'}>  
                            <div className='add' onClick={this.showItemForm('modalExp','add-exp')}><AiOutlinePlus /></div>
                            </div>  
                            </label>
                            {this.state.experiences?.sort((a, b) => { return this.orderDates(b.endDate) - this.orderDates(a.endDate)})?.map((experience) => {
                                if (!this.state.expLogos[experience.id]) this.fetchExpLogo(experience.company, experience.id);
                                const company = experience.company === 'Philadelphia 76ers' ? 'sixers' : experience.company;
                                const domain = experience.company in NBATEAMS ? `https://www.nba.com/${company.split(' ').slice(-1)[0].toLowerCase()}`: this.state.expLogos[experience.id]?.length > 1 ? `https://www.${this.state.expLogos[experience.id][1]}`: '' 
                                const cursor = !domain ? 'default' : '';
                                const event = !domain ? 'none' : '';
                                return (<div key={experience.id}>
                                    <p fontSize="5px">{'\xa0'}</p>
                                    <a href={domain} target="_blank" style={{cursor:cursor, pointerEvents:event }} >
                                        <img src={
                                        experience.company in NBATEAMS ? 
                                            `https://sportsfly.cbsistatic.com/fly-62/bundles/sportsmediacss/images/team-logos/nba/${NBATEAMS[experience.company]}.svg` 
                                            : experience.company === 'LinkedIn' || experience.company === 'OptIn' ? 'https://www.flaticon.com/svg/static/icons/svg/174/174857.svg' 
                                            : experience.photoUrl ? experience.photoUrl : this.state.expLogos[experience.id] ? this.state.expLogos[experience.id][0] : 
                                            '' }  width='60px' height='60px'>
                                        </img>
                                    </a>
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
                            <div className={this.myProfile() ? 'reveal' : 'hide'}>  
                                <div className='add' onClick={this.showItemForm('modalEdu', 'add-edu')}><AiOutlinePlus /></div>
                            </div>
                            </label>
                 
                            {this.state.educations?.sort((a, b) => { return b.endYear - a.endYear })?.map((education) => {
                                if (!this.state.eduLogos[education.id]) this.fetchEduLogo(education.school, education.id);
                                const domain = this.state.eduLogos[education.id]?.length > 1 ? `https://www.${this.state.eduLogos[education.id][1]}`: '' 
                                const cursor = !domain ? 'default' : '';
                                const event = !domain ? 'none' : '';
                                return (
                                <div key={education.id}>
                                    <div></div>
                                    <a href={domain} target="_blank" style={{cursor:cursor, pointerEvents:event }} >
                                        <img src={education.photoUrl ? education.photoUrl : 
                                            this.state.eduLogos[education.id] ? this.state.eduLogos[education.id][0] : 
                                            this.fetchEduLogo(education.school, education.id)} width='60px' height='60px' 
                                        />
                                    </a>
                                    <div className="education">
                                        <div className='school'>{education.school}
                                        <div id='edit' className={this.myProfile() ? 'reveal' : 'hide'}>
                                            <div  onClick={this.showItemForm('modalEdu', 'edit-edu', education)}><ImPencil /></div>
                                        </div>
                                        </div>
                                        <p className='degree-subject' >{education.degree ? education.degree : ""}{education.degree && education.subject ? ", " : ""}{education.subject}</p>
                                        <p className='years'>{education.startYear} {education.startYear && education.endYear ? '-' : ''} {education.endYear}</p>
                                        <p className='description'>{education.description}</p>
                                        <br />
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                    <div className='ach-container'>
                    <div className='achievements'>
                        <label>Achievements
                            <div className={this.myProfile() ? 'reveal' : 'hide'}> 
                                <div className='add' onClick={this.showItemForm('modalAch', 'add-ach')}><AiOutlinePlus /></div>
                            </div>
                        </label>
                        {this.state.achievements?.map((achievement) => (
                            <div key={achievement.id}>
                                <div className="achievement">
                                    <div className='title'>{achievement.title}
                                    <div id='edit' className={this.myProfile() ? 'reveal' : 'hide'}>
                                         <div  onClick={this.showItemForm('modalAch', 'edit-ach', achievement)}><ImPencil /></div>
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
                            <div className='close' onClick={this.closeForm('modalMain','mainRef')}><GrClose /></div>
                        </IconContext.Provider>
                       <h1>Edit intro</h1>
                    <img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" width='100%' />
                        <div>
                        <img
                            src={this.state.profile.photoUrl ? this.state.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'} 
                            width='120px'
                            height='120px'
                            className='profile-pic'
                            />
                        </div>
                       <br/>
                       <br/>
                       <br/>
                        <form ref={(el) => this['mainRef'] = el} onSubmit={this.handleSubmit}>
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
                                <button type="submit">Save</button>
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
                        <form ref={(el) => this['aboutRef'] = el} onSubmit={this.handleSubmit}>
                            <label>Summary</label>
                            <br/>
                            <textarea defaultValue={this.state.profile.description} cols="30" rows="10" onChange={this.handleChange('description')}></textarea>
                            <div className="submit">
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>

                
                <div className={`${this.state.modalExp}`}>
                    <div className='modal-screen'>

                    </div>

                    <div className='modal-exp-form'>
                        <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '5px' } }}>
                            <div className='close' onClick={this.closeForm('modalExp','expRef')}><GrClose /></div>
                        </IconContext.Provider>
                        
                        <h1>{`${this.state.modalExp.split('-')[0].charAt(0).toUpperCase() + this.state.modalExp.split('-')[0].slice(1)}`} experience</h1>
                        <form ref={(el) => this['expRef'] = el} 
                            onSubmit={!this.state.experience ? this.handleCreateExp : this.state.experience.id ? this.handleEditExp : this.handleCreateExp}>                                
                                <div >
                                    <label>Title *
                                </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.title : ""} required="required" type="text" onChange={this.handleExpChange('title')} />
                                </div>
                                <br />
                                <div >
                                    <label>Company *
                                </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.company : ""} required="required" type="text" onChange={this.handleExpChange('company')} />
                                </div>
                                <br />
                                <div >
                                    <label>Start Date (e.g. Jun 2018) *
                                </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.startDate : ""} required="required" type="text" onChange={this.handleExpChange('start_date')} />
                                </div>
                                <br />
                                <div >
                                    <label>End Date (if current position, state 'Present') *
                                    </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.endDate : ""} required="required" type="text" onChange={this.handleExpChange('end_date')} />
                                </div>
                                <br/>
                                <div >
                                    <label>Location
                                        </label>
                                    <br />
                                <input defaultValue={this.state.experience ? this.state.experience.location : ""}  type="text" onChange={this.handleExpChange('location')} />
                                </div>
                                <br/>
                                <div > 
                                    <label>Description
                                        </label>
                                    <br /> 

                                <textarea cols="30" rows="5" defaultValue={this.state.experience ? this.state.experience.description : ""} type="textarea" onChange={this.handleExpChange('description')}></textarea>
                                </div>
                                <br/>
                                <div className='delete'>
                                    <button onClick={this.handleDeleteExp(this.state.experience)} type="submit">Delete</button>
                                </div>
                                <div className="submit">
                                <button type="submit">Save</button>
                                </div>
                                <br />
                        </form>
                    </div>
                </div>
                {/* Modal Form for education */}
                <div className={`${this.state.modalEdu}`}>
                    <div className='modal-screen'>

                    </div>

                    <div className='modal-edu-form'>
                        <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '5px' } }}>
                            <div className='close' onClick={this.closeForm('modalEdu', 'eduRef')}><GrClose /></div>
                        </IconContext.Provider>

                        <h1>{`${this.state.modalEdu.split('-')[0].charAt(0).toUpperCase() + this.state.modalEdu.split('-')[0].slice(1)}`} education</h1>
                        <form ref={(el) => this['eduRef'] = el}
                            onSubmit={!this.state.education ? this.handleCreateEdu : this.state.education.id ? this.handleEditEdu : this.handleCreateEdu}>
                            <div >
                                <label>School *
                                </label>
                                <br />
                                <input defaultValue={this.state.education ? this.state.education.school : ""} required="required" type="text" onChange={this.handleEduChange('school')} />
                            </div>
                            <br />
                            <div >
                                <label>Degree 
                                </label>
                                <br />
                                <input defaultValue={this.state.education ? this.state.education.degree : ""}  type="text" onChange={this.handleEduChange('degree')} />
                            </div>
                            <br />
                            <div >
                                <label>Subject 
                                </label>
                                <br />
                                <input defaultValue={this.state.education ? this.state.education.subject : ""}  type="text" onChange={this.handleEduChange('subject')} />
                            </div>
                            <br />
                            <div >
                                <label>Start Year
                                    </label>
                                <br />
                                <input defaultValue={this.state.education ? this.state.education.startYear : ""}  type="text" onChange={this.handleEduChange('start_year')} />
                            </div>
                            <br />
                            <div >
                                <label>End Year
                                        </label>
                                <br />
                                <input defaultValue={this.state.education ? this.state.education.endYear : ""} type="text" onChange={this.handleEduChange('end_year')} />
                            </div>
                            <br />
                            <div >
                                <label>Description
                                        </label>
                                <br />

                                <textarea cols="30" rows="5" defaultValue={this.state.education ? this.state.education.description : ""} type="textarea" onChange={this.handleEduChange('description')}></textarea>
                            </div>
                            <br />
                            <div className='delete'>
                                <button onClick={this.handleDeleteEdu(this.state.education)} type="submit">Delete</button>
                            </div>
                            <div className="submit">
                                <button type="submit">Save</button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>

                <div className={`${this.state.modalAch}`}>
                    <div className='modal-screen'>

                    </div>

                    <div className='modal-ach-form'>
                        <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '5px' } }}>
                            <div className='close' onClick={this.closeForm('modalAch', 'achRef')}><GrClose /></div>
                        </IconContext.Provider>

                        <h1>{`${this.state.modalAch.split('-')[0].charAt(0).toUpperCase() + this.state.modalAch.split('-')[0].slice(1)}`} achievement</h1>
                        <form ref={(el) => this['achRef'] = el}
                            onSubmit={!this.state.achievement ? this.handleCreateAch : this.state.achievement.id ? this.handleEditAch : this.handleCreateAch}>
                            <div >
                                <label>Title *
                                </label>
                                <br />
                                <input defaultValue={this.state.achievement ? this.state.achievement.title : ""} required="required" type="text" onChange={this.handleAchChange('title')} />
                            </div>
                            <br />
                            <div >
                                <label>Issuer
                                </label>
                                <br />
                                <input defaultValue={this.state.achievement ? this.state.achievement.issuer : ""} type="text" onChange={this.handleAchChange('issuer')} />
                            </div>
                            <br />
                            <div >
                                <label>Year(s)
                                </label>
                                <br />
                                <input defaultValue={this.state.achievement ? this.state.achievement.year : ""} type="text" onChange={this.handleAchChange('year')} />
                            </div>
                            <br />
                            <div >
                                <label>Description
                                        </label>
                                <br />

                                <textarea cols="30" rows="5" defaultValue={this.state.achievement ? this.state.achievement.description : ""} type="textarea" onChange={this.handleAchChange('description')}></textarea>
                            </div>
                            <br />
                            <div className='delete'>
                                <button onClick={this.handleDeleteAch(this.state.achievement)} type="submit">Delete</button>
                            </div>
                            <div className="submit">
                                <button type="submit">Save</button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
                <br/>
                <div className="sidebar-profile">
                    <SideBarContainer />
                </div>
            </div>
        )
    }
}
