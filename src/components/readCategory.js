import React from 'react';
import {flowRight as compose} from 'lodash';

import AddCategory from './addCategory';

import { graphql } from 'react-apollo';
import { updateCategoryMutation } from '../queries/mutations';
import { getCategoryQuery } from '../queries/queries';

class ReadCategory extends React.Component{
    
    render(){

        return(
            <AddCategory 
                updateCategoryMutation = {this.props.updateCategoryMutation} 
                getCategoryQuery = {this.props.getCategoryQuery}
            />
        );
    
    }
}

export default compose(
    
    graphql(getCategoryQuery, {
        name: 'getCategoryQuery',
        options: (props) => ({
            variables: {
                id: props.match.params.id
            },
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateCategoryMutation, {name: 'updateCategoryMutation'})

)

(ReadCategory);