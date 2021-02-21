import React from 'react';
import { ImPencil } from 'react-icons/im';

export default ({ achievement, myProfile, showForm } ) => {
    return (
        <div>
            <div className="achievement">
                <div className='title'>{achievement.title}
                    <div id='edit' className={myProfile() ? 'reveal' : 'hide'}>
                        <div  onClick={showForm('modalAch', 'edit-ach', achievement)}><ImPencil /></div>
                    </div>
                </div>
                <p className='issuer-year' >{achievement.issuer ? achievement.issuer : ""}{achievement.issuer && achievement.year ? " · " : ""}{achievement.year}</p>
                <p className='description'>{achievement.description}</p>
                <br />
            </div>
        </div>
    )
}