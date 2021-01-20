import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import { BsPencilSquare, BsThreeDots } from 'react-icons/bs';
import { IconContext } from "react-icons"
import  SideBarContainer from '../sidebar/sidebar_container'


export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post:{}, comment:{}, dropdown: 'hidden'}
        this.btn = 'hide-btn';
        
        TimeAgo.addLocale(en)

        this.profile = this.props.currentUser.profile
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleComChange = this.handleComChange.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
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

    handleComChange(postId) {
        return (e) => {
            this.postId = postId;
            e.target.value ? this.btn = 'show-btn' : this.btn = 'hide-btn';
            this.setState({ comment: {['body']: e.target.value }} );
        }
    }
    handleComment(postId) {
        return (e) => {
            this.props.createComment(this.state.comment, postId)
        }
    }

    handleChange(e) {
        this.setState({ post: { ...this.state.post, ['body']: e.target.value}})
    }

    showDropdown(postId) {
        return (e) => {
            if (this.state.dropdown === 'hidden' || this.postId !== postId) {
                this.postId = postId;
                this.setState({dropdown: 'show'})
            } else this.setState({dropdown:'hidden'})
        }
    }

    render() {
        return (
            <div className='news-feed'>
                <div className='user-profile'>
                    <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" />
                    <div className='link'>
                        <Link to={{ pathname: `/in/${this.profile?.fullName.toLowerCase().split(' ').join('-')}-${this.profile?.id}` } }>
                    <div> 
                    <img className='profile-img' 
                        src={
                            this.profile?.photoUrl ?
                            this.profile.photoUrl :
                            'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'
                        }
                        width="75"
                        height="75" /> 
                    <p className='name'>{this.profile?.fullName}</p></div></Link>
                    <p className='headline'>{this.profile?.headline}</p>
                    <br/>
                        
                        <Link  to='/mynetwork'>
                            <p className='connection'>Connections
                            <span className='num'>{this.props.connections ? this.props.connections : ''}</span></p>
                            <p className='line'>Manage your network</p>
                        </Link>
                        
                    </div>
                </div>
                <div className='post-block'>
                    <div className='create-post'>
                        <form onSubmit={this.handleSubmit}>
                            <div className="body">
                                <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                                    <BsPencilSquare />
                                </IconContext.Provider>
                                <textarea 
                                        placeholder="Start a Post" 
                                        required="required" 
                                        id="input" 
                                        cols="30" 
                                        width="100%" 
                                        onChange={this.handleChange}>
                                </textarea>
                            </div>
                            <span className='img-input'>Upload Photo:</span>
                            <input type="file" onChange={this.handleFile} />
                            <button>Post</button>
                        </form>
                    </div>
                    <div id='line'></div>
                    {[...this.props.postsArr].reverse().map((post) => {
                        const profile = this.props.profiles[post.authorId];
                        const profilePath = profile?.fullName.toLowerCase().split(' ').join('-');
                        if (profile)
                        return <div className="post" key={post.id}>
                            {profile.id === this.profile.id ? 
                                <button onClick={this.showDropdown(post.id)} className='edit-btn'><BsThreeDots /></button> : ''
                            }
                            <div className={this.postId === post.id ? this.state.dropdown : 'hidden'}>
                                    <p>Edit Post</p>
                                    <p>Delete Text</p>
                            </div>
                            <Link to={{ pathname: `/in/${profilePath}-${profile.id}` } }>
                            <div className='prof'>
                                <img src={profile.photoUrl ? 
                                            profile.photoUrl : 
                                            'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'} 
                                />
                                <div className='dets'>
                                <p >{profile.fullName}</p>
                                <p>{profile.headline}</p>
                                        <p><ReactTimeAgo 
                                                fontSize="12px" 
                                                date={new Date(post.createdAt)} 
                                                locale="en" 
                                                timeStyle="mini-minute-now" 
                                            />
                                        </p>
                                </div>
                            </div>
                            </Link>
                            <p className='body'>{post.body}</p>
                            {post.photoUrl ? <img src={post.photoUrl} alt=""/> : ""}
                            <p className='br'></p>
                            <br/>
                            <div className="comments">
                                {this.props.comments.map((comment => {
                                    let profile = this.props.profiles[comment.authorId];
                                    let profilePath = profile?.fullName.toLowerCase().split(' ').join('-');
                                    if (comment.postId == post.id)
                                        return <div className='item'key={comment.id}>
                                                <Link to={{ pathname: `/in/${profilePath}-${profile.id}` } }>
                                                    <img className='img-comment' src={
                                                    profile.photoUrl ?
                                                    profile.photoUrl :
                                                    'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                                                    />
                                                </Link> 
                                                 <div className="body">
                                                <p className="full">{profile.fullName}</p>
                                                <p className="time">
                                                    <ReactTimeAgo 
                                                        fontSize="12px" 
                                                        date={new Date(comment.createdAt)} 
                                                        locale="en" 
                                                        timeStyle="mini-minute-now" 
                                                    />
                                                </p>
                                                <p className="head">{profile.headline}</p>
                                                <p className="bod">{comment.body}</p>
                                                </div>
                                                </div>
                                }))}
                            <div className='add-cmmt'>
                                <img className='img-comment' src={
                                    this.profile?.photoUrl ?
                                        this.profile.photoUrl :
                                        'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                                     />
                                <form onSubmit={this.handleComment(post.id)}>
                                    <input 
                                        className='comment' 
                                        placeholder="Add a comment..." 
                                        type="text" 
                                        onChange={this.handleComChange(post.id)}
                                    />
                                    <button className={this.postId === post.id ? this.btn : 'hide'}>Post</button>
                                </form>
                            </div>
                            </div>
                        </div>
                    }
                    )}
                </div>
                <SideBarContainer/>
            </div>
        )
    }
}