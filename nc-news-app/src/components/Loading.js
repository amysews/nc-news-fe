import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = ({ message, loading }) => {
  return (
    <div>
      <ClipLoader color={'#123abc'} loading={loading} />
      <p>{message}</p>
    </div>
  )
}

export default Loading;