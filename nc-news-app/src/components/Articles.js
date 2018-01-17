import React from 'react';

class Articles extends React.Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    fetch(`${process.env.REACT_APP_API_URL}/articles`)
      .then(buffer => buffer.json())
      .then(({ articles }) => this.setState({ articles }))
      .catch(console.log)
  }

  render() {
    const { articles } = this.state;
    return (
      <section>
        <h3>Selection of articles</h3>
        {articles.map((article, i) => {
          return (
            <ArticleSummary article={article} />
          )
        })}
      </section>
    );
  }
}

const ArticleSummary = ({ article }) => {
  return (
    <section>
      <p>{article.title}</p>
      <p>{article.created_by}</p>
    </section>
  )
}

export default Articles;