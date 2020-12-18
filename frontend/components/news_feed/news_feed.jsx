import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';


export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post:{}}
        
        TimeAgo.addLocale(en)

        this.profile = this.props.currentUser.profile
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchCurrentProfConnections();
        this.props.fetchAllProfiles();
        this.props.fetchAllPosts();
    }

    handleFile(e) {
        const img = e.currentTarget.files[0]
        const reader = new FileReader();
        reader.onloadend = (event) => {
            this.setState({ post: { ...this.state.post, ['photoUrl']: reader.result, ['photoFile']: img } })
        };
        reader.readAsDataURL(img);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[body]', this.state.post.body);
        if (this.state.post.photoFile) formData.append('post[photo]', this.state.post.photoFile);
        this.props.createPost(formData);
    }

    handleChange(e) {
        this.setState({ post: { ...this.state.post, ['body']: e.target.value}})
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
                        <form onSubmit={this.handleSubmit}>
                            <textarea placeholder="Start a Post" required="required" id="input" cols="10" rows="5" onChange={this.handleChange}></textarea>
                            <input className='img-input' type="file" onChange={this.handleFile} />
                            <button>Post</button>
                        </form>
                    </div>
                    
                    {this.props.postsArr.map((post) => {
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
                                        return <p key={comment.id}>{comment.body}</p>
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