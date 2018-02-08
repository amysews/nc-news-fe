import React from 'react';
import Articles from '../components/Articles';

const HomePage = () => {
  return (
    <section class="container articles">
      <h1>Most popular articles</h1>
      <Articles endpoint={'articles'} />
    </section>
  );
};

export default HomePage;