import React from 'react';
import {flowRight as compose} from 'lodash';

import AddTeam from './addTeam';

import { graphql } from 'react-apollo';
import { updateMemberMutation } from '../queries/mutations';
import { getMemberQuery } from '../queries/queries';

class ReadTeam extends React.Component{
    
    render(){

        return(
            <AddTeam 
                updateMemberMutation = {this.props.updateMemberMutation} 
                getMemberQuery = {this.props.getMemberQuery}
            />
        );
    
    }
}

export default compose(
    
    graphql(getMemberQuery, {
        name: 'getMemberQuery',
        options: (props) => ({
            variables: {
                id: props.match.params.id
            },
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateMemberMutation, {name: 'updateMemberMutation'})

)

(ReadTeam);