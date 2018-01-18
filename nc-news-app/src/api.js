export const updateVote = (type, id, direction) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${type}/${id}?vote=${direction}`, {
    method: 'PUT',
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(res => res.json())
}

export const getArticles = (type) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${type}`)
    .then(res => res.json())
}

export const getArticle = (articleId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}`)
    .then(res => res.json())
}

export const getTopics = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/topics`)
    .then(res => res.json())
}

export const getUser = (username) => {
  return fetch(`${process.env.REACT_APP_API_URL}/users/${username}`)
    .then(res => res.json())
}

export const getUsers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/users`)
    .then(res => res.json())
}