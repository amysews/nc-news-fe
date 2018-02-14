import React from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../api';
import PropTypes from 'prop-types';

class TopicsPage extends React.Component {
  state = {
    topics: []
  };

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    getTopics()
      .then(({ topics }) => this.setState({ topics }))
      .catch(console.log);
  }

  render() {
    const { topics } = this.state;
    return (
      <section>
        <h1>List of Topics</h1>
        {topics.map((topic, i) => {
          return (
            <Topic topic={topic} key={i} />
          );
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
  );
};

Topic.propTypes = {
  topic: PropTypes.object.isRequired
};

export default TopicsPage;