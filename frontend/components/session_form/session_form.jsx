import React from 'react';
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: ""
            },
            profile: {
                full_name: "",
                location: "",
                headline: ""
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        if (this.props.errors.length !== 0) this.props.clearErrors()
    }
    
    handleChange(key, field) {
        return (e) => this.setState({[key]: {...this.state[key], [field]: e.target.value}})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state.user,this.state.profile);
    }

    

    render() {
        const required = this.props.formType === 'Sign up' ? true : false
        return (
            <div className="session-form">
                <img src={window.logo} id="logo-form" />
                <br/>
                <h2>{this.props.header[0]}</h2>
                <h3>{this.props.header[1]}</h3>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit} className={this.props.formType.split(" ").join('-').toLowerCase()}>
                    <label className='hide'>Full Name:{'\xa0\xa0'}
                        <input 
                            type="text" 
                            onChange={this.handleChange('profile','full_name')}
                            required={required}
                            placeholder="Stephen Curry" 
                        />
                    </label>
                    <br className='hide'/>
                    <label className='hide'>Location:{'\xa0\xa0'}
                        <input 
                            type="text"  
                            onChange={this.handleChange('profile','location')} 
                            required={required}
                            placeholder="San Francisco Bay Area" 
                        />
                    </label>
                    <br className='hide'/>
                    <label className='hide'>Headline:{'\xa0\xa0'}
                        <input 
                            type="text"
                            onChange={this.handleChange('profile','headline')} 
                            required={required}
                            placeholder="Guard for Golden State Warriors" 
                        />
                    </label>
                    <br className='hide'/>
                    <label>​​{'\xa0\xa0\xa0\xa0\xa0'}Email:{'\xa0\xa0'}
                        <input 
                            type="email" 
                            onChange={this.handleChange('user','email')} 
                            placeholder="chefcurry@gmail.com"
                        />
                    </label>
                    <br/>
                    <label>Password:{'\xa0\xa0'}
                        <input 
                            type="password" 
                            onChange={this.handleChange('user','password')} 
                            placeholder="••••••••"/>
                    </label>
                    <br />
                    <p>{this.props.errors[0]}</p>
                    <input id="submit-form" type="submit" value={this.props.formType}/>
                </form>
                    <button onClick={this.props.loginDemoUser}>Sign in as Demo User</button>
                <br/>
                <p>
                    {this.props.message[0] + '\xa0'}<Link 
                                                        to={`/${this.props.message[1]}`} 
                                                        className='link'>
                                                        {this.props.message[2]}
                                                    </Link>
                </p>
            </div>
        )
    }    
}