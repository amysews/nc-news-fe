import React from 'react';
import Articles from './Articles';

const HomePage = () => {
  return (
    <section>
      <Articles endpoint={'articles'} />
    </section>
  );
};

export default HomePage;