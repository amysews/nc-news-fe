import React from 'react';
import { Link } from 'react-router-dom';

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

  render() {
    const { article } = this.state;
    return (
      <ArticleFull article={article} />
    );
  }
}

const ArticleFull = ({ article }) => {
  const { title, body, created_by, belongs_to, votes } = article;
  return (
    <section>
      <h3>{title}</h3>
      <p>{body}</p>
      <p>Author: <Link to={'/users/' + created_by}>{created_by}</Link></p>
      <p>Topic: <Link to={'/topics/' + belongs_to}>{belongs_to}</Link></p>
      <p>Votes: {votes}</p>
    </section>
  );
}

export default ArticlePage;