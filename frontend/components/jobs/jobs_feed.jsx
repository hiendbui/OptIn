import React from 'react';
import SideBarContainer from '../sidebar/sidebar_container';
import NBATEAMS from '../../util/nba_teams';

export default class Network extends React.Component {
    constructor(props) {
        super(props);
        this.props.clearProfileItems();
        this.state = {expLogos: {}, eduLogos: {}};
        this.done = false;
    }
    
    componentDidMount() {
        this.props.fetchAllExperiences();
        this.props.fetchAllEducations()
    }

    fetchExpLogo(institution, id) {
        return $.ajax({
            method: 'GET',
            url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${institution.split(' ').join('').toLowerCase()}`,
        })
            .then((data) => {
                this.setState({expLogos: {...this.state.expLogos, [id]: data[0] ? [data[0]['logo'],data[0]['domain']] : ['https://optin-dev.s3-us-west-1.amazonaws.com/default_company.png']}})
            })
    };

    // fetchEduLogo(institution, id) {
    //     return $.ajax({
    //         method: 'GET',
    //         url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${institution.split(' ').join('').toLowerCase()}`,
    //     })
    //         .then((data) => {
    //             this.setState({ eduLogos: { ...this.state.eduLogos, [id]: data[0] ? [data[0]['logo'],data[0]['domain']] : ['https://optin-dev.s3-us-west-1.amazonaws.com/default_company.png'] } })
    //         })
    // };

    render() {
        
        this.props.experiences.forEach((experience,i) => {
            if (!this.state.expLogos[experience.id]) this.fetchExpLogo(experience.company, experience.id);
            if (i === this.props.experiences.length-1) {
                if (this.state.expLogos[experience.id]) this.done = true;
            }
        })
        return (
            <div className='network'>
                <div className='sidebar-network'>
                    <SideBarContainer/>
                </div>
                <div className={'connected'}> 
                <h1>Companies within your network</h1>
                    {this.props.experiences.map((experience) => {
                        // if (!this.state.expLogos[experience.id]) this.fetchExpLogo(experience.company, experience.id);
                        const company = experience.company === 'Philadelphia 76ers' ? 'sixers' : experience.company;
                        const domain = experience.company in NBATEAMS ? `https://www.nba.com/${company.split(' ').slice(-1)[0].toLowerCase()}`: this.state.expLogos[experience.id]?.length > 1 ? `https://www.${this.state.expLogos[experience.id][1]}`: '' 
                        if (!domain) return;
                        if (this.done) return(
                            <div className='exp-block' key={experience.id}>
                                <img className='cover' src="https://static-exp1.licdn.com/sc/h/cn3fr66ht7m34az3utaneh6ld" alt="" />
                                <div className='link'>
                                    <a href={domain} target="_blank"  >
                                        <img className='logo-img' src={
                                        experience.company in NBATEAMS ? 
                                            `https://sportsfly.cbsistatic.com/fly-62/bundles/sportsmediacss/images/team-logos/nba/${NBATEAMS[experience.company]}.svg` 
                                            : experience.company === 'LinkedIn' || experience.company === 'OptIn' ? 'https://www.flaticon.com/svg/static/icons/svg/174/174857.svg' 
                                            : experience.photoUrl ? experience.photoUrl : this.state.expLogos[experience.id] ? this.state.expLogos[experience.id][0] : 
                                            '' }  width="70" height="70">
                                        </img>
                                    </a> 
                                    <p>{experience.company}</p>   
                                </div>
                            </div>
                            )}
                    )}
                </div>
                {/* <div className='connected'>
                <h1>Schools your network has attended</h1>
                        {this.props.notConnected.map((profile) => {
                            if (!this.status[profile.id]) this.status[profile.id] = 'Connect'
                            if (profile.id !== this.props.userProfile.id && (!this.props.connected.includes(profile) || this.status[profile.id] === 'Disconnect'))
                            return (
                                <div className='profile-block' key={profile.id}>
                                    <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" />
                                    <div className='link'><Link to={{ pathname: this.profilePath(profile), state: { profile: profile } }} ><div> <img className='profile-img' src={
                                        profile.photoUrl ?
                                            profile.photoUrl :
                                            'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                                        width="105"
                                        height="105" /><p>{profile.fullName}</p></div></Link>
                                    </div>
                                </div>
                            )
                        }
                        )}  
                </div> */}
            </div>
            
        )
    }
}