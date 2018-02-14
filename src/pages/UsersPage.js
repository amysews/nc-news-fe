import React from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

class UsersPage extends React.Component {
  state = {
    users: [],
    sortOn: 'commentsCount',
    sortDirection: 'desc'
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    getUsers()
      .then(({ users }) => this.setState({ users }))
      .catch(console.log);
  }

  render() {
    const { users } = this.state;
    return (
      <section className="container">
        <h1>List of Users</h1>

        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Name</th>
              <th>No. of Articles <FontAwesome className="users-page-arrows" onClick={() => this.handleSort('asc', 'articlesCount')} name='caret-up' /> <FontAwesome className="users-page-arrows" onClick={() => this.handleSort('desc', 'articlesCount')} name='caret-down' /></th>
              <th>No. of Comments <FontAwesome className="users-page-arrows" onClick={() => this.handleSort('asc', 'commentsCount')} name='caret-up' /> <FontAwesome className="users-page-arrows" onClick={() => this.handleSort('desc', 'commentsCount')} name='caret-down' /></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <UserSummary user={user} key={i} />
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }

  handleSort = (sortDirection, sortOn) => {
    if (sortDirection === this.state.sortDirection && sortOn === this.state.sortOn) return;
    const { users } = this.state;
    const sortedUsers = users.slice();
    if (sortDirection === 'asc') sortedUsers.sort((a,b) => a[sortOn] - b[sortOn]);
    if (sortDirection === 'desc') sortedUsers.sort((a,b) => b[sortOn] - a[sortOn]);
    this.setState({ users: sortedUsers, sortOn, sortDirection });
  }
}

const UserSummary = ({ user }) => {
  const { username, name, avatar_url, commentsCount, articlesCount } = user;
  return (
    <tr>
      <td><img onError={addDefaultSrc} src={avatar_url} alt="Avatar" height="40" width="40" style={{ borderRadius: '50%' }} /></td>
      <td><Link to={'/users/' + username}>{username}</Link></td>
      <td>{name}</td>
      <td>{articlesCount}</td>
      <td>{commentsCount}</td>
    </tr>
  );
};

const addDefaultSrc = (e) => {
  e.target.src = '/default_profile.png';
};

UserSummary.propTypes = {
  user: PropTypes.object.isRequired
};

export default UsersPage;