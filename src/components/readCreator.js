import React from 'react';
import {flowRight as compose} from 'lodash';

import AddCreator from './addCreator';

import { graphql } from 'react-apollo';
import { updateCreatorMutation } from '../queries/mutations';
import { getCreatorQuery } from '../queries/queries';

class ReadCreator extends React.Component{
    
    render(){

        return(
            <AddCreator 
                updateCreatorMutation = {this.props.updateCreatorMutation} 
                getCreatorQuery = {this.props.getCreatorQuery}
            />
        );
    
    }
}

export default compose(
    
    graphql(getCreatorQuery, {
        name: 'getCreatorQuery',
        options: (props) => ({
            variables: {
                id: props.match.params.id
            },
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateCreatorMutation, {name: 'updateCreatorMutation'})

)

(ReadCreator);