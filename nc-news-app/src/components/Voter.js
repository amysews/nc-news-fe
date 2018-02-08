import React from 'react';
import FontAwesome from 'react-fontawesome';

const Voter = ({ voteCount, downVote, upVote }) => {
  return (
    <span className="voting">
      <FontAwesome name='thumbs-up' className="vote-up" onClick={upVote} />
      <span>  {voteCount}  </span>
      <FontAwesome name='thumbs-down' className="vote-down" onClick={downVote} />
    </span>
  )
}

export default Voter;