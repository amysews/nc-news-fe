import React from 'react';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const Loading = ({ message, loading }) => {
  return (
    <div>
      <ClipLoader color={'#123abc'} loading={loading} />
      <p>{message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Loading;