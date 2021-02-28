import React from 'react';
import {flowRight as compose} from 'lodash';
import firebase from 'firebase/app';

import { graphql } from 'react-apollo';
import { updateSocialMutation } from '../queries/mutations';
import { getSocialQuery } from '../queries/queries';

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

class Social extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: '',
            block: false,
            done: false,

            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: '',
            pinterest: '',
            youtube: '',
            whatsapp: '',
            tumblr: '',
            quora: '',
            medium: '',
            github: '',
            codepen: '',
            behance: '',
            dribbble: '',
            yourQuote: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('social').classList.add('selected');
        } catch(e){}

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('social').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getSocialQuery;

        if(data.error) {

            this.setState({
                facebook: 'Something went wrong :(',
                instagram: 'Something went wrong :(',
                twitter: 'Something went wrong :(',
                linkedin: 'Something went wrong :(',
                pinterest: 'Something went wrong :(',
                youtube: 'Something went wrong :(',
                whatsapp: 'Something went wrong :(',
                tumblr: 'Something went wrong :(',
                quora: 'Something went wrong :(',
                medium: 'Something went wrong :(',
                github: 'Something went wrong :(',
                codepen: 'Something went wrong :(',
                behance: 'Something went wrong :(',
                dribbble: 'Something went wrong :(',
                yourQuote: 'Something went wrong :(',
    
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
                facebook: 'Loading...',
                instagram: 'Loading...',
                twitter: 'Loading...',
                linkedin: 'Loading...',
                pinterest: 'Loading...',
                youtube: 'Loading...',
                whatsapp: 'Loading...',
                tumblr: 'Loading...',
                quora: 'Loading...',
                medium: 'Loading...',
                github: 'Loading...',
                codepen: 'Loading...',
                behance: 'Loading...',
                dribbble: 'Loading...',
                yourQuote: 'Loading...',
    
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

        const mat = data.social;
    
        if(mat === null){
            this.setState({
                facebook: '',
                instagram: '',
                twitter: '',
                linkedin: '',
                pinterest: '',
                youtube: '',
                whatsapp: '',
                tumblr: '',
                quora: '',
                medium: '',
                github: '',
                codepen: '',
                behance: '',
                dribbble: '',
                yourQuote: '',
    
                error: '',
                block: false
            });

            let a = document.getElementsByClassName('blog__work');
            a.forEach(e => {
                e.readOnly = false;
            });

            return;
        }

        this.setState({
            facebook: mat.facebook || '',
            instagram: mat.instagram || '',
            twitter: mat.twitter || '',
            linkedin: mat.linkedin || '',
            pinterest: mat.pinterest || '',
            youtube: mat.youtube || '',
            whatsapp: mat.whatsapp || '',
            tumblr: mat.tumblr || '',
            quora: mat.quora || '',
            medium: mat.medium || '',
            github: mat.github || '',
            codepen: mat.codepen || '',
            behance: mat.behance || '',
            dribbble: mat.dribbble || '',
            yourQuote: mat.yourQuote || '',

            error: '',
            block: false
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
            alert(this.state.instagram);
            return;
        }

        if(this.state.block)
            return;

            
        if(this.state.facebook && !this.isURL(this.state.facebook)){
            alert('Enter a valid URL for Facebook.');
            return;
        }
        if(this.state.instagram && !this.isURL(this.state.instagram)){
            alert('Enter a valid URL for Instagram.');
            return;
        }
        if(this.state.twitter && !this.isURL(this.state.twitter)){
            alert('Enter a valid URL for Twitter.');
            return;
        }
        if(this.state.linkedin && !this.isURL(this.state.linkedin)){
            alert('Enter a valid URL for LinkedIn.');
            return;
        }
        if(this.state.pinterest && !this.isURL(this.state.pinterest)){
            alert('Enter a valid URL for Pinterest.');
            return;
        }
        if(this.state.youtube && !this.isURL(this.state.youtube)){
            alert('Enter a valid URL for YouTube.');
            return;
        }
        if(this.state.whatsapp && !this.isURL(this.state.whatsapp)){
            alert('Enter a valid URL for WhatsApp.');
            return;
        }
        if(this.state.tumblr && !this.isURL(this.state.tumblr)){
            alert('Enter a valid URL for Tumblr.');
            return;
        }
        if(this.state.quora && !this.isURL(this.state.quora)){
            alert('Enter a valid URL for Quora.');
            return;
        }
        if(this.state.medium && !this.isURL(this.state.medium)){
            alert('Enter a valid URL for Medium.');
            return;
        }
        if(this.state.github && !this.isURL(this.state.github)){
            alert('Enter a valid URL for GitHub.');
            return;
        }
        if(this.state.codepen && !this.isURL(this.state.codepen)){
            alert('Enter a valid URL for Codepen.');
            return;
        }
        if(this.state.behance && !this.isURL(this.state.behance)){
            alert('Enter a valid URL for Bēhance.');
            return;
        }
        if(this.state.dribbble && !this.isURL(this.state.dribbble)){
            alert('Enter a valid URL for Dribbble.');
            return;
        }
        if(this.state.yourQuote && !this.isURL(this.state.yourQuote)){
            alert('Enter a valid URL for YourQuote.');
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


        this.props.updateSocialMutation({

            variables: {
                facebook: this.state.facebook,
                instagram: this.state.instagram,
                twitter: this.state.twitter,
                linkedin: this.state.linkedin,
                pinterest: this.state.pinterest,
                youtube: this.state.youtube,
                whatsapp: this.state.whatsapp,
                tumblr: this.state.tumblr,
                quora: this.state.quora,
                medium: this.state.medium,
                github: this.state.github,
                codepen: this.state.codepen,
                behance: this.state.behance,
                dribbble: this.state.dribbble,
                yourQuote: this.state.yourQuote
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

    }

    render(){
        return(
            <div className='main__show home__box all__box'>
                <div className='social__main'>

                <form id = "home-form" onSubmit = {this.submitForm} autoComplete="off">

                    <div className = "home__field">
                        <label style = {label}>Facebook</label>
                        <input value={this.state.facebook} className="blog__work" type = "text" placeholder = "URL of your Facebook handle" onChange = { (e) => this.setState({facebook: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Instagram</label>
                        <input value={this.state.instagram} className="blog__work" type = "text" placeholder = "URL of your Instagram handle" onChange = { (e) => this.setState({instagram: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Twitter</label>
                        <input value={this.state.twitter} className="blog__work" type = "text" placeholder = "URL of your Twitter handle" onChange = { (e) => this.setState({twitter: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>LinkedIn</label>
                        <input value={this.state.linkedin} className="blog__work" type = "text" placeholder = "URL of your LinkedIn handle" onChange = { (e) => this.setState({linkedin: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Pinterest</label>
                        <input value={this.state.pinterest} className="blog__work" type = "text" placeholder = "URL of your Pinterest handle" onChange = { (e) => this.setState({pinterest: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>YouTube</label>
                        <input value={this.state.youtube} className="blog__work" type = "text" placeholder = "URL of your YouTube handle" onChange = { (e) => this.setState({youtube: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>WhatsApp Group</label>
                        <input value={this.state.whatsapp} className="blog__work" type = "text" placeholder = "URL of your WhatsApp handle" onChange = { (e) => this.setState({whatsapp: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Tumblr</label>
                        <input value={this.state.tumblr} className="blog__work" type = "text" placeholder = "URL of your Tumblr handle" onChange = { (e) => this.setState({tumblr: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Quora</label>
                        <input value={this.state.quora} className="blog__work" type = "text" placeholder = "URL of your Quora handle" onChange = { (e) => this.setState({quora: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Medium</label>
                        <input value={this.state.medium} className="blog__work" type = "text" placeholder = "URL of your Medium handle" onChange = { (e) => this.setState({medium: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>GitHub</label>
                        <input value={this.state.github} className="blog__work" type = "text" placeholder = "URL of your GitHub account" onChange = { (e) => this.setState({github: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Codepen</label>
                        <input value={this.state.codepen} className="blog__work" type = "text" placeholder = "URL of your Codepen account" onChange = { (e) => this.setState({codepen: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Bēhance</label>
                        <input value={this.state.behance} type = "text" placeholder = "URL of your Bēhance account" onChange = { (e) => this.setState({behance: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Dribbble</label>
                        <input value={this.state.dribbble} className="blog__work" type = "text" placeholder = "URL of your Dribbble account" onChange = { (e) => this.setState({dribbble: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>YourQuote</label>
                        <input value={this.state.yourQuote} className="blog__work" type = "text" placeholder = "URL of your YourQuote account" onChange = { (e) => this.setState({yourQuote: e.target.value}) } />
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
    
    graphql(getSocialQuery, {
        name: 'getSocialQuery',
        options: () => ({
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateSocialMutation, {name: 'updateSocialMutation'})

)

(Social);