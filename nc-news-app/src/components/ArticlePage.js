import React from 'react';
import { Link } from 'react-router-dom';
import Voter from './Voter';
import { updateVote } from '../api';

class ArticlePage extends React.Component {
  state = {
    article: {}
  };

  componentDidMount() {
    this.fetchArticle(this.props.match.params.article_id);
  }

  fetchArticle = (articleId) => {
    fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}`)
      .then(buffer => buffer.json())
      .then(article => this.setState({ article }))
      .catch(console.log)
  }

  makeVote = (id, direction) => {
    updateVote('articles', id, direction)
      .then(body => {
        this.setState({ article: body })
      })
  }

  render() {
    const { article } = this.state;
    return (
      <ArticleFull article={article} makeVote={this.makeVote} />
    );
  }
}

const ArticleFull = ({ article, makeVote }) => {
  const { _id, title, body, created_by, belongs_to, votes } = article;
  const onDownVote = makeVote.bind(null, _id, 'down');
  const onUpVote = makeVote.bind(null, _id, 'up');
  return (
    <section>
      <h3>{title}</h3>
      <p>{body}</p>
      <p>Author: <Link to={'/users/' + created_by}>{created_by}</Link></p>
      <p>Topic: <Link to={'/topics/' + belongs_to}>{belongs_to}</Link></p>
      <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
    </section>
  );
}

export default ArticlePage;