import React from 'react';
import { Link } from 'react-router-dom';
import { getComments, updateVote, postComment, deleteComment } from '../api';
import FontAwesome from 'react-fontawesome';
import { Card, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';
import Voter from './Voter';
import moment from 'moment';

class Comments extends React.Component {
  state = {
    comments: [],
    articleId: null,
    sort: '-created_at'
  };

  componentWillReceiveProps(newProps) {
    this.fetchComments(newProps.articleId);
  }

  fetchComments = (articleId = this.state.articleId) => {
    console.log('fetch comments, ', articleId)
    getComments(articleId, this.state.sort)
      .then(({comments, sort}) => {
        console.log(sort, comments);
        this.setState({ comments, articleId })
      })
      .catch(console.log)
  }

  render() {
    const { comments, sort } = this.state;
    return (
      <section className="container comments">
        <h1>Comments</h1>

        <section className="display-options">
          <span className="handle-sort">
            Sort by:
            <select onChange={this.handleSort} value={sort} >
              <option value="-created_at">Newest</option>
              <option value="+created_at">Oldest</option>
              <option value="-votes">Highest Voted</option>
              <option value="+votes">Lowest Voted</option>
            </select>
          </span>
        </section>

        <PostComment submitComment={this.submitComment} />
        {comments.sort((a, b) => b.votes - a.votes).map((comment, i) => (
          <Comment comment={comment} makeVote={this.makeVote} deleteThisComment={this.deleteThisComment} key={i} />
        ))}
      </section>
    )
  }

  handleSort = (e) => {
    const { articleId } =  this.state;
    this.setState({ sort: e.target.value}, () => this.fetchComments(articleId));
  }

  makeVote = (id, direction) => {
    updateVote('comments', id, direction)
      .then(body => {
        const newComment = body.comment;
        const newComments = this.state.comments.map(comment => {
          if (comment._id === newComment._id) {
            return newComment;
          }
          else return comment;
        });
        this.setState({ comments: newComments });
      })
  }

  submitComment = (e) => {
    e.preventDefault();
    const newComment = e.target.comment.value;
    if (!newComment) return;
    e.target.comment.value = ''
    postComment(this.state.comments[0].belongs_to, newComment)
      .then(({ comment }) => {
        this.setState({ comments: [comment, ...this.state.comments] })
      })
  }

  deleteThisComment = (commentId) => {
    deleteComment(commentId)
      .then(res => {
        if (res.status === 204) {
          const oldComments = this.state.comments;
          const newComments = oldComments.filter(comment => comment["_id"] !== commentId)
          this.setState({ comments: newComments })
        }
      })
  }
}

const Comment = ({ comment, makeVote, deleteThisComment }) => {
  const { _id, body, created_by, created_at, votes } = comment;
  const date = moment(created_at).format('MMMM Do YYYY, h:mm:ss a');
  const onDownVote = makeVote.bind(null, _id, 'down');
  const onUpVote = makeVote.bind(null, _id, 'up');
  return (
    <section>
      <Card>
        <CardBody>
          <CardText>
            <span className="comment-body">{body}</span>
          </CardText>
          <CardSubtitle>
            <p className="comment-subtitle">{date} by <Link to={'/users/' + created_by}>{created_by}</Link></p>
          </CardSubtitle>
          <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
          <FontAwesome name="trash" className="delete-button" onClick={() => deleteThisComment(_id)} />
        </CardBody>
      </Card>
    </section>

  )
}

const PostComment = ({ submitComment }) => {
  return (
    <section className="submit-comment">
      <form onSubmit={submitComment}>
        <textarea id="comment" placeholder="Add your comment..." />
        <Button outline color="success" type="submit" >Submit</Button>
      </form>
    </section>
  )
}

export default Comments;