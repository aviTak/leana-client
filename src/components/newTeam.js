import React from 'react';

import AddTeam from './addTeam';

import { graphql } from 'react-apollo';
import { addMemberMutation } from '../queries/mutations';

class NewTeam extends React.Component{
    
    render(){

        return(
            <AddTeam addMemberMutation = {this.props.addMemberMutation} />
        );
    
    }
}

export default graphql(addMemberMutation, {name: 'addMemberMutation'})(NewTeam);
