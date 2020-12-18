import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';


export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.profile = this.props.currentUser.profile
        TimeAgo.addDefaultLocale(en)
    }

    componentDidMount() {
        this.props.fetchCurrentProfConnections();
        this.props.fetchAllProfiles();
        this.props.fetchAllPosts();
    }
    render() {
        return (
            <div className='news-feed'>
                <div className='user-profile'>
                    <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" />
                    <div className='link'><Link to={{ pathname: `/in/${this.profile.fullName.toLowerCase().split(' ').join('-')}-${this.profile.id}` } }><div> <img className='profile-img' src={
                        this.profile.photoUrl ?
                            this.profile.photoUrl :
                            'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                        width="75"
                        height="75" /> <p className='name'>{this.profile.fullName}</p></div></Link>

                    <p className='headline'>{this.profile.headline}</p>
                    <br/>
                        
                        <Link  to='/mynetwork'>
                            <p className='connection'>Connections<span className='num'>{this.props.connections ? this.props.connections : ''}</span></p>
                            <p className='line'>Manage your network</p>
                        </Link>
                        
                    </div>
                </div>
                <div className='post-block'>
                    <div className='create-post'>

                    </div>
                    
                    {this.props.posts.map((post) => {
                        let profile = this.props.profiles[post.authorId]
                        if (profile)
                        return <div className="post" key={post.id}>
                            <div className='prof'>
                                <p>{profile.fullName}</p>
                                <p>{profile.headline}</p>
                                <p><ReactTimeAgo date={new Date(post.createdAt)} locale="en" timeStyle="twitter" /></p>
                            </div>
                            <p>{post.body}</p>
                            {post.photoUrl ? <img src={post.photoUrl} alt=""/> : ""}
                            <div className="comments">
                                {this.props.comments.map((comment => {
                                    if (comment.postId == post.id)
                                        return <p>{comment.body}</p>
                                }))}
                            </div>
                        </div>
                    }
                    )}
                </div>
            </div>
        )
    }
}