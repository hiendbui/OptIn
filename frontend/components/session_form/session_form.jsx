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
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    render() {
        return (
            <div className="session-form">
                <img src={logo} id="logo-form" />
                <h1>{this.props.header[0]}</h1>
                <h2>{this.props.header[1]}</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:
                        <input type="text" value={this.props.email} onChange={this.handleChange('email')}/>
                    </label>
                    <br/>
                    <label>Password:
                        <input type="password" value={this.props.password} onChange={this.handleChange('email')} />
                    </label>
                    <input type="submit" value={this.props.formType}/>
                </form>
                <p>{this.props.message[0]}</p> <Link to={`/${this.props.message[1]}`}><button>{this.props.message[2]}</button></Link>
            </div>
        )
    }    
}