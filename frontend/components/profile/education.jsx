import React from 'react';
import { ImPencil } from 'react-icons/im';

export default ({ education, logos, fetchLogo, myProfile, showForm } ) => {
    if (!logos[education.id]) fetchLogo(education.school, education.id);
    const domain = logos[education.id]?.length > 1 ? `https://www.${logos[education.id][1]}`: '' 
    const cursor = !domain ? 'default' : '';
    const event = !domain ? 'none' : '';

    return (
        <div >
            <a href={domain} target="_blank" style={{cursor:cursor, pointerEvents:event }} >
                <img src={education.photoUrl ? education.photoUrl : 
                    logos[education.id] ? logos[education.id][0] : 
                    fetchLogo(education.school, education.id)} width='60px' height='60px' 
                />
            </a>
            <div className="education">
                <div className='school'>{education.school}
                <div id='edit' className={myProfile() ? 'reveal' : 'hide'}>
                    <div  onClick={showForm('modalEdu', 'edit-edu', education)}>
                        <ImPencil />
                    </div>
                </div>
                </div>
                <p className='degree-subject'>
                    {education.degree}{education.degree && education.subject ? `, ` : ""}{education.subject}
                </p>
                <p className='years'>
                    {education.startYear} {education.startYear && education.endYear ? '-' : ''} {education.endYear}
                </p>
                <p className='description'>{education.description}</p>
                <br />
            </div>
        </div>
    )
}