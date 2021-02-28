import React from 'react';
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

class AddSong extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            songId: '',

            error: '',
            block: false,
            done: false,

            title: '',
            coverPhoto: '',
            song: '',
            creatorId: '',
            categoryId: '',
            tags: '',
            summary: '',
            credits: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.delete = this.delete.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('songs').classList.add('selected');
        } catch(e){}     

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('songs').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getSongQuery;
        
        if(data === undefined){
            return;
        }

        if(data.error) {

            this.setState({
                title: 'Something went wrong :(',
                coverPhoto: 'Something went wrong :(',
                song: 'Something went wrong :(',
                creatorId: 'Something went wrong :(',
                categoryId: 'Something went wrong :(',
                tags: 'Something went wrong :(',
                summary: 'Something went wrong :(',
                credits: 'Something went wrong :(',
    
                error: 'Something went wrong :(',
                block: true,
                done: true
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
                coverPhoto: 'Loading...',
                song: 'Loading...',
                creatorId: 'Loading...',
                categoryId: 'Loading...',
                tags: 'Loading...',
                summary: 'Loading...',
                credits: 'Loading...',
    
                error: 'Loading...',
                block: true
            });

            let a = document.getElementsByClassName('blog__work');
            a.forEach(e => {
                e.readOnly = true;
            });

            time = setTimeout(this.addData);

            return;
        }

        const mat = data.song;
    
        if(mat === null){
            this.setState({
                title: 'No such post exists.',
                coverPhoto: 'No such post exists.',
                song: 'No such post exists.',
                creatorId: 'No such post exists.',
                categoryId: 'No such post exists.',
                tags: 'No such post exists.',
                summary: 'No such post exists.',
                credits: 'No such post exists.',
    
                error: 'No such post exists.',
                block: true,
                done: true
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
            coverPhoto: mat.coverPhoto || '',
            song: mat.song || '',
            creatorId: creator,
            categoryId: category,
            tags: tags,
            summary: mat.summary || '',
            credits: mat.credits || '',

            error: '',
            block: false,
            songId: mat.id
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

    submitForm(e){

        e.preventDefault();

        if(this.state.coverPhoto && !this.isURL(this.state.coverPhoto)){
            alert('Enter a valid URL for cover photo.');
            return;
        } 
        if(this.state.song && !this.isURL(this.state.song)){
            alert('Enter a valid URL for song.');
            return;
        } 
        if(this.state.credits && !this.isURL(this.state.credits)){
            alert('Enter a valid URL for credits.');
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
            block: true
        });

        let a = document.getElementsByClassName('blog__work');
        a.forEach(e => {
            e.readOnly = true;
        });


        if(this.state.songId){ // Update post

            this.props.updateSongMutation({

                variables: {
                    id: this.state.songId, 
                    title: this.state.title, 
                    coverPhoto: this.state.coverPhoto,
                    song: this.state.song,
                    credits: this.state.credits, 
                    summary: this.state.summary, 
                    creatorId: this.state.creatorId, 
                    categoryId: this.state.categoryId, 
                    tags: tagArray
                }
    
            }).then(()=>{

                this.setState({
                    error: '',
                    block: false
                });

                let a = document.getElementsByClassName('blog__work');
                a.forEach(e => {
                    e.readOnly = false;
                });

                alert('Saved changes :)');

            }).catch((err)=>{

                this.setState({
                    error: '',
                    block: false
                });

                let a = document.getElementsByClassName('blog__work');
                a.forEach(e => {
                    e.readOnly = false;
                });

                if(err.message === "GraphQL error: You ain't me, kid!")
                    firebase.auth().signOut();
                else 
                    alert('Something went wrong :(');

            });


        } else { // Add post

            this.props.addSongMutation({

                variables: { 
                    title: this.state.title, 
                    coverPhoto: this.state.coverPhoto,
                    song: this.state.video,
                    credits: this.state.credits, 
                    summary: this.state.summary, 
                    creatorId: this.state.creatorId, 
                    categoryId: this.state.categoryId, 
                    tags: tagArray
                }
    
            }).then(()=>{

                this.setState({
                    error: '',
                    block: false,

                    title: '',
                    coverPhoto: '',
                    song: '',
                    creatorId: '',
                    categoryId: '',
                    tags: '',
                    summary: '',
                    credits: ''
                });

                let a = document.getElementsByClassName('blog__work');
                a.forEach(e => {
                    e.readOnly = false;
                });

                alert('Added a new post :) Stay here to add more posts!');

            }).catch((err)=>{

                this.setState({
                    error: '',
                    block: false
                });

                let a = document.getElementsByClassName('blog__work');
                a.forEach(e => {
                    e.readOnly = false;
                });

                if(err.message === "GraphQL error: You ain't me, kid!")
                    firebase.auth().signOut();
                else 
                    alert('Something went wrong :(');

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

    delete(){

        if(this.state.block)
            return;

        this.setState({
            title: '',
            coverPhoto: '',
            song: '',
            creatorId: '',
            categoryId: '',
            tags: '',
            summary: '',
            credits: ''
        });
    }

    render(){
        return(
            <div className='main__show home__box all__box'>
                <div className='addBlog__main'>

                <Link to='/songs' style={style}><div className = 'back'><div className="set">&larr;</div></div></Link>
                <div className = 'delete' onClick = {this.delete}><div className="set">Reset</div></div>

                <form id = "home-form" className="special" onSubmit = {this.submitForm} autoComplete="off">

                    <div className = "home__field">
                        <label style = {label}>Title</label>
                        <input value={this.state.title} required className="blog__work" type = "text" placeholder = "Song title" onChange = { (e) => this.setState({title: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Cover Photo</label>
                        <input value={this.state.coverPhoto} className="blog__work" type = "text" placeholder = "URL of cover photo" onChange = { (e) => this.setState({coverPhoto: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Song</label>
                        <input value={this.state.song} className="blog__work" type = "text" placeholder = "URL of song" onChange = { (e) => this.setState({song: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Credits</label>
                        <input value={this.state.credits} className="blog__work" type = "text" placeholder = "URL to credits page, if any!" onChange = { (e) => this.setState({credits: e.target.value}) } />
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
                        <label style = {label}>Summary</label>
                        <textarea value={this.state.summary} className="blog__work" onChange = { (e) => this.setState({summary: e.target.value}) } placeholder = "Add summary here...">

                        </textarea>
                    </div>

                    <button className='submitButton'>Save</button>

                    <div id = 'home__error'>{this.state.error}</div>

                </form>

                </div>
            </div>
        );
    }

}

export default AddSong;