import React from 'react';
import { Link } from 'react-router-dom';
import Voter from './Voter';
import { updateVote } from '../api';

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

  makeVote = (id, direction) => {
    updateVote('articles', id, direction)
      .then(body => {
        const newArticle = body;
        const newArticles = this.state.articles.map(article => {
          if (article._id === newArticle._id) return newArticle;
          else return article;
        });
        this.setState({ articles: newArticles });
      })
  }

  render() {
    const { articles } = this.state;
    return (
      <section>
        <h3>Selection of articles</h3>
        {articles.sort((a,b) => b.votes - a.votes).slice(0, 10).map((article, i) => {
          return (
            <ArticleSummary article={article} makeVote={this.makeVote} key={i} />
          )
        })}
      </section>
    );
  }
}

const ArticleSummary = ({ article, makeVote }) => {
  const { _id, title, body, created_by, belongs_to, votes, comments } = article;
  const onDownVote = makeVote.bind(null, _id, 'down');
  const onUpVote = makeVote.bind(null, _id, 'up');
  return (
    <section>
      <Link to={'/articles/' + _id}><p>{title}</p></Link>
      <Link to={'/users/' + created_by}><p>{created_by}</p></Link>
      <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
      <p>Comments: {comments}</p>
    </section>
  )
}

export default Articles;