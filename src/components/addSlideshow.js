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

class AddSlideshow extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            slideshowId: '',

            error: '',
            block: false,
            done: false,

            caption: '',
            photo: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.delete = this.delete.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('slideshow').classList.add('selected');
        } catch(e){}     

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('slideshow').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getSlideQuery;
        
        if(data === undefined){
            return;
        }

        if(data.error) {

            this.setState({
                caption: 'Something went wrong :(',
                photo: 'Something went wrong :(',
    
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
                caption: 'Loading...',
                photo: 'Loading...',
    
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

        const mat = data.slide;
    
        if(mat === null){
            this.setState({
                caption: 'No such post exists.',
                photo: 'No such post exists.',
    
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
            caption: mat.caption || '',
            photo: mat.photo || '',

            error: '',
            block: false,
            slideshowId: mat.id
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
            alert(this.state.caption);
            return;
        }

        if(this.state.block)
            return;


        if(this.state.photo && !this.isURL(this.state.photo)){
            alert('Enter a valid URL for photo.');
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


        if(this.state.slideshowId){ // Update post

            this.props.updateSlideMutation({

                variables: {
                    id: this.state.slideshowId, 
                    caption: this.state.caption, 
                    photo: this.state.photo
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

            this.props.addSlideMutation({

                variables: { 
                    caption: this.state.caption, 
                    photo: this.state.photo
                }
    
            }).then(()=>{

                this.setState({
                    error: '',
                    block: false,

                    caption: '',
                    photo: ''
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
            caption: '',
            photo: ''
        });
    }

    render(){
        return(
            <div className='main__show home__box all__box'>
                <div className='addBlog__main'>

                <Link to='/slideshow' style={style}><div className = 'back'><div className="set">&larr;</div></div></Link>
                <div className = 'delete' onClick = {this.delete}><div className="set">Reset</div></div>

                <form id = "home-form" className="special" onSubmit = {this.submitForm} autoComplete="off">

                    <div className = "home__field">
                        <label style = {label}>Caption</label>
                        <input value={this.state.caption} required className="blog__work" type = "text" placeholder = "Caption" onChange = { (e) => this.setState({caption: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Photo</label>
                        <input value={this.state.photo} required className="blog__work" type = "text" placeholder = "URL of photo" onChange = { (e) => this.setState({photo: e.target.value}) } />
                    </div>

                    <button className='submitButton'>Save</button>

                    <div id = 'home__error'>{this.state.error}</div>

                </form>

                </div>
            </div>
        );
    }

}

export default AddSlideshow;
