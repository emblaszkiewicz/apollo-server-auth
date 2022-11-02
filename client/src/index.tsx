import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';

const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <GoogleOAuthProvider clientId='972483310919-u2kkktlid4ua8eckc96r4cu952oqd7hl.apps.googleusercontent.com'>
              <App />
          </GoogleOAuthProvider>
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
