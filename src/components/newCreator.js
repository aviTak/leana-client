import React from 'react';

import AddCreator from './addCreator';

import { graphql } from 'react-apollo';
import { addCreatorMutation } from '../queries/mutations';

class NewCreator extends React.Component{
    
    render(){

        return(
            <AddCreator addCreatorMutation = {this.props.addCreatorMutation} />
        );
    
    }
}

export default graphql(addCreatorMutation, {name: 'addCreatorMutation'})(NewCreator);