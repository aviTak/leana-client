import React from 'react';

import AddSong from './addSong';

import { graphql } from 'react-apollo';
import { addSongMutation } from '../queries/mutations';

class NewSong extends React.Component{
    
    render(){

        return(
            <AddSong addSongMutation = {this.props.addSongMutation} />
        );
    
    }
}

export default graphql(addSongMutation, {name: 'addSongMutation'})(NewSong);
