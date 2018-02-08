import React from 'react';
import { Link } from 'react-router-dom';
import { getComments, updateVote, postComment, deleteComment } from '../api';
import FontAwesome from 'react-fontawesome';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Voter from './Voter';
import moment from 'moment';

class Comments extends React.Component {
  state = {
    comments: []
  };

  componentWillReceiveProps(newProps) {
    this.fetchComments(newProps.articleId);
  }

  fetchComments = (articleId) => {
    getComments(articleId)
      .then(({ comments }) => this.setState({ comments: comments }))
      .catch(console.log)
  }

  render() {
    const { comments } = this.state;
    return (
      <section className="container comments">
        <h1>Comments</h1>
        <PostComment submitComment={this.submitComment} />
        {comments.sort((a, b) => b.votes - a.votes).map((comment, i) => (
          <Comment comment={comment} makeVote={this.makeVote} deleteThisComment={this.deleteThisComment} key={i} />
        ))}
      </section>
    )
  }

  makeVote = (id, direction) => {
    updateVote('comments', id, direction)
      .then(body => {
        const newComment = body;
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
    e.target.comment.value = ''
    postComment(this.state.comments[0].belongs_to, newComment)
      .then(({ comment }) => {
        this.setState({ comments: [comment, ...this.state.comments] })
      })
  }

  deleteThisComment = (commentId) => {
    deleteComment(commentId)
      .then(res => {
        if (res.status === 200) {
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
            <p className="comment-body">{body}</p>
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