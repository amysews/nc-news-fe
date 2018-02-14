import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const Voter = ({ voteCount, downVote, upVote }) => {
  return (
    <span className="voting">
      <FontAwesome name='thumbs-up' className="vote-up" onClick={upVote} />
      <span>  {voteCount}  </span>
      <FontAwesome name='thumbs-down' className="vote-down" onClick={downVote} />
    </span>
  );
};

Voter.propTypes = {
  voteCount: PropTypes.number.isRequired,
  downVote: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired
};

export default Voter;