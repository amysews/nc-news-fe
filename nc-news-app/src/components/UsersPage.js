import React from 'react';

class UsersPage extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(buffer => buffer.json())
      .then(({ users }) => this.setState({ users }))
      .catch(console.log)
  }

  render() {
    const { users } = this.state;
    return (
      <section>
        <h1>List of Users</h1>
        {users.map((user, i) => {
          return (
            <UserSummary user={user} />
          )
        })}
      </section>
    );
  }
}

const UserSummary = ({ user }) => {
  return (
    <section>
      <span>Username: {user.username}</span>  <span>Name: {user.name}</span>
    </section>
  )
}

export default UsersPage;