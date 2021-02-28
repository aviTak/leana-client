import React from 'react';
import '../css/login.css';
import firebase from 'firebase/app';

import { graphql } from 'react-apollo';
import { loginMutation } from '../queries/mutations';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '', 
            error: ''
        };
        
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e){

        e.preventDefault();

        if(this.state.email === '' || this.state.password === ''){
            this.setState({
                error: 'Fill in the missing field(s).'
            });
            return;
        }

        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(this.state.email)){
            this.setState({
                error: 'This isn\'t a valid email. Try again.'
            });
            return;
        }

        this.setState({
            error: 'Please wait...'
        });

        this.props.loginMutation({

            variables: {
                email: this.state.email.toLowerCase(),
                password: this.state.password
            }

        }).then(({data})=>{

            var token = data.login;
            var {value, message} = token;

            if(value){
                
                try{

                    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                    
                } catch(e){

                    this.setState({
                        error: 'Network issue. Try again!'
                    });

                }
                
            } else {

                this.setState({
                    error: message
                });

            }        

        }).catch(()=>{

            this.setState({
                error: 'Network issue. Try again!'
            });

        });
        
        /*
        .catch((error) => {
            if(error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email'){
                //console.log(error.code);
                this.setState({
                    error: 'Email doesn\'t exist. Try again.'
                });
            } else if(error.code === 'auth/wrong-password'){
                //console.log(error.code);
                this.setState({
                    error: 'Wrong password. Try again.'
                });
            } else {
                //console.log(error.code);
                this.setState({
                    error: 'Network error. Try again.'
                });
            }
        
        }); 
        */
    }

    render(){
        return(
            <div>
                <div className="login__back main__show">
                    <div className='login__box'>
                        <h1 className='heading__primary'>Leàna</h1>
                        <h2 className='heading__secondary'>Handcrafted by Avi Takiyar</h2>

                        <form id = "login" onSubmit = {this.submitForm} autoComplete="off">

                            <div className = "login__field">
                                <input type = "text" placeholder = "Email" onChange = { (e) => this.setState({email: e.target.value}) } />
                            </div>

                            <div className = "login__field">
                                <input type = "password" id="password" placeholder = "Password" onChange = { (e) => this.setState({password: e.target.value}) } />
                            </div>

                            <button>Enter</button>

                            <div id = 'login__error'>{this.state.error}</div>

                        </form>                    
                    </div>   
                </div>       
            </div>      
        );
    }

}

export default graphql(loginMutation, {name: 'loginMutation'})(Login);