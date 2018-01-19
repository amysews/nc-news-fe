import React from 'react';
import { getUser } from '../api';

class UserPage extends React.Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.fetchUser(this.props.match.params.username);
  }

  fetchUser = (username) => {
    getUser(username)
      .then(({ user }) => this.setState({ user }))
      .catch(console.log)
  }

  render() {
    const { user } = this.state;
    return (
      <UserFull user={user} />
    )
  }
}

const UserFull = ({ user }) => {
  return (
    <section>
      <p>{user.name}</p>
      <p>{user.username}</p>
      <img src={user.avatar_url} alt={user.username} />
    </section>
  )
}

export default UserPage;