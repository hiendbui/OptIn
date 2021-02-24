import React from 'react';
import { GrClose } from 'react-icons/gr';
import { IconContext } from "react-icons";

export default ({ modal, education, closeForm,  handleCreate, handleEdit, handleChange, handleDelete, setRef}) => {

    return (
        <div className={modal}>
            <div className='modal-screen'>
            </div>

            <div className='modal-edu-form'>
                <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '5px' } }}>
                    <div className='close' onClick={closeForm('modalEdu', 'eduRef')}>
                        <GrClose />
                    </div>
                </IconContext.Provider>

                <h1>{`${modal.split('-')[0].charAt(0).toUpperCase() + modal.split('-')[0].slice(1)}`} education</h1>
                <form ref={(el) => setRef(el, 'eduRef')}
                    onSubmit={!education ? handleCreate : education.id ? handleEdit : handleCreate}>
                    <div >
                        <label>School *
                        </label>
                        <br />
                        <input 
                            defaultValue={education ? education.school : ""} 
                            required="required" 
                            type="text" 
                            onChange={handleChange('school')} 
                        />
                    </div>
                    <br />
                    <div >
                        <label>Degree 
                        </label>
                        <br />
                        <input 
                            defaultValue={education ? education.degree : ""}  
                            type="text" 
                            onChange={handleChange('degree')} 
                        />
                    </div>
                    <br />
                    <div >
                        <label>Subject 
                        </label>
                        <br />
                        <input 
                            defaultValue={education ? education.subject : ""}  
                            type="text" 
                            onChange={handleChange('subject')} 
                        />
                    </div>
                    <br />
                    <div >
                        <label>Start Year
                            </label>
                        <br />
                        <input 
                            defaultValue={education ? education.startYear : ""}  
                            type="text" 
                            onChange={handleChange('start_year')} 
                        />
                    </div>
                    <br />
                    <div >
                        <label>End Year
                                </label>
                        <br />
                        <input 
                            defaultValue={education ? education.endYear : ""} 
                            type="text" 
                            onChange={handleChange('end_year')} 
                        />
                    </div>
                    <br />
                    <div >
                        <label>Description
                                </label>
                        <br />

                        <textarea 
                            cols="30" 
                            rows="5" 
                            defaultValue={education ? education.description : ""} 
                            type="textarea" 
                            onChange={handleChange('description')}>
                        </textarea>
                    </div>
                    <br />
                    <div className='delete'>
                        <button onClick={handleDelete(education)} type="submit">Delete</button>
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