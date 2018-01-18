import React from 'react';
import Articles from './Articles';

class TopicPage extends React.Component {
  // not used?
  state = {
    articles: []
  };

  // display Nav with topics at the top of every page?
  
  render() {
    return (
      <section>
        <h1>All the articles about {this.props.match.params.topic}</h1>
        <Articles endpoint={'topics/' + this.props.match.params.topic + '/articles'} />
      </section>
    )
  }
}

export default TopicPage;