import React from 'react';

import AddVlog from './addVlog';

import { graphql } from 'react-apollo';
import { addVlogMutation } from '../queries/mutations';

class NewVlog extends React.Component{
    
    render(){

        return(
            <AddVlog addVlogMutation = {this.props.addVlogMutation} />
        );
    
    }
}

export default graphql(addVlogMutation, {name: 'addVlogMutation'})(NewVlog);