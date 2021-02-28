import React from 'react';
import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import { getFeedbackQuery } from '../queries/queries';

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

class AddFeedback extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            feedbackId: '',

            error: '',
            block: false,
            done: false,

            name: '',
            email: '',
            phone: '',
            website: '',
            message: '',
            date: ''
        };

        this.addData = this.addData.bind(this);
    }

    componentDidMount(){
        try{
            document.getElementById('feedback').classList.add('selected');
        } catch(e){}

        this.addData();
    }

    componentWillUnmount(){
        try{
            document.getElementById('feedback').classList.remove('selected');
            clearTimeout(time);
        } catch(e){}
    }    

    addData(){

        const data = this.props.getFeedbackQuery;


        if(data.error) {

            this.setState({
                name: 'Something went wrong :(',
                message: 'Something went wrong :(',
                email: 'Something went wrong :(',
                phone: 'Something went wrong :(',
                website: 'Something went wrong :(',
                date: '1961-05-21',
    
                error: 'Something went wrong :(',
                block: true,
                done: true
            });

            return;
        }

        if(data.loading) {

            this.setState({
                name: 'Loading...',
                message: 'Loading...',
                email: 'Loading...',
                phone: 'Loading...',
                website: 'Loading...',
                date: '1961-05-21',
    
                error: 'Loading...',
                block: true
            });

            time = setTimeout(this.addData);

            return;
        }

        const mat = data.feedback;
    
        if(mat === null){
            this.setState({
                name: 'No such post exists.',
                message: 'No such post exists.',
                email: 'No such post exists.',
                phone: 'No such post exists.',
                website: 'No such post exists.',
                date: '1961-05-21',
    
                error: 'No such post exists.',
                block: true,
                done: true
            });

            return;
        }

        this.setState({
            name: mat.name || '',
            message: mat.message || '',
            email: mat.email || '',
            phone: mat.phone || '',
            website: mat.website || '',
            date: mat.date || '',

            error: '',
            block: false,
            feedbackId: mat.id
        });

    }    

    submitForm(e){
        e.preventDefault();
    }

    render(){
        return(
            <div className='main__show home__box all__box'>
                <div className='social__main'>

                <Link to='/feedback' style={style}><div className = 'back'><div className="set">&larr;</div></div></Link>

                <form id = "home-form" className="special" onSubmit = {this.submitForm} autoComplete="off">

                   <div className = "home__field">
                        <label style = {label}>Name</label>
                        <input value={this.state.name} readOnly className="blog__work" type = "text" placeholder = "Name" />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Date</label>
                        <input value={this.state.date} readOnly className="blog__work" type = "date" />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Email</label>
                        <input value={this.state.email} readOnly className="blog__work" type = "text" placeholder = "Email address" />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Phone</label>
                        <input value={this.state.phone} readOnly className="blog__work" type = "text" placeholder = "Phone no." />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Website</label>
                        <input value={this.state.website} readOnly className="blog__work" type = "text" placeholder = "Website name" />
                    </div>

                    <div className = "home__field">
                        <label style = {label}>Message</label>
                        <textarea value={this.state.message} readOnly className="blog__work text__new" placeholder = "Message...">

                        </textarea>
                    </div>

                    <div id = 'home__error' className = 'new--set'>{this.state.error}</div>

                </form>

                </div>
            </div>
        );
    }

}

export default graphql(getFeedbackQuery, {

    name: 'getFeedbackQuery',
    options: (props) => ({
        variables: {
            id: props.match.params.id
        },
        fetchPolicy: 'network-only'
    })

})(AddFeedback);
