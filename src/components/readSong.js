import React from 'react';
import {flowRight as compose} from 'lodash';

import AddSong from './addSong';

import { graphql } from 'react-apollo';
import { updateSongMutation } from '../queries/mutations';
import { getSongQuery } from '../queries/queries';

class ReadSong extends React.Component{
    
    render(){

        return(
            <AddSong
                updateSongMutation = {this.props.updateSongMutation} 
                getSongQuery = {this.props.getSongQuery}
            />
        );
    
    }
}

export default compose(
    
    graphql(getSongQuery, {
        name: 'getSongQuery',
        options: (props) => ({
            variables: {
                id: props.match.params.id
            },
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateSongMutation, {name: 'updateSongMutation'})

)

(ReadSong);