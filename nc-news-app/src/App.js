import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './main.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import TopicsPage from './pages/TopicsPage';
import TopicPage from './pages/TopicPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import ArticlePage from './pages/ArticlePage';
import { getUser } from './api';


class App extends React.Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.fetchUser('northcoder');
  }

  fetchUser = (username) => {
    getUser(username)
      .then(({ user }) => this.setState({ user }))
      .catch(console.log);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar user={this.state.user} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/articles" component={HomePage} />
            <Route exact path="/articles/:article_id" render={(props) => <ArticlePage loggedInUser={this.state.user} {...props} />} />
            <Route exact path="/topics" component={TopicsPage} />
            <Route exact path="/topics/:topic" component={TopicPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/users/:username" component={UserPage} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;