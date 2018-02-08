import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/articles" component={HomePage} />
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