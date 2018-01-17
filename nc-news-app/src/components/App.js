import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import PageNotFound from './PageNotFound';
import TopicsPage from './TopicsPage';
import TopicPage from './TopicPage';
import UsersPage from './UsersPage';
import UserPage from './UserPage';
import ArticlePage from './ArticlePage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/articles/:article_id" component={ArticlePage} />
            <Route exact path="/topics" component={TopicsPage} />
            <Route exact path="/topics/:topic" component={TopicPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/users/:username" component={UserPage} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;