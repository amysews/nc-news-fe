import React from 'react';
import Articles from '../components/Articles';
import PropTypes from 'prop-types';

class TopicPage extends React.Component {

  render() {
    return (
      <section className="container articles" >
        <h1>Articles on {this.props.match.params.topic}</h1>
        <Articles endpoint={'topics/' + this.props.match.params.topic + '/articles'} />
      </section>
    );
  }
}

TopicPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      topic: PropTypes.string,
    }),
  }).isRequired,
};

export default TopicPage;