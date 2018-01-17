import React from 'react';
import { Link } from 'react-router-dom';

class Articles extends React.Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    fetch(`${process.env.REACT_APP_API_URL}/${this.props.endpoint}`)
      .then(buffer => buffer.json())
      .then(({ articles }) => this.setState({ articles }))
      .catch(console.log)
  }

  render() {
    const { articles } = this.state;
    return (
      <section>
        <h3>Selection of articles</h3>
        {articles.sort((a,b) => b.votes - a.votes).slice(0, 10).map((article, i) => {
          return (
            <ArticleSummary article={article} key={i} />
          )
        })}
      </section>
    );
  }
}

const ArticleSummary = ({ article }) => {
  const { _id, title, body, created_by, belongs_to, votes, comments } = article;
  return (
    <section>
      <Link to={'/articles/' + _id}><p>{title}</p></Link>
      <Link to={'/users/' + created_by}><p>{created_by}</p></Link>
      <p>Votes: {votes}</p>
      <p>Comments: {comments}</p>
    </section>
  )
}

export default Articles;