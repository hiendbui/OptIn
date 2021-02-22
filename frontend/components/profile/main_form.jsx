import React from 'react';
import { GrClose } from 'react-icons/gr';
import { IconContext } from "react-icons";

export default ({ modalMain, modalAbout, closeForm, profile, handleSubmit, handleFile, handleChange, setRef}) => {
    const defaultProfPic = 'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png';

    return (
        <div>
            <div className={`${modalMain}`}>
                <div className='modal-screen'>
                </div>
                <div className='modal-form'>
                    <IconContext.Provider 
                        value = {{ style: { 
                                    fontSize: '20px', 
                                    float: 'right', 
                                    margin: '15px' 
                                }}}>
                        <div className='close' onClick={closeForm('modalMain','mainRef')}>
                            <GrClose />
                        </div>
                    </IconContext.Provider>
                   <h1>Edit intro</h1>
                <img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" width='100%' />
                    <div>
                    <img
                        src={profile.photoUrl ? profile.photoUrl : defaultProfPic} 
                        width='120px'
                        height='120px'
                        className='profile-pic'
                    />
                    </div>
                   <br/>
                   <br/>
                   <br/>
                    <form ref={(el) => setRef(el, 'mainRef')} onSubmit={handleSubmit}>
                        <label>Update Profile Pic</label>
                         <br />
                        <input className='img-input' type="file" onChange={handleFile} />
                        <br />
                        <br/>
                        <div >
                            <label>Full Name *
                            </label>
                            <br/>
                            <input 
                                defaultValue={profile.fullName} 
                                required="required" 
                                type="text" 
                                onChange={handleChange('fullName')}
                            />    
                        </div>
                         <br />
                        <div >
                            <label>Headline *
                            </label>
                             <br />
                            <input 
                                defaultValue={profile.headline} 
                                required="required" 
                                type="text" 
                                onChange={handleChange('headline')}
                            />
                        </div>
                         <br />
                         <div >
                             <label>Location *
                            </label>
                             <br />
                            <input 
                                defaultValue={profile.location} 
                                required="required" 
                                type="text" 
                                onChange={handleChange('location')} />
                         </div>
                         <br />
                        <div className="submit">
                            <button type="submit">Save</button>
                         </div>
                         <br/>
                    </form>
                </div>
            </div>
            <div className={`${modalAbout}`}>
                <div className='modal-screen'>
                </div>
                <div className='modal-about-form'>
                    <IconContext.Provider 
                        value={{ style: { 
                                    fontSize: '20px', 
                                    float: 'right', 
                                    margin: '15px' 
                                }}}>
                        <div className='close' onClick={closeForm('modalAbout')}>
                            <GrClose />
                        </div>
                    </IconContext.Provider>
                        
                    <h1>Edit about</h1>
                    <form ref={(el) => setRef(el, 'aboutRef')} onSubmit={handleSubmit}>
                        <label>Summary</label>
                        <br/>
                        <textarea 
                            defaultValue={profile.description} 
                            cols="30" 
                            rows="10" 
                            onChange={handleChange('description')}>
                            
                        </textarea>
                        <div className="submit">
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};