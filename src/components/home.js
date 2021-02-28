import React from 'react';
import CKEditor from 'ckeditor4-react';
import {flowRight as compose} from 'lodash';
import firebase from 'firebase/app';

import { graphql } from 'react-apollo';
import { updateHomeMutation } from '../queries/mutations';
import { getHomeQuery } from '../queries/queries';

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

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: '',
            block: false,
            done: false,
            // wys: false,

            websiteName: '',
            tagline: '',
            logo: '',
            background: '',
            video: '',
            summary: '',
            description: ''
        };
        
        this.submitForm = this.submitForm.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('home').classList.add('selected');
        } catch(e){}

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('home').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getHomeQuery;

        if(data.error) {

            this.setState({
                websiteName: 'Something went wrong :(',
                tagline: 'Something went wrong :(',
                logo: 'Something went wrong :(',
                background: 'Something went wrong :(',
                video: 'Something went wrong :(',
                summary: 'Something went wrong :(',
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
                websiteName: 'Loading...',
                tagline: 'Loading...',
                logo: 'Loading...',
                background: 'Loading...',
                video: 'Loading...',
                summary: 'Loading...',
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

        const mat = data.home;
    
        if(mat === null){
            this.setState({
                websiteName: '',
                tagline: '',
                logo: '',
                background: '',
                video: '',
                summary: '',
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
            websiteName: mat.websiteName || '',
            tagline: mat.tagline || '',
            logo: mat.logo || '',
            background: mat.background || '',
            video: mat.video || '',
            summary: mat.summary || '',
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
            alert(this.state.websiteName);
            return;
        }

        if(this.state.block)
            return;


        if(this.state.logo && !this.isURL(this.state.logo)){
            alert('Enter a valid URL for logo.');
            return;
        }
        if(this.state.background && !this.isURL(this.state.background)){
            alert('Enter a valid URL for background image.');
            return;
        }
        if(this.state.video && !this.isURL(this.state.video)){
            alert('Enter a valid URL for opening video.');
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


        this.props.updateHomeMutation({

            variables: {
                websiteName: this.state.websiteName,
                tagline: this.state.tagline,
                logo: this.state.logo,
                background: this.state.background,
                video: this.state.video,
                summary: this.state.summary,
                description: this.state.description
            }

        }).then(({data})=>{

            // console.log('hello');
            // console.log(data.updateHome.websiteName);

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
                <div className='home__main'>

                <form id = "home-form" onSubmit = {this.submitForm} autoComplete="off">

                    <div className = "home__field">
                        <label style = {label}>Website</label>
                        <input required value={this.state.websiteName} className="blog__work" type = "text" placeholder = "Website name" onChange = { (e) => this.setState({websiteName: e.target.value}) } />
                    </div>

                    <div className = "home__field">                        
                        <label style = {label}>Tagline</label>
                        <input value={this.state.tagline} className="blog__work" type = "text" placeholder = "Tagline" onChange = { (e) => this.setState({tagline: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Logo</label>
                        <input value={this.state.logo} className="blog__work" type = "text" placeholder = "URL of your logo" onChange = { (e) => this.setState({logo: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Background Image</label>
                        <input value={this.state.background} className="blog__work" type = "text" placeholder = "URL of your background image" onChange = { (e) => this.setState({background: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Opening Video</label>
                        <input value={this.state.video} className="blog__work" type = "text" placeholder = "URL of your opening video" onChange = { (e) => this.setState({video: e.target.value}) } />
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

                    <button className='submitButton'>Save</button>

                    <div id = 'home__error'>{this.state.error}</div>

                </form>

                </div>
            </div>
        );
    }

}

export default compose(
    
    graphql(getHomeQuery, {
        name: 'getHomeQuery',
        options: () => ({
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateHomeMutation, {name: 'updateHomeMutation'})

)

(Home);