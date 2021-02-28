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

class AddCategory extends React.Component{

    constructor(props){
        super(props);
        this.state = {

            error: '',
            block: false,
            done: false,

            name: '',
            photo: '',
            video: '',
            summary: '',
            link: '',
            categoryId: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.delete = this.delete.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('categories').classList.add('selected');
        } catch(e){}     

        let a = document.getElementById('readOnly');
        a.readOnly = true;

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('categories').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getCategoryQuery;
        
        if(data === undefined){
            return;
        }

        if(data.error) {

            this.setState({
                name: 'Something went wrong :(',
                photo: 'Something went wrong :(',
                video: 'Something went wrong :(',
                summary: 'Something went wrong :(',
                link: 'Something went wrong :(',
                categoryId: 'Something went wrong :(',
    
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
                name: 'Loading...',
                photo: 'Loading...',
                video: 'Loading...',
                summary: 'Loading',
                link: 'Loading...',
                categoryId: 'Loading...',
    
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

        const mat = data.category;
    
        if(mat === null){
            this.setState({
                name: 'No such post exists.',
                photo: 'No such post exists.',
                video: 'No such post exists.',
                summary: 'No such post exists.',
                link: 'No such post exists.',
                categoryId: 'No such post exists.',
    
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

        this.setState({
            name: mat.name || '',
            photo: mat.photo || '',
            video: mat.video || '',
            summary: mat.summary || '',
            link: mat.link || '',

            error: '',
            block: false,
            categoryId: mat.id || ''
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
            alert(this.state.name);
            return;
        }

        if(this.state.block)
            return;


        if(this.state.link && !this.isURL(this.state.link)){
            alert('Enter a valid URL for profile link.');
            return;
        } 
        if(this.state.photo && !this.isURL(this.state.photo)){
            alert('Enter a valid URL for photo.');
            return;
        } 
        if(this.state.video && !this.isURL(this.state.video)){
            alert('Enter a valid URL for video.');
            return;
        } 

        this.setState({
            error: 'Saving...',
            block: true
        });

        let a = document.getElementsByClassName('blog__work');
        a.forEach(e => {
            e.readOnly = true;
        });


        if(this.state.categoryId){ // Update post

            this.props.updateCategoryMutation({

                variables: {
                    id: this.state.categoryId,
                    name: this.state.name,
                    photo: this.state.photo,
                    video: this.state.video,
                    summary: this.state.summary,
                    link: this.state.link
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

            this.props.addCategoryMutation({

                variables: { 
                    name: this.state.name,
                    photo: this.state.photo,
                    video: this.state.video,
                    summary: this.state.summary,
                    link: this.state.link
                }
    
            }).then(()=>{

                this.setState({
                    error: '',
                    block: false,

                    name: '',
                    photo: '',
                    video: '',
                    summary: '',
                    link: '',
                    categoryId: ''
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

    delete(){

        if(this.state.block)
            return;

        this.setState({
            name: '',
            photo: '',
            video: '',
            summary: '',
            link: '',
            error: ''
        });
    }

    render(){
        return(
            <div className='main__show home__box all__box'>
                <div className='addBlog__main'>

                <Link to='/categories' style={style}><div className = 'back'><div className="set">&larr;</div></div></Link>
                <div className = 'delete' onClick = {this.delete}><div className="set">Reset</div></div>

                <form id = "home-form" className="special" onSubmit = {this.submitForm} autoComplete="off">

                    <div className = "home__field">
                        <label style = {label}>Category ID</label>
                        <input id="readOnly" value={this.state.categoryId} type = "text" placeholder = "Automatically generated unique ID" onChange = { (e) => this.setState({categoryId: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Name</label>
                        <input value={this.state.name} required className="blog__work" type = "text" placeholder = "Name" onChange = { (e) => this.setState({name: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Profile Link</label>
                        <input value={this.state.link} className="blog__work" type = "text" placeholder = "URL of profile link" onChange = { (e) => this.setState({link: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Photo</label>
                        <input value={this.state.photo} className="blog__work" type = "text" placeholder = "URL of photo" onChange = { (e) => this.setState({photo: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Video</label>
                        <input value={this.state.video} className="blog__work" type = "text" placeholder = "URL of video" onChange = { (e) => this.setState({video: e.target.value}) } />
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

export default AddCategory;
