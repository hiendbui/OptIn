import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import { BsPencilSquare, BsThreeDots } from 'react-icons/bs';
import { IconContext } from "react-icons"
import { ImPencil } from 'react-icons/im';
import { FaTrashAlt } from 'react-icons/fa';
import { HiPhotograph } from 'react-icons/hi';
import { IoMdGlobe } from 'react-icons/io';
import  SideBarContainer from '../sidebar/sidebar_container'


export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post:{}, comment:{}, dropdown: 'hidden', cmtDropdown: 'hidden', postEditId: -1, commentEditId:-1, content: ''}
        this.btn = 'hide-btn';
        this.postRef = React.createRef();
        this.commentRefs = {};
        TimeAgo.addLocale(en)

        this.profile = this.props.currentUser.profile
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleComChange = this.handleComChange.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.editPost = this.editPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        
    }

    commentRef(postId) {
        const commentRef = React.createRef();
        this.commentRefs[postId] = commentRef;
        return commentRef
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
        this.props.createPost(formData)
        .then(()=>this.postRef.current.reset())
    }

    updatePost(post) {
        return (e) => {
            e.preventDefault();
            this.props.updatePost(post);
            this.setState({postEditId: -1})
        }
    }

    updateComment(comment) {
        return (e) => {
            e.preventDefault();
            this.props.updateComment(comment);
            this.setState({commentEditId: -1})
        }
    }

    handleComChange(postId) {
        return (e) => {
            this.postCmtId = postId;
            e.target.value ? this.btn = 'show-btn' : this.btn = 'hide-btn';
            this.setState({ comment: {['body']: e.target.value }} );
        }
    }
    handleComment(postId) {
        return (e) => {
            e.preventDefault();
            this.postCmtId = -1
            this.props.createComment(this.state.comment, postId)
            .then(()=>{
                this.commentRefs[postId].current.reset()
                
            });
        }
    }

    handleChange(e) {
        this.setState({ post: { ...this.state.post, ['body']: e.target.value}})
    }

    showDropdown(postId) {
        return (e) => {
            e.preventDefault();
            if (this.state.dropdown === 'hidden' || this.postId !== postId) {
                this.postId = postId;
                this.commentId = -1;
                this.setState({dropdown: 'show'})
            } else this.setState({dropdown:'hidden'})
        }
    }
    
    showCmtDropdown(commentId) {
        return (e) => {
            e.preventDefault();
            console.log('hello!')
            if (this.state.cmtDropdown === 'hidden' || this.commentId !== commentId) {
                this.commentId = commentId;
                this.postId = -1;
                this.setState({cmtDropdown: 'show'})
            } else this.setState({cmtDropdown:'hidden'})
        }
    }

    editPost(postId) {
        return (e) => {
            e.preventDefault();
            this.setState({dropdown: 'hidden'})
            this.setState({postEditId: postId})
        }
    }

    editComment(commentId) {
        return (e) => {
            e.preventDefault();
            this.setState({cmtDropdown: 'hidden'})
            this.setState({commentEditId: commentId})
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
                        <form onSubmit={this.handleSubmit} ref={this.postRef}>
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
                            <div className='img-upload'>
                                <span className='img-input'>
                                    <IconContext.Provider value={{ style: { fontSize: '25px' } }}>
                                        <HiPhotograph/>
                                    </IconContext.Provider>
                                </span>                       
                                <input className='file-input'  type='file'  onChange={this.handleFile} />
                            </div>
                            <button>Post</button>
                        </form>
                    </div>
                    <div id='line'></div>
                    {[...this.props.postsArr].reverse().map((post) => {
                        const profile = this.props.profiles[post.authorId];
                        const profilePath = profile?.fullName.toLowerCase().split(' ').join('-');
                        const edit = this.state.postEditId === post.id
                        if (profile)
                        return <div className="post" key={post.id}>
                            {profile?.id === this.profile?.id ? 
                                <button onClick={this.showDropdown(post.id)} className='edit-btn'><BsThreeDots /></button> : ''
                            }
                            <div className={this.postId === post.id ? this.state.dropdown : 'hidden'}>
                                    <button onClick={this.editPost(post.id)}>
                                        <IconContext.Provider 
                                            value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                                            <ImPencil></ImPencil>
                                        </IconContext.Provider>
                                        <span>Edit Post</span>
                                    </button>
                                    <button onClick={() => this.props.destroyPost(post.id)}>
                                        <IconContext.Provider 
                                            value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                                            <FaTrashAlt></FaTrashAlt>
                                        </IconContext.Provider>
                                        <span>Delete Post</span>
                                    </button>
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
                                <span><ReactTimeAgo 
                                        
                                        date={new Date(post.createdAt)} 
                                        locale="en" 
                                        timeStyle="mini-minute-now" 
                                    />
                                    <span>{post.createdAt !== post.updatedAt ? "・Edited":''}</span>
                                    <span>・
                                        <IconContext.Provider value={{ style: { fontSize:"15px",position:'relative',top:'3.75px' } }}>
                                            <IoMdGlobe></IoMdGlobe>
                                        </IconContext.Provider>
                                    </span>
                                </span>
                                </div>
                            </div>
                            </Link>
                            
                                <div
                                    id={post.id}
                                    className='body' 
                                    contentEditable={edit ? true : false} 
                                    style={edit ? {border: 'solid 1px rgb(163, 163, 163)', padding:'7.5px'}: {border: 'none'}}                              
                                    required="required" 
                                    onInput={e => this.setState({content: e.currentTarget.textContent} )}
                                    >
                                    {post.body}
                                </div>
                                <button
                                    className='update-post'
                                    hidden={edit ? false : true}
                                    onClick={this.updatePost({id:post.id, body:this.state.content})}>
                                    Save
                                </button>
                                <br hidden={edit ? false : true}/>
                                <br hidden={edit ? false : true}/>
                            {post.photoUrl ? <img src={post.photoUrl} alt=""/> : ""}
                            <p className='br'></p>
                            <br/>

                            <div className="comments">
                                {this.props.comments.map((comment => {
                                    let profile = this.props.profiles[comment.authorId];
                                    let profilePath = profile?.fullName.toLowerCase().split(' ').join('-');
                                    const cmtEdit = this.state.commentEditId === comment.id
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
                                                <div className='cmt-dets'>
                                                    <span className="time">
                                                        <ReactTimeAgo 
                                                            fontSize="12px" 
                                                            date={new Date(comment.createdAt)} 
                                                            locale="en" 
                                                            timeStyle="mini-minute-now" 
                                                        />
                                                        {comment.createdAt !== comment.updatedAt ? " (edited)":''}
                                                    </span>
                                                    {profile?.id === this.profile?.id ? 
                                                        <button onClick={this.showCmtDropdown(comment.id)} className='edit-cmt-btn'><BsThreeDots /></button> : ''
                                                    }
                                                </div>
                                                <div className={this.commentId === comment.id ? this.state.cmtDropdown : 'hidden'}>
                                                        <button onClick={this.editComment(comment.id)}>
                                                            <IconContext.Provider 
                                                                value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                                                                <ImPencil></ImPencil>
                                                            </IconContext.Provider>
                                                            <span>Edit Comment</span>
                                                        </button>
                                                        <button onClick={() => this.props.destroyComment(comment.id)}>
                                                            <IconContext.Provider 
                                                                value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                                                                <FaTrashAlt></FaTrashAlt>
                                                            </IconContext.Provider>
                                                            <span>Delete Comment</span>
                                                        </button>
                                                </div>
                                                
                                                <p className="head">{profile.headline}</p>
                                                <div
                                                    id={comment.id}
                                                    className='bod' 
                                                    contentEditable={cmtEdit ? true : false} 
                                                    style={cmtEdit ? {borderRadius:'10px',border: 'solid 1px rgb(163, 163, 163)', padding:'7.5px'}: {border: 'none'}}                              
                                                    required="required" 
                                                    onInput={e => this.setState({content: e.currentTarget.textContent} )}
                                                    >
                                                    {comment.body}
                                                </div>
                                                <button
                                                    className='update-cmt'
                                                    hidden={cmtEdit ? false : true}
                                                    onClick={this.updateComment({id:comment.id, body:this.state.content})}>
                                                    Save
                                                </button>
                                                </div>
                                                </div>
                                }))}
                            <div className='add-cmmt'>
                                <img className='img-comment' src={
                                    this.profile?.photoUrl ?
                                        this.profile.photoUrl :
                                        'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}
                                     />
                                <form ref={this.commentRef(post.id)}  onSubmit={this.handleComment(post.id)}>
                                    <input
                                        required="required"
                                        className='comment' 
                                        placeholder="Add a comment..." 
                                        type="text" 
                                        onChange={this.handleComChange(post.id)}
                                    />
                                    <button className={this.postCmtId === post.id ? this.btn : 'hide'}>Post</button>
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