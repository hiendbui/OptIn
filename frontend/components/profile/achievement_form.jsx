import React from 'react';
import { GrClose } from 'react-icons/gr';
import { IconContext } from "react-icons";

export default ({ modal, achievement, closeForm,  handleCreate, handleEdit, handleChange, handleDelete, setRef}) => {

    return (
        <div className={modal}>
            <div className='modal-screen'>
            </div>

            <div className='modal-ach-form'>
                <IconContext.Provider value={{ style: { fontSize: '20px', float: 'right', margin: '5px' } }}>
                    <div className='close' onClick={closeForm('modalAch', 'achRef')}>
                        <GrClose />
                    </div>
                </IconContext.Provider>

                <h1>{`${modal.split('-')[0].charAt(0).toUpperCase() + modal.split('-')[0].slice(1)}`} achievement</h1>
                <form ref={(el) => setRef(el, 'achRef')}
                    onSubmit={!achievement ? handleCreate : achievement.id ? handleEdit : handleCreate}>
                    <div >
                        <label>Title *
                        </label>
                        <br />
                        <input 
                            defaultValue={achievement ? achievement.title : ""} 
                            required="required" 
                            type="text" 
                            onChange={handleChange('title')} 
                        />
                    </div>
                    <br />
                    <div >
                        <label>Issuer
                        </label>
                        <br />
                        <input 
                            defaultValue={achievement ? achievement.issuer : ""} 
                            type="text" 
                            onChange={handleChange('issuer')} 
                        />
                    </div>
                    <br />
                    <div >
                        <label>Year(s)
                        </label>
                        <br />
                        <input 
                            defaultValue={achievement ? achievement.year : ""} 
                            type="text" 
                            onChange={handleChange('year')} 
                        />
                    </div>
                    <br />
                    <div >
                        <label>Description</label>
                        <br />

                        <textarea 
                            cols="30" 
                            rows="5" 
                            defaultValue={achievement ? achievement.description : ""} 
                            type="textarea" 
                            onChange={handleChange('description')}>
                        </textarea>
                    </div>
                    <br />
                    <div className='delete'>
                        <button onClick={handleDelete(achievement)} type="submit">Delete</button>
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