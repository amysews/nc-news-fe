import React from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api';

class UsersPage extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    getUsers()
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
            <UserSummary user={user} key={i} />
          )
        })}
      </section>
    );
  }
}

const UserSummary = ({ user }) => {
  return (
    <section>
      <span>Username: <Link to={'/users/' + user.username} >{user.username}</Link></span>  <span>Name: {user.name}</span>
    </section>
  )
}

export default UsersPage;