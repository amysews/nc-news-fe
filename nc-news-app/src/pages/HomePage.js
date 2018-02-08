import React from 'react';
import Articles from '../components/Articles';

const HomePage = () => {
  return (
    <section class="container articles">
      <h3>Most popular articles</h3>
      <Articles endpoint={'articles'} />
    </section>
  );
};

export default HomePage;