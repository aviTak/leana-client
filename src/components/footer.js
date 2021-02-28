import React from 'react';
import {flowRight as compose} from 'lodash';
import firebase from 'firebase/app';

import { graphql } from 'react-apollo';
import { updateFooterMutation } from '../queries/mutations';
import { getFooterQuery } from '../queries/queries';

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

class Footer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: '',
            block: false,
            done: false,

            copyName: '',
            copyYear: '',
            disclaimer: '',
            privacy: '',
            terms: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('footer').classList.add('selected');
        } catch(e){}

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('footer').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getFooterQuery;

        if(data.error) {

            this.setState({
                copyName: 'Something went wrong :(',
                copyYear: 'Something went wrong :(',
                disclaimer: 'Something went wrong :(',
                privacy: 'Something went wrong :(',
                terms: 'Something went wrong :(',
    
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
                copyName: 'Loading...',
                copyYear: 'Loading...',
                disclaimer: 'Loading...',
                privacy: 'Loading...',
                terms: 'Loading...',
    
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

        const mat = data.footer;
    
        if(mat === null){
            this.setState({
                copyName: '',
                copyYear: '',
                disclaimer: '',
                privacy: '',
                terms: '',
    
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
            copyName: mat.copyName || '',
            copyYear: mat.copyYear || '',
            disclaimer: mat.disclaimer || '',
            privacy: mat.privacy || '',
            terms: mat.terms || '',

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
            alert(this.state.copyName);
            return;
        }

        if(this.state.block)
            return;


        if(this.state.disclaimer && !this.isURL(this.state.disclaimer)){
            alert('Enter a valid URL for disclaimer.');
            return;
        }
        if(this.state.privacy && !this.isURL(this.state.privacy)){
            alert('Enter a valid URL for privacy policy.');
            return;
        }
        if(this.state.terms && !this.isURL(this.state.terms)){
            alert('Enter a valid URL for terms of service.');
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


        this.props.updateFooterMutation({

            variables: {
                copyName: this.state.copyName,
                copyYear: this.state.copyYear,
                disclaimer: this.state.disclaimer,
                privacy: this.state.privacy,
                terms: this.state.terms
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
                <div className='footer__main'>

                <form id = "home-form" onSubmit = {this.submitForm} autoComplete="off">

                    <div className = "home__field">
                        <label style = {label}>Copyright Name</label>
                        <input value={this.state.copyName} className="blog__work" type = "text" placeholder = "Copyright name" onChange = { (e) => this.setState({copyName: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Copyright Year</label>
                        <input value={this.state.copyYear} className="blog__work" type = "text" placeholder = "Copyright year" onChange = { (e) => this.setState({copyYear: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Disclaimer</label>
                        <input value={this.state.disclaimer} className="blog__work" type = "text" placeholder = "URL of disclaimer" onChange = { (e) => this.setState({disclaimer: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Privacy Policy</label>
                        <input value={this.state.privacy} className="blog__work" type = "text" placeholder = "URL of privacy policy" onChange = { (e) => this.setState({privacy: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Terms of Service</label>
                        <input value={this.state.terms} className="blog__work" type = "text" placeholder = "URL of your terms of service" onChange = { (e) => this.setState({terms: e.target.value}) } />
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
    
    graphql(getFooterQuery, {
        name: 'getFooterQuery',
        options: () => ({
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateFooterMutation, {name: 'updateFooterMutation'})

)

(Footer);