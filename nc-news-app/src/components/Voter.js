import React from 'react';

const Voter = ({ voteCount, downVote, upVote }) => {
  return (
    <section className="voting">
      <button className="btn btn-outline-secondary" onClick={downVote}>-</button>
      <span>{voteCount}</span>
      <button className="btn btn-outline-secondary" onClick={upVote}>+</button>
    </section>
  )
}

export default Voter;