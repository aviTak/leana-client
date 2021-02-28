import React from 'react';
import CKEditor from 'ckeditor4-react';
import {flowRight as compose} from 'lodash';
import firebase from 'firebase/app';

import { graphql } from 'react-apollo';
import { updateContactMutation } from '../queries/mutations';
import { getContactQuery } from '../queries/queries';

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

class Contact extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: '',
            block: false,
            done: false,
            // wys: false,

            heading: '',
            info: '',
            primaryEmail: '',
            secondaryEmail: '',
            tertiaryEmail: '',
            primaryPhone: '',
            secondaryPhone: '',
            tertiaryPhone: '',
            name: '',
            flat: '',
            area: '',
            landmark: '',
            city: '',
            state: '',
            pin: '',
            description: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('contact').classList.add('selected');
        } catch(e){}

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('contact').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }

    addData(){

        const data = this.props.getContactQuery;

        if(data.error) {

            this.setState({
                heading: 'Something went wrong :(',
                info: 'Something went wrong :(',
                primaryEmail: 'Something went wrong :(',
                secondaryEmail: 'Something went wrong :(',
                tertiaryEmail: 'Something went wrong :(',
                primaryPhone: 'Something went wrong :(',
                secondaryPhone: 'Something went wrong :(',
                tertiaryPhone: 'Something went wrong :(',
                name: 'Something went wrong :(',
                flat: 'Something went wrong :(',
                area: 'Something went wrong :(',
                landmark: 'Something went wrong :(',
                city: 'Something went wrong :(',
                state: 'Something went wrong :(',
                pin: 210561,
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
                info: 'Loading...',
                primaryEmail: 'Loading...',
                secondaryEmail: 'Loading...',
                tertiaryEmail: 'Loading...',
                primaryPhone: 'Loading...',
                secondaryPhone: 'Loading...',
                tertiaryPhone: 'Loading...',
                name: 'Loading...',
                flat: 'Loading...',
                area: 'Loading...',
                landmark: 'Loading...',
                city: 'Loading...',
                state: 'Loading...',
                pin: 210561,
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

        const mat = data.contact;
    
        if(mat === null){
            this.setState({
                heading: '',
                info: '',
                primaryEmail: '',
                secondaryEmail: '',
                tertiaryEmail: '',
                primaryPhone: '',
                secondaryPhone: '',
                tertiaryPhone: '',
                name: '',
                flat: '',
                area: '',
                landmark: '',
                city: '',
                state: '',
                pin: '',
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
            info: mat.info || '',
            primaryEmail: mat.primaryEmail || '',
            secondaryEmail: mat.secondaryEmail || '',
            tertiaryEmail: mat.tertiaryEmail || '',
            primaryPhone: mat.primaryPhone || '',
            secondaryPhone: mat.secondaryPhone || '',
            tertiaryPhone: mat.tertiaryPhone || '',
            name: mat.name || '',
            flat: mat.flat || '',
            area: mat.area || '',
            landmark: mat.landmark || '',
            city: mat.city || '',
            state: mat.state || '',
            pin: mat.pin || '',
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

    isPhone(a){
        var letters = /^[A-Za-z]+$/;
        if(a.match(letters)){
            return false;
        }
        return true;
    }

    isEmail(a){
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(a)){
            return false;
        }
        return true;
    }

    submitForm(e){

        e.preventDefault();

        if(this.state.done){
            alert(this.state.heading);
            return;
        }

        if(this.state.block)
            return;


        if(this.state.primaryEmail && !this.isEmail(this.state.primaryEmail)){
            alert('Enter a valid primary email.');
            return;
        }
        if(this.state.secondaryEmail && !this.isEmail(this.state.secondaryEmail)){
            alert('Enter a valid secondary email.');
            return;
        }
        if(this.state.tertiaryEmail && !this.isEmail(this.state.tertiaryEmail)){
            alert('Enter a valid tertiary email.');
            return;
        }
        if(this.state.primaryPhone && !this.isPhone(this.state.primaryPhone)){
            alert('Enter a valid primary phone no.');
            return;
        }
        if(this.state.secondaryPhone && !this.isPhone(this.state.secondaryPhone)){
            alert('Enter a valid secondary phone no.');
            return;
        }
        if(this.state.tertiaryPhone && !this.isPhone(this.state.tertiaryPhone)){
            alert('Enter a valid tertiary phone no.');
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


        this.props.updateContactMutation({

            variables: {
                heading: this.state.heading,
                info: this.state.info,
                primaryEmail: this.state.primaryEmail,
                secondaryEmail: this.state.secondaryEmail,
                tertiaryEmail: this.state.tertiaryEmail,
                primaryPhone: this.state.primaryPhone,
                secondaryPhone: this.state.secondaryPhone,
                tertiaryPhone: this.state.tertiaryPhone,
                name: this.state.name,
                flat: this.state.flat,
                area: this.state.area,
                landmark: this.state.landmark,
                city: this.state.city,
                state: this.state.state,
                pin: this.state.pin,
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
                <div className='social__main'>

                <form id = "home-form" onSubmit = {this.submitForm} autoComplete="off">

                   <div className = "home__field">
                        <label style = {label}>Heading</label>
                        <input value={this.state.heading} className="blog__work" type = "text" placeholder = "Contact heading" onChange = { (e) => this.setState({heading: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Summary</label>
                        <textarea value={this.state.info} className="blog__work" onChange = { (e) => this.setState({info: e.target.value}) } placeholder = "Add your contact summary here...">

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

                    <div className = "home__field">
                        <label style = {label}>Primary Email</label>
                        <input value={this.state.primaryEmail} className="blog__work" type = "text" placeholder = "Primary email" onChange = { (e) => this.setState({primaryEmail: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Secondary Email</label>
                        <input value={this.state.secondaryEmail} className="blog__work" type = "text" placeholder = "Secondary email" onChange = { (e) => this.setState({secondaryEmail: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Tertiary Email</label>
                        <input value={this.state.tertiaryEmail} className="blog__work" type = "text" placeholder = "Tertiary email" onChange = { (e) => this.setState({tertiaryEmail: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Primary Phone</label>
                        <input value={this.state.primaryPhone} className="blog__work" type = "text" placeholder = "Primary phone no." onChange = { (e) => this.setState({primaryPhone: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Secondary Phone</label>
                        <input value={this.state.secondaryPhone} className="blog__work" type = "text" placeholder = "Secondary phone no." onChange = { (e) => this.setState({secondaryPhone: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Tertiary Phone</label>
                        <input value={this.state.tertiaryPhone} className="blog__work" type = "text" placeholder = "Tertiary phone no." onChange = { (e) => this.setState({tertiaryPhone: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Address Name</label>
                        <input value={this.state.name} className="blog__work" type = "text" placeholder = "Address name" onChange = { (e) => this.setState({name: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>House No.</label>
                        <input value={this.state.flat} className="blog__work" type = "text" placeholder = "Flat, House no., Building, Company, Apartment" onChange = { (e) => this.setState({flat: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Area</label>
                        <input value={this.state.area} className="blog__work" type = "text" placeholder = "Area, Colony, Street, Sector, Village" onChange = { (e) => this.setState({area: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Landmark</label>
                        <input value={this.state.landmark} className="blog__work" type = "text" placeholder = "Landmark e.g. Near Taj Hotel" onChange = { (e) => this.setState({landmark: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>City</label>
                        <input value={this.state.city} className="blog__work" type = "text" placeholder = "Town/City" onChange = { (e) => this.setState({city: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>State</label>
                        <input value={this.state.state} className="blog__work" type = "text" placeholder = "State" onChange = { (e) => this.setState({state: e.target.value}) } />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Pin Code</label>
                        <input value={this.state.pin} className="blog__work" type = "number" placeholder = "Pin code" onChange = { (e) => this.setState({pin: e.target.value}) } />
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
    
    graphql(getContactQuery, {
        name: 'getContactQuery',
        options: () => ({
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateContactMutation, {name: 'updateContactMutation'})

)

(Contact);
