import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Voter from './Voter';
import Loading from './Loading';
import { getArticles, updateVote } from '../api';

class Articles extends React.Component {
  state = {
    articles: [],
    count: null,
    loading: true,
    currentPage: 0,
    targetPage: 0,
    limit: 10,
    sort: '-votes'
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    const { targetPage, limit, sort, currentPage } = this.state;
    getArticles(this.props.endpoint, targetPage, limit, sort)
      .then(({ articles }) => {
        if (articles.length) this.setState({ articles, loading: false, count: articles.length, currentPage: targetPage });
        else this.setState({ laoding: false, targetPage: currentPage });
      })
      .catch(console.log)
  }

  render() {
    const { articles, loading, currentPage, sort, limit } = this.state;
    if (loading) return (<Loading message={"loading"} loading={loading} />)
    return (
      <section>

        <section className="display-options">
          <span className="handle-limit">
            Results per page:
            <select onChange={this.handleLimit} value={limit}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </span>

          <span className="handle-sort">
            Sort by:
            <select onChange={this.handleSort} value={sort} >
              <option value="-votes">Highest Voted</option>
              <option value="+votes">Lowest Voted</option>
            </select>
          </span>
        </section>

        {articles.map((article, i) => {
          return (
            <ArticleSummary article={article} makeVote={this.makeVote} key={i} />
          )
        })}

        <Pagination className="pagination" >
          <PaginationItem className="prev" >
            <PaginationLink previous onClick={this.previousPage} />
          </PaginationItem>
          <span className="page-num" >{`Page ${currentPage + 1}`}</span>
          <PaginationItem className="next" >
            <PaginationLink next onClick={this.nextPage} />
          </PaginationItem>
        </Pagination>

      </section>
    );
  }

  handleLimit = (e) => {
    this.setState({ limit: e.target.value, currentPage: 0, targetPage: 0 }, () => this.fetchArticles());
  }

  handleSort = (e) => {
    this.setState({ sort: e.target.value, currentPage: 0, targetPage: 0 }, () => this.fetchArticles());
  }

  previousPage = () => {
    if (this.state.currentPage) this.setState({ targetPage: this.state.currentPage - 1 }, () => this.fetchArticles());
    else return;
  }

  nextPage = () => {
    this.setState({ targetPage: this.state.currentPage + 1 }, () => this.fetchArticles());
  }

  makeVote = (id, direction) => {
    updateVote('articles', id, direction)
      .then(body => {
        const newArticle = body.article;
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
            <span className="article-body" >"{body.slice(0, 250)}..."</span>
            <br />
            <br />
            <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
            <span className="article-comments" ><FontAwesome name='comments' /> {comments}</span>
          </CardText>
        </CardBody>
      </Card>
    </section>
  )
}

export default Articles;