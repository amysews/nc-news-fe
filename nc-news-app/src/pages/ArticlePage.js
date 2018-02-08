import React from 'react';
import { Link } from 'react-router-dom';
import Voter from '../components/Voter';
import { updateVote, getArticle } from '../api';
import Comments from '../components/Comments';

class ArticlePage extends React.Component {
  state = {
    article: {}
  };

  componentDidMount() {
    this.fetchArticle(this.props.match.params.article_id);
  }

  fetchArticle = (articleId) => {
    getArticle(articleId)
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
      <section>
        <ArticleFull article={article} makeVote={this.makeVote} />
        <Comments articleId={article._id} />
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
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-subtitle mb-2 text-muted">By <Link to={'/users/' + created_by}>{created_by}</Link></p>
          <p className="card-text">{body}</p>
          <p className="card-subtitle mb-2 text-muted">Topic: <Link to={'/topics/' + belongs_to}>{belongs_to}</Link></p>
          <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;