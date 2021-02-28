import React from 'react';

import AddBlog from './addBlog';

import { graphql } from 'react-apollo';
import { addBlogMutation } from '../queries/mutations';

class NewBlog extends React.Component{
    
    render(){

        return(
            <AddBlog addBlogMutation = {this.props.addBlogMutation} />
        );
    
    }
}

export default graphql(addBlogMutation, {name: 'addBlogMutation'})(NewBlog);