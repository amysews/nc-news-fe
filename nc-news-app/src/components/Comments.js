import React from 'react';
import { getComments, updateVote, postComment, deleteComment } from '../api';
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
        <h3>Comments</h3>
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
    <div className="card">
      <div className="card-body">
        <p className="card-text">{body}</p>
        <p className="card-subtitle mb-2 text-muted">{date} by {created_by}</p>
        <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
        <button className="btn btn-danger" onClick={() => deleteThisComment(_id)}  >Delete</button>
      </div>
    </div>
  )
}

const PostComment = ({ submitComment }) => {
  return (
    <section className="submit-comment">
      <form onSubmit={submitComment}>
        <textarea id="comment" placeholder="Add your comment..." />
        <button class="btn btn-secondary" type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Comments;