import React from 'react';
import CKEditor from 'ckeditor4-react';
import {flowRight as compose} from 'lodash';
import firebase from 'firebase/app';

import { graphql } from 'react-apollo';
import { updateAboutMutation } from '../queries/mutations';
import { getAboutQuery } from '../queries/queries';

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

class About extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: '',
            block: false,
            done: false,
            // wys: false,

            heading: '',
            yourName: '',
            brandName: '',
            yourPhoto: '',
            brandPhoto: '',
            yourVideo: '',
            brandVideo: '',
            yourInfo: '',
            brandInfo: '',
            description: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('about').classList.add('selected');
        } catch(e){}

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('about').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getAboutQuery;

        if(data.error) {

            this.setState({
                heading: 'Something went wrong :(',
                yourName: 'Something went wrong :(',
                brandName: 'Something went wrong :(',
                yourPhoto: 'Something went wrong :(',
                brandPhoto: 'Something went wrong :(',
                yourVideo: 'Something went wrong :(',
                brandVideo: 'Something went wrong :(',
                yourInfo: 'Something went wrong :(',
                brandInfo: 'Something went wrong :(',
                description: 'Something went wrong :(',
    
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
                heading: 'Loading...',
                yourName: 'Loading...',
                brandName: 'Loading...',
                yourPhoto: 'Loading...',
                brandPhoto: 'Loading...',
                yourVideo: 'Loading...',
                brandVideo: 'Loading...',
                yourInfo: 'Loading...',
                brandInfo: 'Loading...',
                description: 'Loading...',
    
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

        const mat = data.about;
    
        if(mat === null){
            this.setState({
                heading: '',
                yourName: '',
                brandName: '',
                yourPhoto: '',
                brandPhoto: '',
                yourVideo: '',
                brandVideo: '',
                yourInfo: '',
                brandInfo: '',
                description: '',
    
                error: '',
                block: false,
                // wys: false
            });

            let a = document.getElementsByClassName('blog__work');
            a.forEach(e => {
                e.readOnly = false;
            });

            return;
        }

        this.setState({
            heading: mat.heading || '',
            yourName: mat.yourName || '',
            brandName: mat.brandName || '',
            yourPhoto: mat.yourPhoto || '',
            brandPhoto: mat.brandPhoto || '',
            yourVideo: mat.yourVideo || '',
            brandVideo: mat.brandVideo || '',
            yourInfo: mat.yourInfo || '',
            brandInfo: mat.brandInfo || '',
            description: mat.description || '',

            error: '',
            block: false,
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

    submitForm(e){

        e.preventDefault();

        if(this.state.done){
            alert(this.state.heading);
            return;
        }

        if(this.state.block)
            return;


        if(this.state.yourPhoto && !this.isURL(this.state.yourPhoto)){
            alert('Enter a valid URL for your photograph.');
            return;
        }
        if(this.state.yourVideo && !this.isURL(this.state.yourVideo)){
            alert('Enter a valid URL for your about video.');
            return;
        }
        if(this.state.brandPhoto && !this.isURL(this.state.brandPhoto)){
            alert('Enter a valid URL for your company/brand\'s official photograph.');
            return;
        }
        if(this.state.brandVideo && !this.isURL(this.state.brandVideo)){
            alert('Enter a valid URL for your company/brand\'s official video.');
            return;
        }

        this.setState({
            error: 'Saving...',
            block: true,
            // wys: true
        });

        let a = document.getElementsByClassName('blog__work');
        a.forEach(e => {
            e.readOnly = true;
        });


        this.props.updateAboutMutation({

            variables: {
                heading: this.state.heading,
                yourName: this.state.yourName,
                brandName: this.state.brandName,
                yourPhoto: this.state.yourPhoto,
                brandPhoto: this.state.brandPhoto,
                yourVideo: this.state.yourVideo,
                brandVideo: this.state.brandVideo,
                yourInfo: this.state.yourInfo,
                brandInfo: this.state.brandInfo,
                description: this.state.description
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
                alert('Something went wrong :(');

        });

    }

    render(){
        return(
            <div className='main__show home__box all__box'>
                <div className='about__main'>

                <form id = "home-form" onSubmit = {this.submitForm} autoComplete="off">


                    <div className = "home__field">
                        <label style = {label}>Heading</label>
                        <input value={this.state.heading} className="blog__work" type = "text" placeholder = "About heading" onChange = { (e) => this.setState({heading: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Description</label>
                        <div className="editor">
                            <CKEditor
                                onChange = { (e) => {
                                    try{
                                        this.setState({description: e.editor.getData()});
                                    } catch(err){}
                                }} 
                                onInstanceReady = { (e) => { 
                                    try{
                                        e.editor.setData(this.state.description); 
                                        // e.editor.setReadOnly(this.state.wys); 
                                    } catch(err){}                                    
                                } }
                                data = {this.state.description}
                                // readOnly = {this.state.wys}
                            />
                        </div>
                    </div>



                    <div className = "home__field">
                        <label style = {label}>Name</label>
                        <input value={this.state.yourName} className="blog__work" type = "text" placeholder = "Your name" onChange = { (e) => this.setState({yourName: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Your Photo</label>
                        <input value={this.state.yourPhoto} className="blog__work" type = "text" placeholder = "URL of your photo" onChange = { (e) => this.setState({yourPhoto: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Video Intro</label>
                        <input value={this.state.yourVideo} className="blog__work" type = "text" placeholder = "URL of your about video" onChange = { (e) => this.setState({yourVideo: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Your Info</label>
                        <textarea value={this.state.yourInfo} className="blog__work" onChange = { (e) => this.setState({yourInfo: e.target.value}) } placeholder = "Add your about information here...">

                        </textarea>
                    </div>




                    <div className = "home__field">
                        <label style = {label}>Brand Name</label>
                        <input value={this.state.brandName} className="blog__work" type = "text" autoComplete="off" placeholder = "Your company/brand name" onChange = { (e) => this.setState({brandName: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Brand Photo</label>
                        <input value={this.state.brandPhoto} className="blog__work" type = "text" placeholder = "URL of your company/brand's photo" onChange = { (e) => this.setState({brandPhoto: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Brand Video</label>
                        <input value={this.state.brandVideo} className="blog__work" type = "text" placeholder = "URL of your company/brand's video" onChange = { (e) => this.setState({brandVideo: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Brand Info</label>
                        <textarea value={this.state.brandInfo} className="blog__work" onChange = { (e) => this.setState({brandInfo: e.target.value}) } placeholder = "Add your company/brand information here...">

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

export default compose(
    
    graphql(getAboutQuery, {
        name: 'getAboutQuery',
        options: () => ({
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateAboutMutation, {name: 'updateAboutMutation'})

)

(About);
