import React from 'react';

import AddArtwork from './addArtwork';

import { graphql } from 'react-apollo';
import { addArtworkMutation } from '../queries/mutations';

class NewArtwork extends React.Component{
    
    render(){

        return(
            <AddArtwork addArtworkMutation = {this.props.addArtworkMutation} />
        );
    
    }
}

export default graphql(addArtworkMutation, {name: 'addArtworkMutation'})(NewArtwork);