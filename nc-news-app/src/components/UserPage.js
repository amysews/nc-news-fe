import React from 'react';


class UserPage extends React.Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.fetchUser(this.props.match.params.username);
  }

  fetchUser = (username) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${username}`)
      .then(buffer => buffer.json())
      .then(({ users }) => this.setState({ user: users[0] }))
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