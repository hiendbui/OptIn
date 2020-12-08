import React from 'react';

export default class NewsFeed extends React.Component {
    render() {
        return (
            <div>
                <h1>News Feed</h1>
                <button onClick={()=>this.props.logout()}>Log out</button>
            </div>
        )
    }
}