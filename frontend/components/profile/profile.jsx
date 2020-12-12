import React from 'react';

export default class Profile extends React.Component {
    render() {
        console.log(this.props.profile)
        return (
            <div>
                <div className='main-profile'>
                    <img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt=""/>
                    <div className='profile-info'>
                        <img  
                        src={this.props.profile.photoUrl ? this.props.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/3vGwZcA6dzTsc3DGGCBkbLgt'}/>
                        <p>{this.props.profile.fullName}</p>
                        <p>{this.props.profile.headline}</p>
                        <p>{this.props.profile.location}</p>
                    </div>
                </div>
                <div className='about'>
                    <br/>
                    <label>About</label>
                    <br/>
                    <p>{this.props.profile.description}</p>
                </div>
                <br/>
            </div>
        )
    }
}