<h1>OptIn: A Clone of LinkedIn</h1> 
<img src="app/assets/images/optin_logo.png?raw=true" width="350">


<a href="https://optin-ntwrk.herokuapp.com/">Live Link</a>

OptIn is a full stack clone of LinkedIn, where users can create their own profiles/resumes, connect with other users, view companies within their network, and make posts and comments on a news feed.

## Technologies
* React
* Redux
* Ruby on Rails
* PostgreSQL
* Jbuilder
* Webpack
* AWS S3
## Features
* Profile where users can upload a profile pic and add/update work experience, education, achievements, and more.
<!-- <img src="app/assets/images/optin_logo.png?raw=true" width="700"> -->

* News Feed for making/editing posts and comments on posts. Allows for users to attach a picture to a post.
<!-- <img src="app/assets/images/optin_logo.png?raw=true" width="700"> -->

* Network page to display connections and other OptIn users to connect with. Users can navigate to other profiles from here. 
<!-- <img src="app/assets/images/optin_logo.png?raw=true" width="700"> -->

* Index of companies where OptIn users have worked at, with logos and links to each company's domain.
<!-- <img src="app/assets/images/optin_logo.png?raw=true" width="700"> -->

## Code
In order to duplicate the experience of filling out one's LinkedIn profile, I ensured that the logos for companies would be immediately fetched and displayed once a user has added a work experience. In order to do so, I made GET requests to retrieve company data from Clearbit's Logo API, which supplied both the logo and domain for each company. I then saved that data to local state in order to subsequently display the logo in the profile component. Additionally, the logo itself is a link to the company's domain. If no logo was fetched for the company, then a default picture is used instead. I also did the same for schools that users upload as part of their education. 

```javascript
// profile.jsx
fetchExpLogo(institution, id) {
        const company = institution.split(' ').join('').toLowerCase()
        return $.ajax({
            method: 'GET',
            url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`,
        })
            .then((data) => {
                this.setState({
                        expLogos: {
                        ...this.state.expLogos, 
                        [id]: data[0] ? [ data[0]['logo'], data[0]['domain'] ] : this.defaultPic
                    }
                })        
            })
};
```

Profiles involved a vast amount of forms which can be access by opening modals. One such modal allowed users to create an 'About Me' for their profile. In order to allow users to open and close the modal, I used a dynamic class name for the div that wrapped the modal elements. This dynamic class name allows the profile page to default to hiding the modal using CSS. When the button to open the modal is clicked, the class name is changed so that the modal is displayed with the styling applied from CSS.  

```javascript
// profile.jsx
<div className={`${this.state.modalAbout}`}>
    <div className='modal-screen'>
    </div>
    <div className='modal-about-form'>
        <div className='close' onClick={this.closeForm('modalAbout')}>
            <GrClose />
        </div>

        <h1>Edit about</h1>
        <form ref={(el) => this['aboutRef'] = el} onSubmit={this.handleSubmit}>
            <label>Summary</label>
            <br/>
            <textarea 
                defaultValue={this.state.profile.description} 
                cols="30" 
                rows="10" 
                onChange={this.handleChange('description')}>
            </textarea>
            <div className="submit">
                <button type="submit">Save</button>
            </div>
        </form>
    </div>
</div>
```

Each post consists of the post details, which includes a link to the author's profile and how long it's been since the post was created (using the React TimeAgo library). It will additionally note whether or not the post has been edited. Each post can also be edited or deleted by its author. 

```javascript
// news_feed.jsx
<Link to={{ pathname: `/in/${profilePath}-${profile.id}` } }>
    <div className='prof'>
        <img src={
                profile.photoUrl ? 
                profile.photoUrl : 
                'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'
                }/>
        <div className='dets'>
        <p>{profile.fullName}</p>
        <p>{profile.headline}</p>
        <span>
            <ReactTimeAgo    
                date={new Date(post.createdAt)} 
                locale="en" 
                timeStyle="mini-minute-now" 
            />
            <span>{post.createdAt !== post.updatedAt ? "・Edited":''}</span>
            <span>     
                <IoMdGlobe></IoMdGlobe>       
            </span>
        </span>
        </div>
    </div>
</Link>

<div
        id={post.id}
        className='body' 
        contentEditable={edit ? true : false}                         
        required="required" 
        onInput={e => this.setState({content: e.currentTarget.textContent} )}>
        {post.body}
</div>
<button
    className='update-post'
    hidden={edit ? false : true}
    onClick={this.updatePost({id:post.id, body:this.state.content})}>
    Save
</button>
{post.photoUrl ? <img src={post.photoUrl} alt=""/> : ""}
```

Network page includes an index of users that you are not connected to, and allows you to navigate to their profiles and connect with them.

```javascript
// network.jsx
<h1>People you may know</h1>
    
<div className='profile-block' key={profile.id}>
    <img className='cover' src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" />
    <div className='link'>
        <Link to={{ pathname: this.profilePath(profile)}}>
            <div> 
                <img className='profile-img' 
                    src={
                        profile.photoUrl ?
                        profile.photoUrl :
                        'https://optin-dev.s3-us-west-1.amazonaws.com/default_profile.png'}/>
                <p>{profile.fullName}</p>
            </div>
        </Link>
        <p className='headline'>{profile.headline}</p>   
    </div>
    <button onClick={this.handleClick(profile.id)}>
        {this.status[profile.id]}
    </button>
</div>
```



