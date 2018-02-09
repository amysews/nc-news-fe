import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Voter from './Voter';
import Loading from './Loading';
import { getArticles, updateVote } from '../api';
import moment from 'moment';

class Articles extends React.Component {
  state = {
    articles: [],
    total: null,
    loading: true,
    page: 0,
    limit: 10,
    sort: '-votes'
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    const { page, limit, sort } = this.state;
    getArticles(this.props.endpoint, page, limit, sort)
      .then(({ articles }) => this.setState({ articles, loading: false, total: articles.length }))
      .catch(console.log)
  }

  render() {
    const { articles, loading } = this.state;
    if (loading) return (<Loading message={"loading"} loading={loading} />)
    return (
      <section>

        <Pagination>
          <PaginationItem>
            <PaginationLink previous onClick={() => this.handlePageDirection(-1)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => this.handlePageNo(1)} >1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => this.handlePageNo(2)} >2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => this.handlePageNo(3)} >3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => this.handlePageNo(4)} >4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => this.handlePageNo(5)} >5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={() => this.handlePageDirection(1)} />
          </PaginationItem>
        </Pagination>

        Results per page: 
        <select onChange={this.handleLimit}>
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>

        Sort by:
        <select onChange={this.handleSort}>
          <option value="null">Most recent</option>
          <option value="-votes">Highest Voted</option>
          <option value="+votes">Lowest Voted</option>
        </select>

        {articles.map((article, i) => {
          return (
            <ArticleSummary article={article} makeVote={this.makeVote} key={i} />
          )
        })}
      </section>
    );
  }

  handleLimit = (e) => {
    this.setState({ limit: e.target.value }, () => this.fetchArticles());
  }

  handleSort = (e) => {
    this.setState({ sort: e.target.value }, () => this.fetchArticles());
  }

  handlePageDirection = (num) => {
    const oldPage = this.state.page;
    if (num === 1) this.setState({ page: oldPage + 1 }, () => this.fetchArticles());
    else if (num === -1 && oldPage !== 0) this.setState({ page: oldPage - 1 }, () => this.fetchArticles());
    else return;
  }

  handlePageNo = (num) => {
    this.setState({ page: num - 1 }, () => this.fetchArticles());
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
  const { _id, title, body, created_by, created_at, votes, comments } = article;
  const date = moment(created_at).format('MMMM Do YYYY, h:mm:ss a');  
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
            <p className="article-subtitle" >Written by <Link to={'/users/' + created_by}>{created_by}</Link> on {date}</p>
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