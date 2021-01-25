import React from 'react';
import { Link } from 'react-router-dom';

export default class Greeting extends React.Component {
    render () {
        return(
            <div className='landing'>
                <img src={window.logo} id="logo" />
                <section className='form-buttons'>
                    <Link to='/signup'><button className='signup'>Join Now</button></Link>
                    <Link to='/login'><button>Sign In</button></Link> 
                </section>
                
                <h1>Welcome to your <br/>
                    professional community</h1>

                <img src="https://static-exp3.licdn.com/sc/h/3m4tgpbdz7gbldapvl63mrnxz" id="work-img"/>
                <br/>
                <h2>Conversations today could lead to opportunity tomorrow</h2>
                <h3>OptIn to your network and strengthen relationships as you take the next step in your career</h3>
                <br/>    
                <h2 id='bottom'>Join your colleagues, classmates, and friends on OptIn.</h2>
                <img src="https://static-exp3.licdn.com/sc/h/2vt8plqbv2l2pi6kxm89bqs59" />
            </div>
        )
    }
}