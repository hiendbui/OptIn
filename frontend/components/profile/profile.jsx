import React from 'react';
import { ImPencil} from 'react-icons/im';
import { IconContext } from "react-icons"
import { GrClose } from 'react-icons/gr';
import { AiOutlinePlus } from 'react-icons/ai';
import SideBarContainer from '../sidebar/sidebar_container';
import Main from './main';
import MainForm from './main_form';
import Experience from './experience';
import ExperienceForm from './experience_form';
import Education from './education';
import Achievement from './achievement';



export default class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.props.clearProfileItems();
        this.done = false;
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
        
        this.myProfile = this.myProfile.bind(this);
        this.setRef = this.setRef.bind(this);
        this.showForm = this.showForm.bind(this);
        this.showItemForm = this.showItemForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleCreateEdu = this.handleCreateEdu.bind(this);
        this.handleEditEdu = this.handleEditEdu.bind(this);
        this.handleDeleteEdu = this.handleDeleteEdu.bind(this);
        this.handleCreateAch = this.handleCreateAch.bind(this);
        this.handleEditAch = this.handleEditAch.bind(this);
        this.handleDeleteAch = this.handleDeleteAch.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
        this.defaultPic = ['https://optin-dev.s3-us-west-1.amazonaws.com/default_company.png']
    }

    
    fetchExpLogo(institution, id) {
        const company = institution.split(' ').join('').toLowerCase()
        return $.ajax({
            method: 'GET',
            url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`,
        })
            .then((data) => {
                this.setState({
                        expLogos: {
                        ...this.state.expLogos, 
                        [id]: data[0] ? [ data[0]['logo'], data[0]['domain'] ] : this.defaultPic
                    }
                })        
            })
    };

    fetchEduLogo(institution, id) {
        const school = institution.split(' ').join('').toLowerCase()
        return $.ajax({
            method: 'GET',
            url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${school}`,
        })
            .then((data) => {
                this.setState({
                        eduLogos: {
                        ...this.state.eduLogos, 
                        [id]: data[0] ? [ data[0]['logo'], data[0]['domain'] ] : this.defaultPic
                    }
                })        
            })
    };

    myProfile() {
        if (this.props.currentUser) return this.props.currentUser.profile.id === this.props.profileId;
    }
    
    componentDidMount() {
        this.props.fetchCurrentProfConnections()
        this.props.fetchAllProfiles()
        .then(() => this.props.fetchProfile(this.props.profile))
        .then(() => this.done = true)
        .then(() => this.setState({profile: this.props.profile}))
        .then(()=> {if (this.props.connected) this.setState({status: this.props.connected.includes(this.props.profile ? this.props.profile.id : this.props.profileId) ? 'Disconnect' : 'Connect'})})
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

    loading() {
        return (
            <img className="loading" src={window.loading} width="25" height="25" />
        )
    }

    setRef(el, ref) {
        this[ref] = el;
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
                <Main
                    profile={this.state.profile}
                    profileId={this.props.profileId}
                    myProfile={this.myProfile}
                    showForm={this.showForm}
                    handleConnect={this.handleConnect}
                    connections={this.props.connections}
                    status={this.state.status}
                    done={this.done}
                />
                <MainForm
                    modalMain={this.state.modalMain}
                    modalAbout={this.state.modalAbout}  
                    closeForm={this.closeForm} 
                    profile={this.state.profile} 
                    handleSubmit={this.handleSubmit.bind(this)} 
                    handleFile={this.handleFile.bind(this)} 
                    handleChange={this.handleChange.bind(this)}
                    setRef={this.setRef}
                />
                <div className='prof-details'>
                    <div className='about'>
                        <br/>
                        <label>About</label>
                        <br/>
                        <p>{this.done ? this.state.profile.description : this.loading()}</p>
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
                            <div className='add' onClick={this.showItemForm('modalExp','add-exp')}>
                                <AiOutlinePlus />
                            </div>
                            </div>  
                            </label>
                            {!this.done ? this.loading() : 
                                this.state.experiences?.sort((a, b) => {
                                    return this.orderDates(b.endDate) - this.orderDates(a.endDate)})?.map((experience) => {
                                        return <Experience
                                                    key={experience.id}
                                                    experience={experience}
                                                    logos={this.state.expLogos}
                                                    fetchLogo={this.fetchExpLogo.bind(this)}
                                                    myProfile={this.myProfile}
                                                    showForm={this.showItemForm}
                                                />    
                                    })
                            }
                        </div>
                        <ExperienceForm
                            modal={this.state.modalExp} 
                            experience={this.state.experience} 
                            closeForm={this.closeForm} 
                            handleCreate={this.handleCreateExp.bind(this)} 
                            handleEdit={this.handleEditExp.bind(this)} 
                            handleChange={this.handleExpChange.bind(this)} 
                            handleDelete={this.handleDeleteExp.bind(this)} 
                            setRef={this.setRef}
                        />
    
                        <div className='border'></div>
                        <div className='educations'>
                            <label>Education
                            <div className={this.myProfile() ? 'reveal' : 'hide'}>  
                                <div className='add' onClick={this.showItemForm('modalEdu', 'add-edu')}>
                                    <AiOutlinePlus />
                                </div>
                            </div>
                            </label>
                 
                            {!this.done ? this.loading() : 
                                this.state.educations?.sort((a, b) => {
                                     return b.endYear - a.endYear })?.map((education) => {
                                         return <Education
                                                    key={education.id}
                                                    education={education}
                                                    logos={this.state.eduLogos}
                                                    fetchLogo={this.fetchEduLogo.bind(this)}
                                                    myProfile={this.myProfile}
                                                    showForm={this.showItemForm}
                                                />    
                                    })
                            }
                        </div>
                    </div>
                    <div className='ach-container'>
                    <div className='achievements'>
                        <label>Achievements
                            <div className={this.myProfile() ? 'reveal' : 'hide'}> 
                                <div className='add' onClick={this.showItemForm('modalAch', 'add-ach')}>
                                    <AiOutlinePlus />
                                </div>
                            </div>
                        </label>
                        {!this.done ? this.loading() : this.state.achievements?.map((achievement) => (
                            <Achievement
                                key={achievement.id}
                                achievement={achievement}
                                myProfile={this.myProfile}
                                showForm={this.showItemForm}
                            />    
                        ))}
                    </div>
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
