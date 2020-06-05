import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/create-point" component={CreatePoint} />
                <Route path="*" exact render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
};

export default Routes;
