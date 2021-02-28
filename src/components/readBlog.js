import React from 'react';
import {flowRight as compose} from 'lodash';

import AddBlog from './addBlog';

import { graphql } from 'react-apollo';
import { updateBlogMutation } from '../queries/mutations';
import { getBlogQuery } from '../queries/queries';

class ReadBlog extends React.Component{
    
    render(){

        return(
            <AddBlog 
                updateBlogMutation = {this.props.updateBlogMutation} 
                getBlogQuery = {this.props.getBlogQuery}
            />
        );
    
    }
}

export default compose(
    
    graphql(getBlogQuery, {
        name: 'getBlogQuery',
        options: (props) => ({
            variables: {
                permalink: props.match.params.id
            },
            fetchPolicy: 'network-only'
        })
    }),

    graphql(updateBlogMutation, {name: 'updateBlogMutation'})

)

(ReadBlog);