import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Apollo Client Setup

const client = new ApolloClient({
  uri: 'https://server.leana.gq/',
  /*
  request: async (operation) => {     
      const token = localStorage.getItem('token');
      operation.setContext({
         headers: {
            authorization: token ? token : ''
         }
     });
  },
  */
  credentials: 'include'
});

ReactDOM.render(
 <ApolloProvider client = {client}>
    <App />
 </ApolloProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
