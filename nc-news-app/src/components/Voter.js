import React from 'react';

const Voter = ({ voteCount, downVote, upVote }) => {
  return (
    <section>
      <button onClick={downVote}>-</button>
      <span>{voteCount}</span>
      <button onClick={upVote}>+</button>
    </section>
  )
}

export default Voter;