import React from 'react';
import Articles from '../components/Articles';

class TopicPage extends React.Component {

  render() {
    return (
      <section className="container articles" >
        <h1>Articles on {this.props.match.params.topic}</h1>
        <Articles endpoint={'topics/' + this.props.match.params.topic + '/articles'} />
      </section>
    )
  }
}

export default TopicPage;