import React from 'react';
import { GrClose } from 'react-icons/gr';
import { IconContext } from "react-icons";

export default ({ modal, experience, closeForm,  handleCreate, handleEdit, handleChange, handleDelete, setRef}) => {

    return (
        <div className={`${modal}`}>
            <div className='modal-screen'>
            </div>

            <div className='modal-exp-form'>
                <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '5px' } }}>
                    <div className='close' onClick={closeForm('modalExp','expRef')}>
                        <GrClose />
                    </div>
                </IconContext.Provider>
                        
                <h1>{`${modal.split('-')[0].charAt(0).toUpperCase() + modal.split('-')[0].slice(1)}`} experience</h1>
                <form ref={(el) => setRef(el, 'expRef')} 
                    onSubmit={!experience ? handleCreate : experience.id ? handleEdit : handleCreate}>                                
                        <div >
                            <label>Title *
                        </label>
                            <br />
                        <input 
                            defaultValue={experience ? experience.title : ""} 
                            required="required" 
                            type="text" 
                            onChange={handleChange('title')} 
                        />
                        </div>
                        <br />
                        <div >
                            <label>Company *
                        </label>
                            <br />
                        <input 
                            defaultValue={experience ? experience.company : ""} 
                            required="required" 
                            type="text" 
                            onChange={handleChange('company')} 
                        />
                        </div>
                        <br />
                        <div >
                            <label>Start Date (e.g. Jun 2018) *
                        </label>
                            <br />
                        <input 
                            defaultValue={experience ? experience.startDate : ""} 
                            required="required" 
                            type="text" 
                            onChange={handleChange('start_date')} 
                        />
                        </div>
                        <br />
                        <div >
                            <label>End Date (if current position, state 'Present') *
                            </label>
                            <br />
                        <input 
                            defaultValue={experience ? experience.endDate : ""} 
                            required="required" 
                            type="text" 
                            onChange={handleChange('end_date')} 
                        />
                        </div>
                        <br/>
                        <div >
                            <label>Location
                                </label>
                            <br />
                        <input 
                            defaultValue={experience ? experience.location : ""}  
                            type="text" 
                            onChange={handleChange('location')} 
                        />
                        </div>
                        <br/>
                        <div > 
                            <label>Description
                                </label>
                            <br /> 
                        <textarea 
                            cols="30" 
                            rows="5" 
                            defaultValue={experience ? experience.description : ""} 
                            type="textarea"
                            onChange={handleChange('description')}>
                        </textarea>
                        </div>
                        <br/>
                        <div className='delete'>
                            <button onClick={handleDelete(experience)} type="submit">Delete</button>
                        </div>
                        <div className="submit">
                        <button type="submit">Save</button>
                        </div>
                        <br />
                </form>
            </div>
        </div>
    )
};