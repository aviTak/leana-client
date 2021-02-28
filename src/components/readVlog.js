import React from 'react';
import {flowRight as compose} from 'lodash';

import AddVlog from './addVlog';

import { graphql } from 'react-apollo';
import { updateVlogMutation } from '../queries/mutations';
import { getVlogQuery } from '../queries/queries';

class ReadVlog extends React.Component{
    
    render(){

        return(
            <AddVlog
                updateVlogMutation = {this.props.updateVlogMutation} 
                getVlogQuery = {this.props.getVlogQuery}
            />
        );
    
    }
}

export default compose(
    
    graphql(getVlogQuery, {
        name: 'getVlogQuery',
        options: (props) => ({
            variables: {
                id: props.match.params.id
            },
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateVlogMutation, {name: 'updateVlogMutation'})

)

(ReadVlog);