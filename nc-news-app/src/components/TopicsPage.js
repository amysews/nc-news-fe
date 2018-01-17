import React from 'react';
import { Link } from 'react-router-dom';

class TopicsPage extends React.Component {
  state = {
    topics: []
  };

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    fetch(`${process.env.REACT_APP_API_URL}/topics`)
      .then(buffer => buffer.json())
      .then(({ topics }) => this.setState({ topics }))
      .catch(console.log)
  }

  render() {
    const { topics } = this.state;
    return (
      <section>
        <h1>List of Topics</h1>
        {topics.map((topic, i) => {
          return (
            <Topic topic={topic} key={i} />
          )
        })}
      </section>
    );
  }
}

const Topic = ({ topic }) => {
  return (
    <section>
      <Link to={'/topics/' + topic.slug}><p>{topic.title}</p></Link>
    </section>
  )
}

export default TopicsPage;