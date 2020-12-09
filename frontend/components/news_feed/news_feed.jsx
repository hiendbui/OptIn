import React from 'react';

export default class NewsFeed extends React.Component {
    render() {
        return (
            <div>
                <p>News Feed</p>
                <button onClick={()=>this.props.logout()}>Log out</button>
            </div>
        )
    }
}