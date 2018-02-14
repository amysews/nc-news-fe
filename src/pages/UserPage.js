import React from 'react';
import { getUser } from '../api';
import PropTypes from 'prop-types';

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
      .catch(console.log);
  }

  render() {
    const { user } = this.state;
    return (
      <UserFull user={user} />
    );
  }
}

const UserFull = ({ user }) => {
  return (
    <section className="user-profile">
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <img onError={addDefaultSrc} src={user.avatar_url} alt={user.username} />
    </section>
  );
};

const addDefaultSrc = (e) => {
  e.target.src = '/default_profile.png';
};

UserPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

UserFull.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserPage;