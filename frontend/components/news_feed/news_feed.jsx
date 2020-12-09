import React from 'react';

export default class NewsFeed extends React.Component {
    render() {
        return (
            <div className='news-feed'>
                
                
                <button onClick={()=>this.props.logout()}>Log out</button>
            </div>
        )
    }
}