import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Voter from '../components/Voter';
import { updateVote, getArticle } from '../api';
import Comments from '../components/Comments';

class ArticlePage extends React.Component {
  state = {
    article: {},
    loading: true
  };

  componentDidMount() {
    this.fetchArticle(this.props.match.params.article_id); 
  }

  fetchArticle = (articleId) => {
    getArticle(articleId)
      .then(({ article }) => this.setState({ article, loading: false }))
      .catch(console.log)
  }

  makeVote = (id, direction) => {
    updateVote('articles', id, direction)
      .then(body => {
        this.setState({ article: body.article })
      })
  }

  render() {
    const { article } = this.state;
    return (
      <section>
        <ArticleFull article={article} makeVote={this.makeVote} />
        <Comments loggedInUser={this.props.loggedInUser} articleId={article._id} />
      </section>
    );
  }
}

const ArticleFull = ({ article, makeVote }) => {
  const { _id, title, body, created_by, belongs_to, votes } = article;
  const onDownVote = makeVote.bind(null, _id, 'down');
  const onUpVote = makeVote.bind(null, _id, 'up');
  return (
    <div className="container">
      <Card>
        <CardBody>
          <CardTitle>
            <p className="article-title">{title}</p>
          </CardTitle>
          <CardSubtitle>
            <p className="article-subtitle">Written by <Link to={'/users/' + created_by}>{created_by}</Link></p>
          </CardSubtitle>
          <CardText>
            <span className="article-body">{body}</span>
          </CardText>
            <p className="article-comments">Topic: <Link to={'/topics/' + belongs_to}>{belongs_to}</Link></p>
            <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
        </CardBody>
      </Card>
    </div>
  );
}

export default ArticlePage;