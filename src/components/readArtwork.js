import React from 'react';
import {flowRight as compose} from 'lodash';

import AddArtwork from './addArtwork';

import { graphql } from 'react-apollo';
import { updateArtworkMutation } from '../queries/mutations';
import { getArtworkQuery } from '../queries/queries';

class ReadArtwork extends React.Component{
    
    render(){

        return(
            <AddArtwork
                updateArtworkMutation = {this.props.updateArtworkMutation} 
                getArtworkQuery = {this.props.getArtworkQuery}
            />
        );
    
    }
}

export default compose(
    
    graphql(getArtworkQuery, {
        name: 'getArtworkQuery',
        options: (props) => ({
            variables: {
                id: props.match.params.id
            },
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateArtworkMutation, {name: 'updateArtworkMutation'})

)

(ReadArtwork);