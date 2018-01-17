import React from 'react';

class Articles extends React.Component {
  state = {

  };

  render() {
    return (
      <section>
        <h3>Selection of articles</h3>
        <ArticleSummary />
        <ArticleSummary />
        <ArticleSummary />
      </section>
    );
  }
}

const ArticleSummary = () => {
  return (
    <p>Article Summary</p>
  )
}

export default Articles;