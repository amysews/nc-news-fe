import React from 'react';
import { getComments, updateVote, postComment } from '../api';
import Voter from './Voter';

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
      <section>
        <h1>Comments</h1>
        <PostComment submitComment={this.submitComment} />
        {comments.sort((a, b) => b.votes - a.votes).map((comment, i) => (
          <Comment comment={comment} makeVote={this.makeVote} key={i} />
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
}

const Comment = ({ comment, makeVote }) => {
  const { _id, body, created_by, created_at, votes, belongs_to } = comment;
  const onDownVote = makeVote.bind(null, _id, 'down');
  const onUpVote = makeVote.bind(null, _id, 'up');
  return (
    <section>
      <p>{body}</p>
      <p>{created_by}</p>
      <p>{created_at}</p>
      <Voter voteCount={votes} downVote={onDownVote} upVote={onUpVote} />
    </section>
  )
}

const PostComment = ({ submitComment }) => {
  return (
    <section>
      <form onSubmit={submitComment}>
        <textarea id="comment" placeholder="Add your comment..." />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default Comments;