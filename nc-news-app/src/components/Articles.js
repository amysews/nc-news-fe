import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Voter from './Voter';
import Loading from './Loading';
import { getArticles, updateVote } from '../api';

class Articles extends React.Component {
  state = {
    articles: [],
    loading: true
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    getArticles(this.props.endpoint)
      .then(({ articles }) => this.setState({ articles, loading: false }))
      .catch(console.log)
  }

  render() {
    const { articles, loading } = this.state;
    if (loading) return (<Loading message={"loading"} loading={loading} />)
    return (
      <section>
        {articles.sort((a, b) => b.votes - a.votes).slice(0, 10).map((article, i) => {
          return (
            <ArticleSummary article={article} makeVote={this.makeVote} key={i} />
          )
        })}
      </section>
    );
  }

  makeVote = (id, direction) => {
    updateVote('articles', id, direction)
      .then(body => {
        const newArticle = body;
        const newArticles = this.state.articles.map(article => {
          if (article._id === newArticle._id) {
            newArticle.comments = article.comments;
            return newArticle;
          }
          else return article;
        });
        this.setState({ articles: newArticles });
      })
  }
}

const ArticleSummary = ({ article, makeVote }) => {
  const { _id, title, body, created_by, votes, comments } = article;
  const onDownVote = makeVote.bind(null, _id, 'down');
  const onUpVote = makeVote.bind(null, _id, 'up');
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle>
            <Link to={'/articles/' + _id}><p className="article-title">{title}</p></Link>
          </CardTitle>
          <CardSubtitle>
            <p className="article-subtitle" >Written by <Link to={'/users/' + created_by}>{created_by}</Link></p>
          </CardSubtitle>
          <CardText>
            <p className="article-body" >"{body.slice(0, 250)}..."</p>
            <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
            <span className="article-comments" ><FontAwesome name='comments' /> {comments}</span>
          </CardText>
        </CardBody>
      </Card>
    </section>
  )
}

export default Articles;