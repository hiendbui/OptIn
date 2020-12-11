import React from 'react';

export default class Profile extends React.Component {
    render() {
        console.log(this.props.profile)
        return (
            <div className='main-profile'>
                <div>
                    <img width="50" height="50" 
                    src={this.props.profile.photoUrl ? this.props.profile.photoUrl : 'https://optin-dev.s3-us-west-1.amazonaws.com/3vGwZcA6dzTsc3DGGCBkbLgt'}/>

                </div>
            </div>
        )
    }
}