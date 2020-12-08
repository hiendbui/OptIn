import React from 'react';
import { Link } from 'react-router-dom';

export default class Greeting extends React.Component {
    render () {
        return(
            <div>
                <section className='form-buttons'>
                    <button><Link to='/signup'></Link>Join Now</button>
                    <button><Link to='/login'></Link>Sign In</button>
                </section>

                <h1>Welcome to your professional community</h1>

                
                <h2>Conversations today could lead to opportunity tomorrow</h2>
                <h3>Sending messages to people you know is a great way to strengthen 
                    relationships as you take the next step in your career</h3>
                <h1>Join your colleagues, classmates, and friends on OptIn.</h1>

            </div>
        )
    }
}