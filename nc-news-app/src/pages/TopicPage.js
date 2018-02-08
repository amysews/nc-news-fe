import React from 'react';
import Articles from '../components/Articles';

class TopicPage extends React.Component {
  // display Nav with topics at the top of every page?

  render() {
    return (
      <section class="container articles" >
        <h1>Articles on {this.props.match.params.topic}</h1>
        <Articles endpoint={'topics/' + this.props.match.params.topic + '/articles'} />
      </section>
    )
  }
}

export default TopicPage;