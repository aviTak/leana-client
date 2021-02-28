import React from 'react';
import CKEditor from 'ckeditor4-react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

const style = {
    color: '#ffffff',
    textDecoration: 'none'
};

const label = {
    color: '#000000',
    display: 'block',
    fontSize: '1.1rem',
    textAlign: 'left',
    position: 'relative',
    left: '6%',
    marginBottom: '5px',
    fontVariant: 'small-caps',
    fontWeight: '700'
};

var time;

class AddBlog extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            blogId: '',

            error: '',
            block: false,
            done: false,
            // wys: false,

            title: '',
            permalink: '',
            coverPhoto: '',
            creatorId: '',
            categoryId: '',
            tags: '',
            date: '',
            summary: '',
            post: '',
            video: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.addPermalink = this.addPermalink.bind(this);
        this.delete = this.delete.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('blog').classList.add('selected');
        } catch(e){}     

       this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('blog').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getBlogQuery;
        
        if(data === undefined){
            return;
        }

        if(data.error) {

            this.setState({
                title: 'Something went wrong :(',
                permalink: 'Something went wrong :(',
                coverPhoto: 'Something went wrong :(',
                creatorId: 'Something went wrong :(',
                categoryId: 'Something went wrong :(',
                tags: 'Something went wrong :(',
                date: '1961-05-21',
                summary: 'Something went wrong :(',
                post: 'This might be a network issue. Try refreshing your page.',
                video: 'Something went wrong :(',
    
                error: 'Something went wrong :(',
                block: true,
                done: true,
                // wys: true
            });

            let a = document.getElementsByClassName('blog__work');
            a.forEach(e => {
                e.readOnly = true;
            });

            return;
        }

        if(data.loading) {

            this.setState({
                title: 'Loading...',
                permalink: 'Loading...',
                coverPhoto: 'Loading...',
                creatorId: 'Loading...',
                categoryId: 'Loading...',
                tags: 'Loading...',
                date: '1961-05-21',
                summary: 'Loading...',
                post: 'A moment please.',
                video: 'Loading...',
    
                error: 'Loading...',
                block: true,
                // wys: true
            });

            let a = document.getElementsByClassName('blog__work');
            a.forEach(e => {
                e.readOnly = true;
            });

            time = setTimeout(this.addData);

            return;
        }

        const mat = data.blog;
    
        if(mat === null){
            this.setState({
                title: 'No such post exists.',
                permalink: 'No such post exists.',
                coverPhoto: 'No such post exists.',
                creatorId: 'No such post exists.',
                categoryId: 'No such post exists.',
                tags: 'No such post exists.',
                date: '1961-05-21',
                summary: 'No such post exists.',
                post: 'The post you are looking for was never created or has been deleted. Navigate back to add a new post.',
                video: 'No such post exists.',
    
                error: 'No such post exists.',
                block: true,
                done: true,
                // wys: true
            });

            let a = document.getElementsByClassName('blog__work');
            a.forEach(e => {
                e.readOnly = true;
            });

            return;
        }

        let creator = (mat.creator === null)? '' : mat.creator.id;
        let category = (mat.category === null)? '' : mat.category.id;
        let tags = (mat.tags === null)? '' : mat.tags.toString();

        this.setState({
            title: mat.title || '',
            permalink: mat.permalink || '',
            coverPhoto: mat.coverPhoto || '',
            creatorId: creator,
            categoryId: category,
            tags: tags,
            date: mat.date || '',
            summary: mat.summary || '',
            post: mat.post || '',
            video: mat.video || '',

            error: '',
            block: false,
            blogId: mat.id,
            // wys: false
        });

        let a = document.getElementsByClassName('blog__work');
        a.forEach(e => {
            e.readOnly = false;
        });

    }

    isURL(a){
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(a);
    }

    isPermalink(a){
        if(a === ''){
            return false;
        }
        var l = a.length;
        var g, c;
        for(let i=0; i<l; i++){
            g = a.charAt(i);
            c = g.charCodeAt(0);
            if(g === '-' && i!==l-1 && i!==0){
                continue;
            }
            if(c>=48 && c<=57){
                continue;
            }
            if(c>=97 && c<=122){
                continue;
            }
            return false;
        }
        return true;
    }

    submitForm(e){
       
        e.preventDefault();

        if(this.state.done){
            alert(this.state.title);
            return;
        }

        if(this.state.block)
            return;

        if(this.state.coverPhoto && !this.isURL(this.state.coverPhoto)){
            alert('Enter a valid URL for cover photo.');
            return;
        } 
        if(this.state.video && !this.isURL(this.state.video)){
            alert('Enter a valid URL for opening video.');
            return;
        } 
        if(!this.isPermalink(this.state.permalink)){
            alert('Enter a valid permalink.');
            return;
        }
        if(this.state.tags && !this.isTag(this.state.tags.trim())){
            alert('Please enter your tags properly.');
            return;
        }

        // Convert tags to array

        var tagArray = this.state.tags.toLowerCase().trim().split(',');

        tagArray = tagArray.filter(e => e !== '');

        this.setState({
            error: 'Saving...',
            block: true,
            // wys: true
        });

        let a = document.getElementsByClassName('blog__work');
        a.forEach(e => {
            e.readOnly = true;
        });


        if(this.state.blogId){ // Update post

            this.props.updateBlogMutation({

                variables: {
                    id: this.state.blogId, 
                    permalink: this.state.permalink, 
                    title: this.state.title, 
                    coverPhoto: this.state.coverPhoto, 
                    video: this.state.video, 
                    summary: this.state.summary, 
                    date: this.state.date, 
                    post: this.state.post, 
                    creatorId: this.state.creatorId, 
                    categoryId: this.state.categoryId, 
                    tags: tagArray
                }
    
            }).then(()=>{

                this.setState({
                    error: '',
                    block: false,
                    // wys: false
                });

                let a = document.getElementsByClassName('blog__work');
                a.forEach(e => {
                    e.readOnly = false;
                });

                alert('Saved changes :)');

            }).catch((err)=>{

                this.setState({
                    error: '',
                    block: false,
                    // wys: false
                });

                let a = document.getElementsByClassName('blog__work');
                a.forEach(e => {
                    e.readOnly = false;
                });

                if(err.message === "GraphQL error: You ain't me, kid!")
                    firebase.auth().signOut();
                else 
                    alert('Something went wrong :( Make sure your permalink is unique.');

            });


        } else { // Add post

            this.props.addBlogMutation({

                variables: { 
                    permalink: this.state.permalink, 
                    title: this.state.title, 
                    coverPhoto: this.state.coverPhoto, 
                    video: this.state.video, 
                    summary: this.state.summary, 
                    date: this.state.date, 
                    post: this.state.post, 
                    creatorId: this.state.creatorId, 
                    categoryId: this.state.categoryId, 
                    tags: tagArray
                }
    
            }).then(()=>{

                this.setState({
                    error: '',
                    block: false,
                    // wys: false,

                    title: '',
                    permalink: '',
                    coverPhoto: '',
                    creatorId: '',
                    categoryId: '',
                    tags: '',
                    date: '',
                    summary: '',
                    post: '',
                    video: ''
                });

                let a = document.getElementsByClassName('blog__work');
                a.forEach(e => {
                    e.readOnly = false;
                });

                alert('Added a new post :) Stay here to add more posts!');

            }).catch((err)=>{

                this.setState({
                    error: '',
                    block: false,
                    // wys: false
                });

                let a = document.getElementsByClassName('blog__work');
                a.forEach(e => {
                    e.readOnly = false;
                });

                if(err.message === "GraphQL error: You ain't me, kid!")
                    firebase.auth().signOut();
                else 
                    alert('Something went wrong :( Make sure your permalink is unique.');
            });

        }

    }

    isTag(a){
        
        let l = a.length;
        let g, c;

        for(let i=0; i<l; i++){

            g = a.charAt(i);
            c = g.charCodeAt(0);

            if(g === ','){
                continue;
            }

            if(c>=48 && c<=57){
                continue;
            }
            if(c>=97 && c<=122){
                continue;
            }

            if(c>=65 && c<=90){
                continue;
            }

            return false;

        }

        return true;

    }

    addPermalink(e){
        var a = e.target.value;
        this.setState({title: a});

        a = a.trim().toLowerCase();
        var b = '', g, c, v, n;
        let l = a.length;

        for(let i=0; i<l; i++){
            g = a.charAt(i);
            c = g.charCodeAt(0);
            if(g === ' '){
                n = a.charAt(i+1);
                v = n.charCodeAt(0);
                if(n === ''){
                    continue;
                }
                if(n === ' '){
                    continue;
                }
                if(v<48 || (v>57 && v<97) || v>122){
                    continue;
                }
                b = b + '-';
            } else if((c>=48 && c<=57) || (c>=97 && c<=122)){
                b = b + g;
            } else {
                n = a.charAt(i+1);
                v = n.charCodeAt(0);
                if(n === ''){
                    continue;
                }
                if(n === ' '){
                    continue;
                }
                if(v<48 || (v>57 && v<97) || v>122){
                    continue;
                }
                if(b === ''){
                    continue;
                }
                b = b + '-';
            }
        }

        this.setState({permalink: b});
        document.getElementById('link').value = b;
    
    }

    delete(){

        if(this.state.block)
            return;
        
        this.setState({
            title: '',
            permalink: '',
            coverPhoto: '',
            creatorId: '',
            categoryId: '',
            tags: '',
            date: '',
            summary: '',
            post: '',
            video: ''
        });

    }

    render(){
        
        return(
            <div className='main__show home__box all__box'>
                <div className='addBlog__main'>

                <Link to='/blog' style={style}><div className = 'back'><div className="set">&larr;</div></div></Link>
                <div className = 'delete' onClick = {this.delete}><div className="set">Reset</div></div>

                <form id = "home-form" className="special" onSubmit = {this.submitForm} autoComplete="off">

                    <div className = "home__field">
                        <label style = {label}>Title</label>
                        <input value={this.state.title} className="blog__work" type = "text" required placeholder = "Blog title" onChange = { this.addPermalink } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Permalink</label>
                        <input value={this.state.permalink} className="blog__work" type = "text" id="link" required placeholder = "Permalink" onChange = { (e) => this.setState({permalink: e.target.value.toLowerCase()}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Cover Photo</label>
                        <input value={this.state.coverPhoto} className="blog__work" type = "text" placeholder = "URL of cover photo for your blog post" onChange = { (e) => this.setState({coverPhoto: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Opening Video</label>
                        <input value={this.state.video} className="blog__work" type = "text" placeholder = "URL of opening video for your blog post" onChange = { (e) => this.setState({video: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Creator ID</label>
                        <input value={this.state.creatorId} className="blog__work" type = "text" placeholder = "Enter creator ID (not name)" onChange = { (e) => this.setState({creatorId: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Category ID</label>
                        <input value={this.state.categoryId} className="blog__work" type = "text" placeholder = "Enter category ID (not name)" onChange = { (e) => this.setState({categoryId: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Tags</label>
                        <input value={this.state.tags} className="blog__work" type = "text" placeholder = "Separated by comma - no spaces or special characters (eg. life,nature,love)" onChange = { (e) => this.setState({tags: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Date</label>
                        <input value={this.state.date} className="blog__work" type = "date" onChange = { (e) => this.setState({date: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Summary</label>
                        <textarea value={this.state.summary} className="blog__work" onChange = { (e) => this.setState({summary: e.target.value}) } placeholder = "Add summary here...">

                        </textarea>
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Description</label>
                        <div className="editor">
                            <CKEditor
                                onChange = { (e) => {
                                    try{
                                        this.setState({post: e.editor.getData()});
                                    } catch(err){}
                                }} 
                                onInstanceReady = { (e) => { 
                                    try{
                                        e.editor.setData(this.state.post); 
                                        // e.editor.setReadOnly(this.state.wys); 
                                    } catch(err){}                                    
                                } }
                                data = {this.state.post}
                                // readOnly = {this.state.wys}
                            />
                        </div>
                    </div>

                    <button className='submitButton'>Save</button>

                    <div id = 'home__error'>{this.state.error}</div>

                </form>

                </div>
            </div>
        );
    }

}

export default AddBlog;
