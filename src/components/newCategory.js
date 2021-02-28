import React from 'react';

import AddCategory from './addCategory';

import { graphql } from 'react-apollo';
import { addCategoryMutation } from '../queries/mutations';

class NewCategory extends React.Component{
    
    render(){

        return(
            <AddCategory addCategoryMutation = {this.props.addCategoryMutation} />
        );
    
    }
}

export default graphql(addCategoryMutation, {name: 'addCategoryMutation'})(NewCategory);
