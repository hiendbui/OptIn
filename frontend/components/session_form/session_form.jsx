import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/optin_logo.png';

export default class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(field) {
        return (e) => this.setState({[field]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state);
    }

    clearErrors(e) {
        this.props.errors = [];
    }

    render() {
        return (
            <div className="session-form">
                <img src={logo} id="logo-form" />
                <br/>
                <h2>{this.props.header[0]}</h2>
                <h3>{this.props.header[1]}</h3>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>​​{'\xa0\xa0\xa0\xa0\xa0'} Email:{'\xa0'}
                        <input type="text" value={this.props.email} onChange={this.handleChange('email')}/>
                    </label>
                    <br/>
                    <label>Password:{'\xa0'}
                        <input type="password" value={this.props.password} onChange={this.handleChange('password')} />
                    </label>
                    <br/>
                    <p>{this.props.errors[0]}</p>
                    <input id="submit-form" type="submit" value={this.props.formType}/>
                </form>
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