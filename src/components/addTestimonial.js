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

class AddTestimonial extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            testimonialId: '',

            error: '',
            block: false,
            done: false,

            name: '',
            designation: '',
            photo: '',
            video: '',
            summary: '',
            link: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.delete = this.delete.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('testimonials').classList.add('selected');
        } catch(e){}  
        
        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('testimonials').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getTestimonialQuery;
        
        if(data === undefined){
            return;
        }

        if(data.error) {

            this.setState({
                name: 'Something went wrong :(',
                designation: 'Something went wrong :(',
                photo: 'Something went wrong :(',
                video: 'Something went wrong :(',
                summary: 'Something went wrong :(',
                link: 'Something went wrong :(',
    
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
                designation: 'Loading...',
                photo: 'Loading...',
                video: 'Loading...',
                summary: 'Loading...',
                link: 'Loading...',
    
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

        const mat = data.testimonial;
    
        if(mat === null){
            this.setState({
                name: 'No such post exists.',
                designation: 'No such post exists.',
                photo: 'No such post exists.',
                video: 'No such post exists.',
                summary: 'No such post exists.',
                link: 'No such post exists.',
    
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
            designation: mat.designation || '',
            photo: mat.photo || '',
            video: mat.video || '',
            summary: mat.summary || '',
            link: mat.link || '',

            error: '',
            block: false,
            testimonialId: mat.id
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


        if(this.state.testimonialId){ // Update post

            this.props.updateTestimonialMutation({

                variables: {
                    id: this.state.testimonialId, 
                    name: this.state.name, 
                    designation: this.state.designation, 
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

            this.props.addTestimonialMutation({

                variables: { 
                    name: this.state.name, 
                    designation: this.state.designation, 
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
                    designation: '', 
                    photo: '', 
                    video: '', 
                    summary: '', 
                    link: ''
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
            designation: '',
            photo: '',
            video: '',
            summary: '',
            link: ''
        });
    }

    render(){
        return(
            <div className='main__show home__box all__box'>
                <div className='addBlog__main'>

                <Link to='/testimonials' style={style}><div className = 'back'><div className="set">&larr;</div></div></Link>
                <div className = 'delete' onClick = {this.delete}><div className="set">Reset</div></div>

                <form id = "home-form" className="special" onSubmit = {this.submitForm} autoComplete="off">

                    <div className = "home__field">
                        <label style = {label}>Name</label>
                        <input value={this.state.name} required className="blog__work" type = "text" placeholder = "Name" onChange = { (e) => this.setState({name: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Designation</label>
                        <input value={this.state.designation} className="blog__work" type = "text" placeholder = "Designation" onChange = { (e) => this.setState({designation: e.target.value}) } />
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

    export default AddTestimonial;