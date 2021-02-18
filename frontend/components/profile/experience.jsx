import React from 'react';
import NBATEAMS from '../../util/nba_teams';
import { ImPencil} from 'react-icons/im';

export default ({ experience, logos, fetchLogo, myProfile, showForm } ) => {
    if (!logos[experience.id]) fetchLogo(experience.company, experience.id);
    const company = experience.company === 'Philadelphia 76ers' ? 'sixers' : experience.company;
    let domain = experience.company in NBATEAMS ? `https://www.nba.com/${company.split(' ').slice(-1)[0].toLowerCase()}`: logos[experience.id]?.length > 1 ? `https://www.${logos[experience.id][1]}`: ''; 
    if (experience.company === 'OptIn') domain = 'https://optin-ntwrk.herokuapp.com/';
    const cursor = !domain ? 'default' : '';
    const event = !domain ? 'none' : '';

    return (
        <div>
            <p fontSize="5px">{'\xa0'}</p>
            <a href={domain} target="_blank" style={{cursor:cursor, pointerEvents:event }} >
                <img src={
                experience.company in NBATEAMS ? 
                    `https://sportsfly.cbsistatic.com/fly-62/bundles/sportsmediacss/images/team-logos/nba/${NBATEAMS[experience.company]}.svg` 
                    : experience.company === 'LinkedIn' || experience.company === 'OptIn' ? 'https://www.flaticon.com/svg/static/icons/svg/174/174857.svg' 
                    : experience.photoUrl ? experience.photoUrl : logos[experience.id] ? logos[experience.id][0] : 
                    '' }  width='60px' height='60px'>
                </img>
            </a>
            <div className="experience">
                <div className='title'>
                    <div id='edit' className={myProfile() ? 'reveal' : 'hide'}>
                        <div onClick={showForm('modalExp', 'edit-exp', experience)}>
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
}