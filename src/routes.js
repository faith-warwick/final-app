import React from 'react';
import {Redirect, Route, Router} from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Profile from './Home/profile';

const auth = new Auth();

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication()
        ;
    }
};

// Import modules
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Create connection link
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjgzbkgwt4zgc0123e1qikiv9' });

// Configure client with link
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <ApolloProvider client={client}>
            <div>
                <Route path="/" render={(props) => <App auth={auth} {...props} />}/>
                <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/profile" render={(props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home"/>
                    ) : (
                        <Profile auth={auth} {...props} />
                    )
                )}/>
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}
                />
            </div>
            </ApolloProvider>
        </Router>
    );
}
